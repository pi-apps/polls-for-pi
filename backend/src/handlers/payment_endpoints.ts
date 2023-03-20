import axios from "axios";
import { Router } from "express";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import platformAPIClient from "../services/platformAPIClient";
import "../types/session";
import { IWallet } from "../types/wallet";
import { getPollEndDate } from "../utils/poll_utils";

export default function mountPaymentsEndpoints(router: Router, models: any) {
  // handle the incomplete payment
  router.post('/incomplete', async (req, res) => {
    const payment = req.body.payment;
    const paymentId = payment.identifier;
    const txid = payment.transaction && payment.transaction.txid;
    const txURL = payment.transaction && payment.transaction._link;

    console.log('incomplete paymentId', paymentId);

    /*
      implement your logic here
      e.g. verifying the payment, delivering the item to the user, etc...

      below is a naive example
    */

    // find the incomplete order
    const app = req.app;
    const orderCollection = app.locals.orderCollection;
    const order = await orderCollection.findOne({ pi_payment_id: paymentId });

    // order doesn't exist
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    // check the transaction on the Pi blockchain
    const horizonResponse = await axios.create({ timeout: 20000 }).get(txURL);
    const paymentIdOnBlock = horizonResponse.data.memo;

    // and check other data as well e.g. amount
    if (paymentIdOnBlock !== order.pi_payment_id) {
      return res.status(400).json({ message: "Payment id doesn't match." });
    }

    // mark the order as paid
    await orderCollection.updateOne({ pi_payment_id: paymentId }, { $set: { txid, paid: true } });

    // let Pi Servers know that the payment is completed
    await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid });
    return res.status(200).json({ message: `Handled the incomplete payment ${paymentId}` });
  });

  // approve the current payment
  router.post('/approve', async (req, res) => {
    try {
      console.log('req.session', req.session)
      // if (!req.session.currentUser) {
      //   return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
      // }

      const app = req.app;

      const { paymentId, user } = req.body;
      console.log('paymentId', paymentId)
      console.log('user', user)

      const pollReq = req.body.poll;
      console.log('user', req.body.user)
      console.log('pollReq', pollReq)

      const { Product, Pricing, Poll, Wallet } = models;

      const product = await Product.find({
        name: new RegExp("poll", 'i')
      });
      // product not found
      if (!product) {
        return res.status(400).json({ message: "No product found." });
      }

      const pricingItem = await Pricing.findOne({ product });
      // pricing not found
      if (!pricingItem) {
        return res.status(400).json({ message: "No pricing found." });
      }

      // Create payment
      const currentPayment = await platformAPIClient.get(`/v2/payments/${paymentId}`);
      console.log('currentPayment', currentPayment)

      const orderCollection = app.locals.orderCollection;

      /*
        implement your logic here
        e.g. creating an order record, reserve an item if the quantity is limited, etc...
      */
      await orderCollection.insertOne({
        pi_payment_id: paymentId,
        product_id: currentPayment.data.metadata.productId,
        user: req.session.currentUser ? req.session.currentUser.uid : user.uid ? user.uid : 'dummyuser',
        txid: null,
        paid: false,
        cancelled: false,
        created_at: new Date()
      });

      // compute total
      const priceItems = pricingItem.priceItems;
      let total = 0.0;
      let rewards = 0.0;
      let fees = 0.0;
      priceItems.forEach((item: any) => {
        const name = item.name.toLowerCase();

        // fees
        if (name === "per option") {
          fees += (item.price * pollReq.optionCount);
        } else if (name === "per hour") {
          fees += (item.price * (pollReq.durationDays * 24));
        } else if (name === "per response") {
          fees += (item.price * pollReq.responseLimit);
        }

        // rewards
        if (name === "per transaction") {
          rewards += (item.price * (pollReq.responseLimit));
       }
      })
      rewards += (pollReq.responseLimit * pollReq.perResponseReward);

      total = fees + rewards;
      console.log('computed total: ', total);
      console.log('payment total: ', currentPayment.data.amount);

      // Order payment not equal to computed total
      // TODO: Disable total check
      // /*
      // if (total !== currentPayment.data.amount) {
      //   const cancelledPayment = await platformAPIClient.post(`/v2/payments/${paymentId}/cancel`);
      //   console.log('cancelledPayment', cancelledPayment);
      //   return res.status(400).json({ data: cancelledPayment, message: "Order payment not equal to computed total. Payment cancelled." });
      // }
      // */

      const unpaidPoll = new Poll();
      const responseUrl = uuidv4();
      _.extend(unpaidPoll,
        {
          ...pollReq,
          owner: {
            uid: user.uid,
            username: user.username
          },
          paymentId,
          responseUrl,
          startDate: new Date(),
          endDate: getPollEndDate(pollReq),
          isOpen: true,
        }
      );

      const newWallet = new Wallet();
      newWallet.owner = {
        uid: user.uid,
        username: user.username
      };
      newWallet.balance = 0;
      newWallet.rewards_balance = 0;
      newWallet.admin_fees = 0;

      newWallet.pending_balance = currentPayment.data.amount;
      newWallet.pending_rewards_balance = (currentPayment.data.amount - fees);
      newWallet.pending_admin_fees = fees;
      await newWallet.save();

      unpaidPoll.wallet = newWallet;
      console.log('unpaid poll', unpaidPoll);
      await unpaidPoll.save();

      // let Pi Servers know that you're ready
      await platformAPIClient.post(`/v2/payments/${paymentId}/approve`);
      return res.status(200).json({ _id: unpaidPoll._id, message: `Approved the payment ${paymentId}` });

    } catch (err) {
      console.log('err', err)
    }
  });

  // complete the current payment
  router.post('/complete', async (req, res) => {
    const app = req.app;

    const paymentId = req.body.paymentId;
    const txid = req.body.txid;
    const orderCollection = app.locals.orderCollection;

    const { user } = req.body;
    console.log('paymentId', paymentId)
    console.log('user', user)

    /*
      implement your logic here
      e.g. verify the transaction, deliver the item to the user, etc...
    */

    await orderCollection.updateOne({ pi_payment_id: paymentId }, { $set: { txid: txid, paid: true } });

    // let Pi server know that the payment is completed
    await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid });

    const { Poll, Wallet } = models;

    const unpaidPoll = await Poll.findOne({ paymentId });
    console.log('unpaidPoll', unpaidPoll);
    if (!unpaidPoll) {
      return res.status(200).json({ message: `Completed the payment ${paymentId} but no poll record found.`, pollId: unpaidPoll._id });
    }
    unpaidPoll.paid = true;

    const wallet = await Wallet.findOne({ _id: unpaidPoll.wallet });
    console.log('wallet', wallet)
    wallet.balance = wallet.pending_balance;
    wallet.rewards_balance = wallet.pending_rewards_balance;
    wallet.admin_fees = wallet.pending_admin_fees;

    wallet.pending_balance = 0;
    wallet.pending_rewards_balance = 0;
    wallet.pending_admin_fees = 0;
    await wallet.save();

    await unpaidPoll.save();

    return res.status(200).json({ message: `Completed the payment ${paymentId}`, pollId: unpaidPoll._id });
  });

  // handle the cancelled payment
  router.post('/cancelled_payment', async (req, res) => {
    const app = req.app;

    const paymentId = req.body.paymentId;
    const orderCollection = app.locals.orderCollection;

    /*
      implement your logic here
      e.g. mark the order record to cancelled, etc...
    */

    await orderCollection.updateOne({ pi_payment_id: paymentId }, { $set: { cancelled: true } });
    return res.status(200).json({ message: `Cancelled the payment ${paymentId}` });
  })
}

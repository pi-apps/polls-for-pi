import piBackendAPI from "../services/piBackendAPI";

export const processRefund = async (models: any) => {

  try {

    // closed/expired polls
    const { Poll, Wallet } = models;

    // closed/expired polls
    const now = new Date();
    console.log('now ', now);
    const closedPolls = await Poll.find({
      endDate: { $lte: now },
      'wallet.balance': { $gt: 0 },
      'wallet.isRefunded': false,
    }).populate('wallet');

    console.log('closedPolls with balance count', closedPolls.length)

    if (closedPolls.length > 0) {
      for (let i = 0; i < closedPolls.length; i++) {
        const closedPoll = closedPolls[i];
        console.log('closedPoll', closedPoll);

        if (closedPoll && closedPoll.wallet.rewards_balance > 0) {
          // do payment
          const wallet = await Wallet.findOne({ _id: closedPoll.wallet });
          const userUid = wallet.owner.uid;

          //const toRefundBalance = computeRefund(poll, wallet);
          const paymentData = {
            amount: wallet.rewards_balance,
            memo: `Refund for poll: '${closedPoll.pollTitle}'`,
            metadata: {
              app: "polls-for-pi/v1",
              txType: 'refund',
              pollId: closedPoll.pollId,
              pollTitle: closedPoll.pollTitle,
            },
            uid: userUid
          };
          console.log('Refund paymentData', paymentData);

          // It is critical that you store paymentId in your database
          // so that you don't double-pay the same user, by keeping track of the payment.
          const paymentId = await piBackendAPI.createPayment(paymentData);
          console.log('Refund payment created')
          console.log('Refund paymentId', paymentId)
          wallet.refundPaymentId = paymentId;
          await wallet.save();

          // It is strongly recommended that you store the txid along with the paymentId you stored earlier for your reference.
          const txid = await piBackendAPI.submitPayment(paymentId);
          console.log('Refund payment submitted')
          console.log('Refund txid', txid)
          wallet.refundTxId = txid;
          await wallet.save();

          const completedPayment = await piBackendAPI.completePayment(paymentId, txid);
          console.log('Refund completedPayment', completedPayment)
          wallet.isRefunded = true;
          await wallet.save();

        }
      }
    }

  } catch (error) {
    console.log('processRefund error', error);
  }

};
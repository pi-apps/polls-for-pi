import PiNetwork from 'pi-backend';
import env from '../environments';

// DO NOT expose these values to public
const apiKey = env.pi_api_key;
const walletPrivateSeed = env.wallet_private_seed;
const walletPublicKey = env.wallet_public_key;
const pi = new PiNetwork(apiKey, walletPrivateSeed);

import platformAPIClient from "../services/platformAPIClient";

export const processIncompletePayments = async (incompletePayments: any, models: any) => {
  try {
    const { PollResponse } = models;

    if (incompletePayments > 0) {
      const incompletePayment = incompletePayments[0];
      console.log('incompletePayment', incompletePayment);
      console.log('incompletePayment.metadata', incompletePayment.metadata);

      const paymentId = incompletePayment.identifier;
      console.log('incomplete payment identifier', paymentId);

      if (paymentId) {
        const incPayment = await platformAPIClient.get(`/v2/payments/${paymentId}`);
        console.log('incPayment.data', incPayment.data);

        const { status, metadata }  = incPayment.data;
        console.log('status', status);
        if (
          status.developer_approved === true
          && status.developer_completed === false
          && status.transaction_verified === false
          && status.cancelled === false
        ) {
          const toCompletePollResponse = await PollResponse.findOne({ paymentId: paymentId });
          console.log('toCompletePollResponse', toCompletePollResponse);

          // It is strongly recommended that you store the txid along with the paymentId you stored earlier for your reference.
          const txid = await pi.submitPayment(paymentId);
          console.log('payment submitted')
          console.log('txid', txid)
          if (toCompletePollResponse) {
            toCompletePollResponse.txId = txid;
            await toCompletePollResponse.save();
          }

          const completedPayment = await pi.completePayment(paymentId, txid);
          console.log('completedPayment', completedPayment)
          if (toCompletePollResponse) {
            toCompletePollResponse.isPaid = true;
            toCompletePollResponse.isRewarded = true;
            await toCompletePollResponse.save();
          }

        } else if (status.cancelled === false) {
          const toCancelPollResponse = await PollResponse.findOne({ paymentId: paymentId });
          console.log('incPollResponse', toCancelPollResponse);

          try {
            const cancelResp = await platformAPIClient.post(`/v2/payments/${paymentId}/cancel`);
            console.log('cancelResp', cancelResp)
            console.log('cancelResp.data', cancelResp.data)
          } catch (err: any) {
            console.log('cancel err', err);
            if (toCancelPollResponse) {
              toCancelPollResponse.isPaid = true;
              toCancelPollResponse.isRewarded = true;
              toCancelPollResponse.isCancelled = true;
              toCancelPollResponse.save();
            }
          }

        } else {
          const toCompletePollResponse = await PollResponse.findOne({ paymentId: paymentId });
          console.log('Else toCompletePollResponse', toCompletePollResponse);

        }

      }
    }

  } catch (error) {
    console.log('processIncompletePayments error', error);
  }

};
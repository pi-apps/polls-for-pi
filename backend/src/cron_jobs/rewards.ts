import PiNetwork from 'pi-backend';
import env from '../environments';

// DO NOT expose these values to public
const apiKey = env.pi_api_key;
const walletPrivateSeed = env.wallet_private_seed;
const walletPublicKey = env.wallet_public_key;
const pi = new PiNetwork(apiKey, walletPrivateSeed);

export const processRewards = async (models: any) => {

  try {
    const { PollResponse } = models;
    // closed/expired polls
    const now = new Date();
    console.log('now ', now);
    const pollResponsesToReward = await PollResponse.find(
      {
        endDate: { $lte: now },
        isRewarded: false,
        reward: { $gt: 0 },
      });

    console.log('pollResponsesToReward.length', pollResponsesToReward.length);
    if (pollResponsesToReward.length > 0) {
      for (let i = 0; i < pollResponsesToReward.length; i++) {
        const pollResponse = pollResponsesToReward[i];
        console.log('pollResponse',pollResponse);

        if (pollResponse && !pollResponse.isRewarded && pollResponse.reward > 0) {
          // do payment
          const userUid = pollResponse.uid;
          const paymentData = {
            amount: pollResponse.reward,
            memo: `Reward for poll: '${pollResponse.pollTitle}'`, // this is just an example
            metadata: {
              app: "polls-for-pi/v1",
              pollId: pollResponse.pollId,
              responseId: pollResponse._id,
              pollTitle: pollResponse.pollTitle,
              response: pollResponse.response,
            },
            uid: userUid
          };
          console.log('paymentData', paymentData);

          // It is critical that you store paymentId in your database
          // so that you don't double-pay the same user, by keeping track of the payment.
          const paymentId = await pi.createPayment(paymentData);
          console.log('payment created')
          console.log('paymentId', paymentId)
          pollResponse.paymentId = paymentId;
          await pollResponse.save();

          // It is strongly recommended that you store the txid along with the paymentId you stored earlier for your reference.
          const txid = await pi.submitPayment(paymentId);
          console.log('payment submitted')
          console.log('txid', txid)
          pollResponse.txId = txid;
          await pollResponse.save();

          // console.log('updated pollResponse', pollResponse)

          const completedPayment = await pi.completePayment(paymentId, txid);
          console.log('completedPayment', completedPayment)
          pollResponse.isPaid = true;
          pollResponse.isRewarded = true;
          await pollResponse.save();

        }
      //});

      // Promise.all(promises)
      // .then(responses => {
      //   console.log('responses' , responses);
      // }).catch(error => {
      //   console.log('errorr', error)
      //   if (error.name === 'MongoError' && error.code === 11000) {
      //     // Duplicate username
      //     console.log('errorr', error)
      //   }
      // });

      }
    }

  } catch (error) {
    console.log('cron job error', error);
  }

};
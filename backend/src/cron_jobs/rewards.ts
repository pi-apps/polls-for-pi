import piBackendAPI from "../services/piBackendAPI";

export const processRewards = async (models: any) => {

  try {
    const { PollResponse, Poll, Wallet } = models;
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
          const paymentId = await piBackendAPI.createPayment(paymentData);
          console.log('payment created')
          console.log('paymentId', paymentId)
          pollResponse.paymentId = paymentId;
          await pollResponse.save();

          // It is strongly recommended that you store the txid along with the paymentId you stored earlier for your reference.
          const txid = await piBackendAPI.submitPayment(paymentId);
          console.log('payment submitted')
          console.log('txid', txid)
          pollResponse.txId = txid;
          await pollResponse.save();

          // console.log('updated pollResponse', pollResponse)

          const completedPayment = await piBackendAPI.completePayment(paymentId, txid);
          console.log('completedPayment', completedPayment)
          pollResponse.isPaid = true;
          pollResponse.isRewarded = true;

          const pollItem = await Poll.findOne({ _id: pollResponse.pollId});
          const wallet = await Wallet.findOne({ _id: pollItem.wallet });

          if (wallet) {
            console.log('bef wallet', wallet)

            // TODO: get tx fee dynamically
            const toDeduct = pollResponse.reward + 0.01;
            wallet.balance = wallet.balance - toDeduct;
            wallet.rewards_balance = wallet.rewards_balance - toDeduct;
            await wallet.save();

            console.log('aft wallet', wallet)
          }

          await pollResponse.save();

        }
      }
    }

  } catch (error) {
    console.log('processRewards error', error);
  }

};
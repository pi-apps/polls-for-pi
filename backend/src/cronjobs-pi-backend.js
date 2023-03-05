// // IV. Create Cron JOB:
// const CronJob = require('cron').CronJob;

// // run every minute
// const CRON_SCHED = process.env.CRON_SCHED || "* * * * *";
// console.log('CRON_SCHED', CRON_SCHED)

// const CRON_LOGS = process.env.ENABLE_CRON_LOGS === "true" ;

// // DO NOT expose these values to public
// const apiKey = env.pi_api_key;
// const walletPrivateSeed = env.wallet_private_seed;
// const walletPublicKey = env.wallet_public_key;
// //const pi = new PiNetwork(apiKey, walletPrivateSeed);


// // API Key of your app, available in the Pi Developer Portal
// // DO NOT hardcode this, read it from an environment variable and treat it like a production secret.
// const PI_API_KEY = apiKey;

// const axiosClient = axios.create({baseURL: 'https://api.minepi.com', timeout: 20000});
// const config = {headers: {'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json'}};



// pollsDB.asPromise().then(async (value) => {
//   const job = new CronJob(CRON_SCHED, async function() {

//     const incompleteServerPayment = await pi.getIncompleteServerPayments();
//     console.log('incompleteServerPayments', incompleteServerPayment[0]);
//     const payment = incompleteServerPayment[0];
//     const paymentId = payment.identifier;
//     const txid = payment.transaction && payment.transaction.txid;
//     const txURL = payment.transaction && payment.transaction._link;
//     if (incompleteServerPayment) {
//       console.log('toProcessPayment.status', incompleteServerPayment[0].status)
//       console.log('toProcessPayment.metadata', incompleteServerPayment[0].metadata)

//       // const { pollId, responseId } = toProcessPayment.metadata;
//       // const pollResp = await PollResponse.find({_id: responseId});
//       // await pi.completePayment(pollResp.paymentId, txid);
//     }

//     // closed/expired polls
//     const now = new Date();
//     console.log('now ', now);
//     const pollResponsesToReward = await PollResponse.find(
//       {
//         endDate: { $lte: now },
//         isRewarded: false,
//       });

//     try {

//       console.log('pollResponsesToReward ', pollResponsesToReward);
//       if (pollResponsesToReward.length > 0) {
//         console.log('pollResponsesToReward ', pollResponsesToReward);
//         const pollResponse = pollResponsesToReward[0];

//         //const promises = pollResponsesToReward.forEach(async (pollResponse: any) => {
//           console.log('pollResponse',pollResponse);

//           if (pollResponse && !pollResponse.isRewarded) {
//             // do payment
//             const userUid = pollResponse.uid;
//             const paymentData = {
//               amount: pollResponse.reward,
//               memo: `Reward for poll: '${pollResponse.pollTitle}'`, // this is just an example
//               metadata: { pollId: pollResponse.pollId, responseId: pollResponse._id },
//               uid: userUid
//             };
//             console.log('paymentData', paymentData);

//             // It is critical that you store paymentId in your database
//             // so that you don't double-pay the same user, by keeping track of the payment.
//             const paymentId = await pi.createPayment(paymentData);
//             console.log('paymentId', paymentId)
//             pollResponse.paymentId = paymentId;
//             await pollResponse.save();

//             // It is strongly recommended that you store the txid along with the paymentId you stored earlier for your reference.
//             const txid = await pi.submitPayment(paymentId);
//             console.log('txid', txid)
//             pollResponse.txId = txid;
//             await pollResponse.save();

//             // console.log('updated pollResponse', pollResponse)

//             const completedPayment = await pi.completePayment(paymentId, txid);
//             console.log('completedPayment', completedPayment)

//             pollResponse.isPaid = true;
//             await pollResponse.save();

//           }
//         //});

//         // Promise.all(promises)
//         // .then(responses => {
//         //   console.log('responses' , responses);
//         // }).catch(error => {
//         //   console.log('errorr', error)
//         //   if (error.name === 'MongoError' && error.code === 11000) {
//         //     // Duplicate username
//         //     console.log('errorr', error)
//         //   }
//         // });

//       }
//     } catch (error) {
//       console.log('cron job error', error);
//     }

//   });
//   console.log('After job instantiation');
//   job.start();
// });
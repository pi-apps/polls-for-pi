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

// import StellarSdk from 'stellar-sdk';


// pollsDB.asPromise().then(async (value) => {
//   const job = new CronJob(CRON_SCHED, async function() {

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

//             // This is the user UID of this payment's recipient
//             let response = await axiosClient.post(`/v2/payments`, paymentData, config);
//             // let [ paymentIdentifier, recipientAddress ] = await axiosClient.post(`/v2/payments`, paymentData, config).then(response => {
//             //   // paymentIdentifier = response.data.identifier;
//             //   // recipientAddress = response.data.recipient;
//             //   return [response.data.identifier, response.data.recipient];
//             // });
//             console.log('response', response)

//             let paymentIdentifier = response.data.identifier;
//             let recipientAddress = response.data.recipient;
//             console.log('paymentIdentifier', paymentIdentifier)
//             console.log('recipientAddress', recipientAddress)

//             // 2. Load the account

//             const myPublicKey = walletPublicKey; // your public key, starts with G

//             // an object that let you communicate with the Pi Testnet
//             // if you want to connect to Pi Mainnet, use 'https://api.mainnet.minepi.com' instead
//             const piTestnet = new StellarSdk.Server('https://api.testnet.minepi.com');

//             let myAccount = await piTestnet.loadAccount(myPublicKey);
//             let baseFee = await piTestnet.fetchBaseFee();

//             // 3. Build the transaction

//             // create a payment operation which will be wrapped in a transaction
//             let payment = StellarSdk.Operation.payment({
//               destination: recipientAddress,
//               asset: StellarSdk.Asset.native(),
//               amount: paymentData.amount.toString()
//             });
//             console.log('payment', payment)

//             // 180 seconds timeout
//             let timebounds = await piTestnet.fetchTimebounds(180);

//             let transaction = new StellarSdk.TransactionBuilder(myAccount, {
//               fee: baseFee,
//               networkPassphrase: "Pi Testnet", // use "Pi Network" for mainnet transaction
//               timebounds: timebounds
//             })
//             .addOperation(payment)
//             // IMPORTANT! DO NOT forget to include the payment id as memo
//             .addMemo(StellarSdk.Memo.text(paymentIdentifier));
//             transaction = transaction.build();
//             console.log('transaction', transaction)

//             // 4. Sign the transaction

//             // See the "Obtain your wallet's private key" section above to get this.
//             // And DON'T HARDCODE IT, treat it like a production secret.
//             const mySecretSeed = walletPrivateSeed; // NEVER expose your secret seed to public, starts with S
//             const myKeypair = StellarSdk.Keypair.fromSecret(mySecretSeed);
//             transaction.sign(myKeypair);
//             console.log('transaction.sign')

//             // 5. Submit the transaction to the Pi blockchain
//             let tx = await piTestnet.submitTransaction(transaction);
//             console.log('tx', tx)
//             let txid = tx.id;
//             console.log('txid', txid)

//             // 6.
//             // check if the response status is 200
//             let completeResponse = await axiosClient.post(`/v2/payments/${paymentIdentifier}/complete`, {txid}, config);
//             console.log('completeResponse', completeResponse)

//             // It is critical that you store paymentId in your database
//             // so that you don't double-pay the same user, by keeping track of the payment.
//             // const paymentId = await pi.createPayment(paymentData);
//             // console.log('paymentId', paymentId)

//             // pollResponse.paymentId = paymentId;
//             // await pollResponse.save();
//             // console.log('updated pollResponse', pollResponse)


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

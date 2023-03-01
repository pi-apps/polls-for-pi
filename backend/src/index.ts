import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
// import PiNetwork from 'pi-backend';
import axios from 'axios';
import env from './environments';
import mountPaymentsEndpoints from './handlers/payment_endpoints';
import mountPollsAiEndpoints from './handlers/polls_ai';
import mountPollEndpoints from './handlers/poll_endpoints';
import mountPricingEndpoints from './handlers/pricing_endpoints';
import mountProductsEndpoints from './handlers/products';
import mountUserEndpoints from './handlers/users';
import PollSchema from './schemas/poll';
import PollPricingSchema from './schemas/poll_pricing';
import PollResponseSchema from './schemas/poll_response';
import PricingSchema from './schemas/pricing';
import ProductSchema from './schemas/product';

// We must import typedefs for ts-node-dev to pick them up when they change (even though tsc would supposedly
// have no problem here)
// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata#comment125163548_65381085
import "./types/session";

const dbName = env.mongo_db_name;
const mongoUri = `mongodb://${env.mongo_host}/${dbName}`;
const mongoClientOptions = {
  authSource: "admin",
  auth: {
    username: env.mongo_user,
    password: env.mongo_password,
  },
}
var pollsDB = mongoose.createConnection(mongoUri, mongoClientOptions);


const Product = pollsDB.model('Product', ProductSchema);
const Pricing = pollsDB.model('Pricing', PricingSchema);
const PollPricing = pollsDB.model('PollPricing', PollPricingSchema);
const Poll = pollsDB.model('Poll', PollSchema);
const PollResponse = pollsDB.model('PollResponse', PollResponseSchema);

const pollModels = { Product, Pricing, PollPricing, Poll, PollResponse };

//
// I. Initialize and set up the express app and various middlewares and packages:
//

const app: express.Application = express();

// Log requests to the console in a compact format:
app.use(logger('dev'));

// Full log of all requests to /log/access.log:
app.use(logger('common', {
  stream: fs.createWriteStream(path.join(__dirname, '..', 'log', 'access.log'), { flags: 'a' }),
}));

// Enable response bodies to be sent as JSON:
app.use(express.json())

// Handle CORS:
app.use(cors({
  origin: env.frontend_url,
  credentials: true
}));

// Handle cookies 🍪
app.use(cookieParser());

// Use sessions:
app.use(session({
  secret: env.session_secret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoUri,
    mongoOptions: mongoClientOptions,
    dbName: dbName,
    collectionName: 'user_sessions'
  }),
}));


//
// II. Mount app endpoints:
//

// Payments endpoint under /payments:
const paymentsRouter = express.Router();
mountPaymentsEndpoints(paymentsRouter, pollModels);
app.use('/payments', paymentsRouter);

// User endpoints (e.g signin, signout) under /user:
const userRouter = express.Router();
mountUserEndpoints(userRouter);
app.use('/user', userRouter);

const productsRouter = express.Router();
mountProductsEndpoints(productsRouter, pollModels)
app.use('/v1/products', productsRouter);

const pollsAiRouter = express.Router();
mountPollsAiEndpoints(pollsAiRouter)
app.use('/v1/polls_ai', pollsAiRouter);

const pricingRouter = express.Router();
mountPricingEndpoints(pricingRouter, pollModels);
app.use('/v1/pricings', pricingRouter);

const pollRouter = express.Router();
mountPollEndpoints(pollRouter, pollModels);
app.use('/v1/polls', pollRouter);

// Hello World page to check everything works:
app.get('/', async (_, res) => {
  res.status(200).send({ message: "Hello, World!" });
});


// III. Boot up the app:

app.listen(8000, async () => {
  try {
    const client = await MongoClient.connect(mongoUri, mongoClientOptions)
    const db = client.db(dbName);
    app.locals.orderCollection = db.collection('orders');
    app.locals.userCollection = db.collection('users');

    const Product = db.collection('products');
    const Pricing = db.collection('pricings');
    const PollPricing = db.collection('pollpricings');
    const collections = { Product, Pricing, PollPricing };
    app.locals.collections = collections;

    console.log('Connected to MongoDB on: ', mongoUri)
  } catch (err) {
    console.error('Connection to MongoDB failed: ', err)
  }

  console.log('App platform demo app - Backend listening on port 8000!');
  console.log(`CORS config: configured to respond to a frontend hosted on ${env.frontend_url}`);
});

// IV. Create Cron JOB:
const CronJob = require('cron').CronJob;

// run every minute
const CRON_SCHED = process.env.CRON_SCHED || "* * * * *";
console.log('CRON_SCHED', CRON_SCHED)

const CRON_LOGS = process.env.ENABLE_CRON_LOGS === "true" ;

// DO NOT expose these values to public
const apiKey = env.pi_api_key;
const walletPrivateSeed = env.wallet_private_seed;
const walletPublicKey = env.wallet_public_key;
// const pi = new PiNetwork(apiKey, walletPrivateSeed);


// API Key of your app, available in the Pi Developer Portal
// DO NOT hardcode this, read it from an environment variable and treat it like a production secret.
const PI_API_KEY = apiKey;

const axiosClient = axios.create({baseURL: 'https://api.minepi.com', timeout: 20000});
const config = {headers: {'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json'}};

import StellarSdk from 'stellar-sdk';

pollsDB.asPromise().then(async (value) => {
  const job = new CronJob(CRON_SCHED, async function() {

    // closed/expired polls
    const now = new Date();
    console.log('now ', now);
    const pollResponsesToReward = await PollResponse.find(
      {
        endDate: { $lte: now },
        isRewarded: false,
      });


    try {

      console.log('pollResponsesToReward ', pollResponsesToReward);
      if (pollResponsesToReward.length > 0) {
        console.log('pollResponsesToReward ', pollResponsesToReward);
        const pollResponse = pollResponsesToReward[0];

        //const promises = pollResponsesToReward.forEach(async (pollResponse: any) => {
          console.log('pollResponse',pollResponse);

          if (pollResponse && !pollResponse.isRewarded) {
            // do payment
            const userUid = pollResponse.uid;
            const paymentData = {
              amount: pollResponse.reward,
              memo: `Reward for poll: '${pollResponse.pollTitle}'`, // this is just an example
              metadata: { pollId: pollResponse.pollId, responseId: pollResponse._id },
              uid: userUid
            };
            console.log('paymentData', paymentData);

            // This is the user UID of this payment's recipient
            let response = await axiosClient.post(`/v2/payments`, paymentData, config);
            // let [ paymentIdentifier, recipientAddress ] = await axiosClient.post(`/v2/payments`, paymentData, config).then(response => {
            //   // paymentIdentifier = response.data.identifier;
            //   // recipientAddress = response.data.recipient;
            //   return [response.data.identifier, response.data.recipient];
            // });
            console.log('response', response)

            let paymentIdentifier = response.data.identifier;
            let recipientAddress = response.data.recipient;
            console.log('paymentIdentifier', paymentIdentifier)
            console.log('recipientAddress', recipientAddress)

            // 2. Load the account

            const myPublicKey = walletPublicKey; // your public key, starts with G

            // an object that let you communicate with the Pi Testnet
            // if you want to connect to Pi Mainnet, use 'https://api.mainnet.minepi.com' instead
            const piTestnet = new StellarSdk.Server('https://api.testnet.minepi.com');

            let myAccount = await piTestnet.loadAccount(myPublicKey);
            let baseFee = await piTestnet.fetchBaseFee();

            // 3. Build the transaction

            // create a payment operation which will be wrapped in a transaction
            let payment = StellarSdk.Operation.payment({
              destination: recipientAddress,
              asset: StellarSdk.Asset.native(),
              amount: paymentData.amount.toString()
            });
            console.log('payment', payment)

            // 180 seconds timeout
            let timebounds = await piTestnet.fetchTimebounds(180);

            let transaction = new StellarSdk.TransactionBuilder(myAccount, {
              fee: baseFee,
              networkPassphrase: "Pi Testnet", // use "Pi Network" for mainnet transaction
              timebounds: timebounds
            })
            .addOperation(payment)
            // IMPORTANT! DO NOT forget to include the payment id as memo
            .addMemo(StellarSdk.Memo.text(paymentIdentifier));
            transaction = transaction.build();
            console.log('transaction', transaction)

            // 4. Sign the transaction

            // See the "Obtain your wallet's private key" section above to get this.
            // And DON'T HARDCODE IT, treat it like a production secret.
            const mySecretSeed = walletPrivateSeed; // NEVER expose your secret seed to public, starts with S
            const myKeypair = StellarSdk.Keypair.fromSecret(mySecretSeed);
            transaction.sign(myKeypair);
            console.log('transaction.sign')

            // 5. Submit the transaction to the Pi blockchain
            let tx = await piTestnet.submitTransaction(transaction);
            console.log('tx', tx)
            let txid = tx.id;
            console.log('txid', txid)

            // 6.
            // check if the response status is 200
            let completeResponse = await axiosClient.post(`/v2/payments/${paymentIdentifier}/complete`, {txid}, config);
            console.log('completeResponse', completeResponse)

            // It is critical that you store paymentId in your database
            // so that you don't double-pay the same user, by keeping track of the payment.
            // const paymentId = await pi.createPayment(paymentData);
            // console.log('paymentId', paymentId)

            // pollResponse.paymentId = paymentId;
            // await pollResponse.save();
            // console.log('updated pollResponse', pollResponse)


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
    } catch (error) {
      console.log('cron job error', error);
    }

  });
  console.log('After job instantiation');
  job.start();
});

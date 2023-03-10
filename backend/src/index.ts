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
import PiNetwork from 'pi-backend';
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
import platformAPIClient from "./services/platformAPIClient";

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

// Handle cookies ????
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
const CRON_SCHED = process.env.CRON_SCHED || "*/2 * * * *";
console.log('CRON_SCHED', CRON_SCHED)

const CRON_LOGS = process.env.ENABLE_CRON_LOGS === "true" ;

// DO NOT expose these values to public
const apiKey = env.pi_api_key;
const walletPrivateSeed = env.wallet_private_seed;
const walletPublicKey = env.wallet_public_key;
const pi = new PiNetwork(apiKey, walletPrivateSeed);

pollsDB.asPromise().then(async (value) => {
  const job = new CronJob(CRON_SCHED, async function() {

    try {
      // incomplete payments
      const response = await platformAPIClient.get("/v2/payments/incomplete_server_payments");
      console.log('incompletePayments', response.data.incomplete_server_payments);
      console.log('response.data.incomplete_server_payments.length', response.data.incomplete_server_payments.length)

      if (response.data.incomplete_server_payments.length > 0) {
        const incompletePayment = response.data.incomplete_server_payments[0];
        console.log('incompletePayment', incompletePayment);
        console.log('incompletePayment.metadata', incompletePayment.metadata);

        // const {pollId, responseId} = incompletePayment.metadata;
        // const pollResp = await PollResponse.findOne({ _id: responseId });
        // console.log('pollResp', pollResp);

        // const paymentId = pollResp?.paymentId;
        // console.log('incomplete payment paymentId', paymentId);

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

            // const { transaction } = incPayment.data;
            // const completeResp = await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid: transaction.txid });
            // console.log('completeResp', completeResp)
            // console.log('completeResp.data', completeResp.data)
            // if (toCompletePollResponse) {
            //   toCompletePollResponse.isPaid = true;
            //   await toCompletePollResponse.save();
            // }
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

            // It is strongly recommended that you store the txid along with the paymentId you stored earlier for your reference.
            // const txid = await pi.submitPayment(paymentId);
            // console.log('payment submitted')
            // console.log('txid', txid)
            // if (toCompletePollResponse) {
            //   toCompletePollResponse.txId = txid;
            //   await toCompletePollResponse.save();
            // }

            // const { transaction } = incPayment.data;
            // const completeResp = await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid: transaction.txid });
            // console.log('completeResp', completeResp)
            // console.log('completeResp.data', completeResp.data)
            // if (toCompletePollResponse) {
            //   toCompletePollResponse.isPaid = true;
            //   await toCompletePollResponse.save();
            // }
          }

        }
      } else {
        // closed/expired polls
        const now = new Date();
        console.log('now ', now);
        const pollResponsesToReward = await PollResponse.find(
          {
            endDate: { $lte: now },
            isRewarded: false,
          });

        console.log('pollResponsesToReward.length', pollResponsesToReward.length);
        if (pollResponsesToReward.length > 0) {
          for (let i = 0; i < pollResponsesToReward.length; i++) {
            const pollResponse = pollResponsesToReward[i];
            console.log('pollResponse',pollResponse);

            if (pollResponse && !pollResponse.isRewarded) {
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
      }

    } catch (error) {
      console.log('cron job error', error);
    }

  });
  console.log('After job instantiation');
  job.start();
});

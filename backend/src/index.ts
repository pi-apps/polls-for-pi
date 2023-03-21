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
import { processIncompletePayments } from './cron_jobs/incompelete_payments';
import { processRefund } from './cron_jobs/refunds';
import { processRewards } from './cron_jobs/rewards';
import env from './environments';
import mountPaymentsEndpoints from './handlers/payment_endpoints';
import mountPollsAiEndpoints from './handlers/polls_ai';
import mountPollEndpoints from './handlers/poll_endpoints';
import mountPricingEndpoints from './handlers/pricing_endpoints';
import mountProductsEndpoints from './handlers/products';
import mountPromotedPollsEndpoints from './handlers/promoted_polls';
import mountPublicPollsEndpoints from './handlers/public_polls';
import mountUserEndpoints from './handlers/users';
import PollSchema from './schemas/poll';
import PollPricingSchema from './schemas/poll_pricing';
import PollResponseSchema from './schemas/poll_response';
import PricingSchema from './schemas/pricing';
import ProductSchema from './schemas/product';
import WalletSchema from './schemas/wallet';
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
const Wallet = pollsDB.model('Wallet', WalletSchema);

const pollModels = { Product, Pricing, PollPricing, Poll, PollResponse, Wallet };

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

const publicPollsRouter = express.Router();
mountPublicPollsEndpoints(publicPollsRouter, pollModels);
app.use('/v1/public_polls', publicPollsRouter);

const promotedPollsRouter = express.Router();
mountPromotedPollsEndpoints(promotedPollsRouter, pollModels);
app.use('/v1/promoted_polls', promotedPollsRouter);

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

pollsDB.asPromise().then(async (value) => {

  const refundJob = new CronJob("*/3 * * * *", async function() {
    processRefund(pollModels)
  });

  const rewardsJob = new CronJob(CRON_SCHED, async function() {
    try {
      // incomplete payments
      const response = await platformAPIClient.get("/v2/payments/incomplete_server_payments");
      console.log('incompletePayments', response.data.incomplete_server_payments);
      console.log('response.data.incomplete_server_payments.length', response.data.incomplete_server_payments.length)

      if (response.data.incomplete_server_payments.length > 0) {
        processIncompletePayments(response.data.incomplete_server_payments, pollModels);

      } else {
        processRewards(pollModels);
      }

    } catch (error) {
      console.log('cron job error', error);
    }

  });
  console.log('After job instantiation');

  refundJob.start();
  rewardsJob.start();
});

import { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

interface IPoll {
  title: string;
  status: string;
  distribution: string,
  options?: string[],
  owner?: {
    uid: string,
    username: string
  },
  optionCount: number,
  perResponseReward: number,
  isLimitResponse: boolean,
  responseLimit: number,
  durationDays: number,
  responses: any,
  paid: boolean,
}

const PollSchema = new Schema<IPoll>({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
  },
  distribution: {
    type: String,
  },
  optionCount: {
    type: Number,
  },
  perResponseReward: {
    type: Number,
  },
  isLimitResponse: {
    type: Boolean,
  },
  responseLimit: {
    type: Number,
  },
  durationDays: {
    type: Number,
  },
  owner: {
    type: ObjectId,
    ref: 'User',
  },
  options: [{
    type: String
  }],
  paid: {
    type: Boolean,
  },
  responses: [{
    name: String,
    response: String
  }],
});

// var diffHistory = require("mongoose-diff-history/diffHistory").plugin;
// const dbName = env.mongo_db_name;
// const mongoUri = `mongodb://${env.mongo_host}/${dbName}`;
// PricingSchema.plugin(diffHistory, {
//   uri: mongoUri,
// });

export default PollSchema;
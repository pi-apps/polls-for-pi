import { Schema, Types } from 'mongoose';
const { ObjectId } = Schema.Types;

interface IPollPricing {
  product: Types.ObjectId;
  description: string;
  tier: number;
  perOption: number;
  perResponse: number;
  perDay: number;
}

const PollPricingSchema = new Schema<IPollPricing>({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  description: {
    type: String,
  },
  tier: {
    type: Number,
  },
  perOption: {
    type: Number,
  },
  perResponse: {
    type: Number,
  },
  perDay: {
    type: Number,
  },
});

// var diffHistory = require("mongoose-diff-history/diffHistory").plugin;
// const dbName = env.mongo_db_name;
// const mongoUri = `mongodb://${env.mongo_host}/${dbName}`;
// PollPricingSchema.plugin(diffHistory, {
//   uri: mongoUri,
// });

export default PollPricingSchema;
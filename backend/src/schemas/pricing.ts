import { Schema, Types } from 'mongoose';
const { ObjectId } = Schema.Types;

interface IPricing {
  description: string;
  tier: number;
  perOption: number;
  priceItems: [];
  product: Types.ObjectId;
}

const PricingSchema = new Schema<IPricing>({
  description: {
    type: String,
    trim: true,
  },
  tier: {
    type: Number,
  },
  priceItems: [{
    name: String,
    price: Number
  }],
  product: {
    type: ObjectId,
    ref: 'Product',
    required: true,
    unique: true,
  },
});

// var diffHistory = require("mongoose-diff-history/diffHistory").plugin;
// const dbName = env.mongo_db_name;
// const mongoUri = `mongodb://${env.mongo_host}/${dbName}`;
// PricingSchema.plugin(diffHistory, {
//   uri: mongoUri,
// });

export default PricingSchema;
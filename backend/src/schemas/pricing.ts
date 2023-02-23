import { Schema, Types } from 'mongoose';
const { ObjectId } = Schema.Types;

interface IPricing {
  name: string;
  description: string;
  tier: number;
  perOption: number;
  priceItems: [];
  product: Types.ObjectId;
}

const PricingSchema = new Schema<IPricing>({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
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
  },
});

// var diffHistory = require("mongoose-diff-history/diffHistory").plugin;
// const dbName = env.mongo_db_name;
// const mongoUri = `mongodb://${env.mongo_host}/${dbName}`;
// PricingSchema.plugin(diffHistory, {
//   uri: mongoUri,
// });

export default PricingSchema;
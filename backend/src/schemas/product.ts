import { Schema, Types } from 'mongoose';
const { ObjectId } = Schema.Types;

interface IProduct {
  name: string;
  description: string;
  isActive: boolean;
  pricing: Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
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
  isActive: {
    type: Boolean,
  },
  pricing: {
    type: ObjectId,
    ref: 'Pricing',
  },
});

// var diffHistory = require("mongoose-diff-history/diffHistory").plugin;
// const dbName = env.mongo_db_name;
// const mongoUri = `mongodb://${env.mongo_host}/${dbName}`;
// PricingSchema.plugin(diffHistory, {
//   uri: mongoUri,
// });

export default ProductSchema;
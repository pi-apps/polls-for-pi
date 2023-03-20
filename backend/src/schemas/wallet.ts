import { Schema } from 'mongoose';
import { IWallet } from '../types/wallet';
const { ObjectId } = Schema.Types;

const WalletSchema = new Schema<IWallet>({
  owner: {
    uid: String,
    username: String,
  },
  balance: {
    type: Number,
  },
  rewards_balance: {
    type: Number,
  },
  admin_fees: {
    type: Number,
  },
  pending_balance: {
    type: Number,
  },
  pending_rewards_balance: {
    type: Number,
  },
  pending_admin_fees: {
    type: Number,
  },
  refunded: {
    type: Boolean,
  },
  transactions: [{
    type: String,
    amount: Number,
    txDate: Date,
  }],
});

export default WalletSchema;
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
  pending_balance: {
    type: Number,
  },
  transactions: [{
    type: String,
    amount: Number,
    txDate: Date,
  }],
});

export default WalletSchema;
import { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

interface IResponse {
  responseUrl: string;
  username: string;
  uid: string;
  response: string;
  isRewarded: boolean;
  reward: number;
  paymentId: string;
  isPaid: boolean;
  endDate: Date;
  pollTitle: string;
  pollId: string;
  txId: string;
}

const PollResponseSchema = new Schema<IResponse>({
  responseUrl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  isRewarded: {
    type: Boolean,
    default: false,
  },
  reward: {
    type: Number
  },
  paymentId: {
    type: String
  },
  txId: {
    type: String
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  endDate: {
    type: Date
  },
  pollTitle: {
    type: String
  },
  pollId: {
    type: String
  },
});
PollResponseSchema.index(
  { responseUrl: 1, username: 1 },
  {
    unique: true,
    partialFilterExpression: {
      responseUrl: {$exists:true},
      username: {$exists:true}
    }
  }
)

export default PollResponseSchema;
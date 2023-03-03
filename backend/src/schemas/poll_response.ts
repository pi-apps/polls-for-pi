import { Schema } from 'mongoose';
import { IPollResponse } from '../types/poll_response';
const { ObjectId } = Schema.Types;

const PollResponseSchema = new Schema<IPollResponse>({
  // Parent Poll's Payment ID
  pollPaymentId: {
    type: String
  },
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
  isCancelled: {
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
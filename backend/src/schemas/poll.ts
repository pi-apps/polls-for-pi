import { Schema } from 'mongoose';
import { IPoll } from '../types/poll';
const { ObjectId } = Schema.Types;

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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  responseUrl: {
    type: String,
    unique: true,
    required: true,
  },
  isOpen: {
    type: Boolean,
  },
  accessType: {
    type: String,
  },
  color: {
    type: String,
  },
  // owner: {
  //   type: ObjectId,
  //   ref: 'User',
  // },
  options: [{
    type: String
  }],
  paid: {
    type: Boolean,
  },
  paymentId: {
    type: String,
    unique: true,
  },
  responses: [{
    type: ObjectId,
    ref: 'PollResponse',
  }],
  owner: {
    uid: String,
    username: String,
  }
});
//PollSchema.index({ "responses.responseUrl": 1, "responses.username": 1 }, { unique: true })

export default PollSchema;
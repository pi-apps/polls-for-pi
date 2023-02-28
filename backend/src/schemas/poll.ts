import { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

interface IPoll {
  title: string;
  status: string;
  distribution: string,
  options?: string[],
  owner: {
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
  paymentId: string,
  responseUrl: string,
  isOpen: boolean,
}

const ResponseSchema = new Schema({
  responseUrl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});
ResponseSchema.index({ responseUrl: 1, username: 1 }, { unique: true })

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
  responseUrl: {
    type: String,
    unique: true,
    required: true,
  },
  isOpen: {
    type: Boolean,
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
  },
  responses: [
    ResponseSchema
  ],
  owner: {
    uid: String,
    username: String,
  }
});
//PollSchema.index({ "responses.responseUrl": 1, "responses.username": 1 }, { unique: true })

export default PollSchema;
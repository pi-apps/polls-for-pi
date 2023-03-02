import { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

interface IPoll {
  title: string;
  status: string;
  distribution: string;
  options?: string[];
  owner: {
    uid: string;
    username: string;
  };
  optionCount: number;
  perResponseReward: number;
  isLimitResponse: boolean;
  responseLimit: number;
  durationDays: number;
  endDate: Date;
  responses: any;
  paid: boolean;
  paymentId: string;
  responseUrl: string;
  isOpen: boolean;
}

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
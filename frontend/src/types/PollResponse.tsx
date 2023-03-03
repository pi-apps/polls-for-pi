
export type PollResponse = {
  responseUrl: string;
  username: string;
  uid: string;
  response: string;
  isRewarded: boolean;
  reward: number;
  paymentId: string;
  isPaid: boolean;
  isCancelled: boolean;
  endDate: Date;
  pollTitle: string;
  pollId: string;
  txId: string;
  pollPaymentId: string;
};
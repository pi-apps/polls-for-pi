import { IPollResponse } from "./poll_response";

export interface IPoll {
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
  startDate: Date;
  endDate: Date;
  responses: Array<IPollResponse>[];
  paid: boolean;
  paymentId: string;
  responseUrl: string;
  isOpen: boolean;
  accessType: string;
  color: string;
}
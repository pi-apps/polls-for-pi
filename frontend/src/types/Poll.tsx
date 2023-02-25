import { PollResponse } from "./PollResponse";

export type Poll = {
  title: string,
  distribution?: string,
  options?: string[],
  owner?: {
    uid: string,
    username: string
  },
  optionCount: number,
  perResponseReward: number,
  isLimitResponse?: boolean,
  responseLimit: number,
  durationDays: number,
  responses: PollResponse[]

  setTitle?: (title: string) => void;
};
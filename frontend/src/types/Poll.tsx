import { PollResponse } from "./PollResponse";

export type Poll = {
  _id?: string,
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
  closePopup?: (close: boolean) => void;
};
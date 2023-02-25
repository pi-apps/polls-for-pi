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

  setTitle?: (title: string) => void;
};
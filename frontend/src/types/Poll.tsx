export type Poll = {
  title: string,
  type?: string,
  distribute?: string,
  rewards?: string,
  distribution?: string,
  chartType?: string,
  options?: string[],
  owner?: {
    uid: string,
    username: string
  },
  optionCount: number,
  budget?: number,
  perResponseReward: number,
  isLimitResponse?: boolean,
  responseLimit: number,
  durationDays: number,

  setTitle?: (title: string) => void;
};
export type Poll = {
  title?: string,
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
  optionCount?: number,
  budget?: number,
  isLimitResponse?: boolean,
  responseLimit?: number,

  setTitle?: (title: string) => void;
};
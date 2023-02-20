export type Poll = {
  title?: string,
  type?: string,
  distribute?: string,
  rewards?: string,
  distribution?: string,
  distributionType?: string,
  chartType?: string,
  options?: string[],
  owner?: {
    uid: string,
    username: string
  },
  optionCount?: number,
  budget?: number,

  setTitle?: (title: string) => void;
};
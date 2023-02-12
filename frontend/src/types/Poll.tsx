export type Poll = {
  setTitle: () => void;
  title?: string,
  type?: string,
  distribute?: string,
  rewards?: string,
  distribution?: string,
  distributionType?: string,
  chartType?: string,
  owner: {
    uid: string,
    username: string
  }
};
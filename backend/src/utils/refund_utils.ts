import { IPoll } from "../types/poll";
import { IWallet } from "../types/wallet";

export const computeRefund = (poll: IPoll, wallet: IWallet) => {
  console.log('getPollEndDate', poll)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + poll.durationDays);
  console.log('endDate', endDate)
  return endDate;
}
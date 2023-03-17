import { IPoll } from "../types/poll";

export const getEndDate = (poll: IPoll) => {
  let retDate = null;
  if (poll.distribution === 'immediate') {
    retDate = new Date();
  } else {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + poll.durationDays);
    retDate = endDate;
  }
  console.log('retDate', retDate)
  return retDate;
}
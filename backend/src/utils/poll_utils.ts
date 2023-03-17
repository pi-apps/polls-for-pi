import { IPoll } from "../types/poll";

export const getPollEndDate = (poll: IPoll) => {
  console.log('getPollEndDate', poll)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + poll.durationDays);
  console.log('endDate', endDate)
  return endDate;
}

export const getPollResponseEndDate = (poll: IPoll) => {
  console.log('getPollResponseEndDate', poll)
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
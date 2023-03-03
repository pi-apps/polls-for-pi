import { IPoll } from "../types/poll";

export const getEndDate = (poll: IPoll) => {
  if (poll.distribution === 'immediate') {
    return new Date();
  } else {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + poll.durationDays);
    return endDate;
  }
}
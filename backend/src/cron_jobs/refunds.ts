import platformAPIClient from "../services/platformAPIClient";

const CronJob = require('cron').CronJob;

export const processRefund = async (models: any) => {

  try {

    // closed/expired polls
    const { Poll } = models;
    const closedPolls = await Poll.find({});

    console.log('closedPolls count', closedPolls.length)

  } catch (error) {
    console.log('cron job error', error);
  }

};
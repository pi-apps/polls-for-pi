import { Router } from "express";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import "../types/session";
import { getPollEndDate, getPollResponseEndDate } from "../utils/poll_utils";

export default function mountPublicPollsEndpoints(router: Router, models: any) {

  router.get('/', async (req, res) => {
    console.log('get public polls')
    const { Poll } = models;
    const { filter, responseUrl, username } = req.query;

    let items = await Poll.aggregate([
      {
        $match: {
          accessType: 'public',
          isOpen: true,
        }
      },
      {
        $sample: {
          size: 50
        }
      },
      {
        $project: {
          'owner.username': '$owner.username',
          endDate: 1,
          perResponseReward: 1,
          responseUrl: 1,
          title: 1,
          totalResponses: { $size: '$responses' },
        }
      }
    ])

    return res.status(200).json({ data: items });
  });

}

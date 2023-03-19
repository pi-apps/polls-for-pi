import { Router } from "express";
import "../types/session";

export default function mountPublicPollsEndpoints(router: Router, models: any) {

  router.get('/', async (req, res) => {
    console.log('get public polls')
    const { Poll } = models;

    let items = await Poll.aggregate([
      {
        $match: {
          accessType: 'public',
          isOpen: true,
        }
      },
      {
        $sample: {
          size: 10
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

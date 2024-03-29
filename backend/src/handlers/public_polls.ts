import { Router } from "express";
import "../types/session";

export default function mountPublicPollsEndpoints(router: Router, models: any) {

  router.get('/', async (req, res) => {
    console.log('get public polls')
    const { Poll } = models;
    const { promoted } = req.query;

    const query: any = {
      accessType: 'public',
      isOpen: true,
    }
    if (promoted === 'true') {
      query.promoted = true;
    }
    let items = await Poll.aggregate([
      {
        $match: query,
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

import { Router } from "express";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import "../types/session";
import { getEndDate } from "../utils/poll_utils";

export default function mountPollEndpoints(router: Router, models: any) {
  // endpoin for
  router.post('/', async (req, res) => {
    const { Poll } = models;
    const item = new Poll();

    const { poll, user, paymentId } = req.body;

    if (!req.body.poll.title) {
      return res.status(400).json({ message: "Poll should have a name." });
    }

    const responseUrl = uuidv4();
    _.extend(item, req.body.poll);
    item.responseUrl = responseUrl;
    if (paymentId) item.paymentId = paymentId;
    item.owner = { ...user }

    item.startDate = new Date();
    item.endDate = getEndDate(poll);
    await item.save();

    return res.status(200).json({ data: item });
  });

  router.get('/', async (req, res) => {
    const { Poll } = models;
    const { filter, responseUrl, username } = req.query;

    let items = [];
    if (filter) {
      items = await Poll.find({ filter }).populate('responses');
    } else if (responseUrl) {
      items = await Poll.find({ filter }).populate('responses');
    } else {
      items = await Poll.find({ 'owner.username': username }).populate('responses');
    }

    // order doesn't exist
    // if (!items || items.length <= 0) {
    //   return res.status(400).json({ message: "No polls found." });
    // }

    return res.status(200).json({ data: items });
  });

  router.get('/:pollId', async (req, res) => {
    const { pollId } = req.params;
    const { Poll } = models;
    const item = await Poll.findOne({ _id: pollId })
      .populate('responses');

    // order doesn't exist
    if (!item) {
      return res.status(400).json({ message: "No poll found." });
    }

    return res.status(200).json({ data: item });
  });

  router.patch('/:paymentId', async (req, res) => {
    console.log('patching poll');

    const { Poll } = models;
    const { paymentId } = req.params;
    const item = await Poll.findOne({ paymentId });

    // poll doesn't exist
    if (!item) {
      return res.status(400).json({ message: "Poll not found." });
    }

    item.paid = true;
    await item.save();

    return res.status(200).json({ data: item });
  });

  router.put('/:_id', async (req, res) => {
    console.log('updating poll', req.body);

    const { Poll } = models;
    const { _id } = req.params;
    const item = await Poll.findOne({ _id });

    // poll doesn't exist
    if (!item) {
      return res.status(400).json({ message: "Poll not found." });
    }

    const { title, options } = req.body;
    item.title = title;

    if (!_.isEmpty(options)) {
      options.forEach((option: string, index: number) => {
        item.options[index] = option;
      })
    }
    await item.save();

    return res.status(200).json({ data: item });
  });

  router.get('/:responseUrl/poll', async (req, res) => {
    console.log('getting poll using responseUrl');

    const { Poll } = models;
    const { responseUrl } = req.params;
    const item = await Poll.findOne({ responseUrl })
      .populate('responses');

    // poll doesn't exist
    if (!item) {
      return res.status(400).json({ message: "Poll not found." });
    }

    return res.status(200).json({ options: item.options, title: item.title });
  });

  router.post('/:responseUrl/responses', async (req, res) => {
    console.log('submitting response', req.body);

    const { Poll, PollResponse } = models;
    const { responseUrl } = req.params;
    const item = await Poll.findOne({ responseUrl });

    // poll doesn't exist
    if (!item) {
      return res.status(400).json({ message: "Poll not found." });
    }

    // max responses reached
    if (item.responses.length >= item.responseLimit) {
      return res.status(400).json({ message: "Poll response limit reached." });
    }

    const { username, response, uid } = req.body;
    const pollResp = { username, uid, response, responseUrl };
    const userResp = await PollResponse.findOne({ responseUrl, username});

    // If already responded
    if (userResp) {
      console.log('user already responsed');
      return res.status(400).json({ message: "User already responded." });
    }

    const newResp = new PollResponse();
    _.extend(newResp, pollResp);
    newResp.endDate = getEndDate(item);
    newResp.reward = item.perResponseReward;
    newResp.pollTitle = item.title;
    newResp.pollId = item._id;
    newResp.responseUrl = item.responseUrl;
    await newResp.save();

    item.responses.push(newResp);
    if (item.responses.length >= item.responseLimit) {
      item.isOpen = false;
    }
    await item.save();

    return res.status(200).json({ data: item });
  });

  // router.delete('/:_id', async (req, res) => {
  //   const { _id } = req.params;

  //   const { Product } = models;

  //   try {
  //     const item = await Product.findOneAndDelete({ _id });
  //     res.status(200).send({ data: item, message: "Product successfully deleted!" });
  //   } catch (error) {
  //     console.log('error', error)
  //     return res.status(400).json({ message: "Error deleting product." });
  //   }
  // });

}

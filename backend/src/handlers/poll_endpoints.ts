import { Router } from "express";
import _ from 'lodash';
import "../types/session";

export default function mountPollEndpoints(router: Router, models: any) {
  router.post('/', async (req, res) => {
    const { Poll } = models;
    const item = new Poll();

    console.log('req.body', req.body)
    const { poll, user, paymentId } = req.body;
    console.log('poll', poll)
    console.log('user', user)
    console.log('paymentId', paymentId)

    if (!req.body.poll.title) {
      return res.status(400).json({ message: "Poll should have a name." });
    }

    _.extend(item, req.body.poll);
    await item.save();

    return res.status(200).json({ data: item });
  });

  router.get('/', async (req, res) => {
    const { Poll } = models;
    const { filter } = req.query;
    console.log('filter', filter)

    let items = [];
    if (filter) {
      items = await Poll.find({ filter });
    } else {
      items = await Poll.find({ });
    }

    // order doesn't exist
    if (!items || items.length <= 0) {
      return res.status(400).json({ message: "No polls found." });
    }

    return res.status(200).json({ data: items });
  });

  router.get('/:_id', async (req, res) => {
    const { _id } = req.params;
    console.log('_id', _id)
    const { Poll } = models;
    const item = await Poll.findOne({ _id });

    console.log('_id', _id)

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
    console.log('patched poll', item);

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

    _.assign(item, ...req.body)
    const options: string[] = req.body.options;
    if (!_.isEmpty(options)) {
      options.forEach((option: string, index: number) => {
        item.options[index] = option;
      })
    }
    await item.save();
    console.log('updated poll', item);

    return res.status(200).json({ data: item });
  });

  router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    console.log('_id', _id)

    const { Product } = models;

    try {
      const item = await Product.findOneAndDelete({ _id });
      res.status(200).send({ data: item, message: "Product successfully deleted!" });
    } catch (error) {
      console.log('error', error)
      return res.status(400).json({ message: "Error deleting product." });
    }
  });

}

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
    const { Product } = models;
    const products = await Product.find({ });

    // order doesn't exist
    if (!products || products.length <= 0) {
      return res.status(400).json({ message: "No products found." });
    }

    return res.status(200).json({ data: products });
  });

  router.patch('/:_id', async (req, res) => {
    const { Poll } = models;
    const { _id } = req.params;
    const item = await Poll.findOne({ _id });

    // order doesn't exist
    if (!item) {
      return res.status(400).json({ message: "Poll not found." });
    }

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
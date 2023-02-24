import { Router } from "express";
import _ from 'lodash';
import "../types/session";

export default function mountProductsEndpoints(router: Router, models: any) {
  router.post('/', async (req, res) => {
    const { Product } = models;
    const product = new Product();
    console.log('req.body', req.body)

    if (!req.body.name) {
      return res.status(400).json({ message: "Product should have a name." });
    }

    _.extend(product, req.body);
    await product.save();

    return res.status(200).json({ data: product });
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
  }

}

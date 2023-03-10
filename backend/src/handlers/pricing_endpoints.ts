import { Router } from "express";
import _ from 'lodash';
import "../types/session";

export default function mountPricingEndpoints(router: Router, models: any) {
  router.post('/', async (req, res) => {
    console.log('post pricing endpoint')
    const { Pricing, Product } = models;
    console.log('req.body', req.body)

    let query = { };
    const productName = req.body.product;
    console.log('productName', productName)
    if (productName) {
      query = {
        name: new RegExp(`${productName}`, 'i')
      };
    }

    const products = await Product.find(query);
    console.log('product', products)
    if (!products) {
      return res.status(400).json({ message: "No product found." });
    }

    const pricing = new Pricing();

    _.extend(pricing, ...req.body);
    pricing.product = products[0]._id;

    const { priceItems } = req.body;
    console.log('priceItems', priceItems)
    if (priceItems.length > 0) {
      priceItems.forEach((item: any, index: number) => {
        pricing.priceItems[index] = { name: item.name, price: item.price };
      })
    }
    await pricing.save();
    console.log('pricing', pricing)

    // failed to create pricing
    if (!pricing) {
      return res.status(400).json({ message: "Failed to create pricing." });
    }

    return res.status(200).json({ data: pricing });
  });

  router.get('/', async (req, res) => {
    console.log('list pricing endpoint')
    const { Pricing, Product } = models;

    let query = { };
    const productName = req.query.product;
    console.log('productName', productName)
    if (productName) {
      query = {
        name: new RegExp(`${productName}`, 'i')
      };
    }
    console.log('query', query)

    let pricing = null;
    if (productName) {
      const product = await Product.find(query);
      console.log('product', product)

      // no products found
      if (!product) {
        return res.status(400).json({ message: "No products found." });
      }

      pricing = await Pricing.find({ product });
    } else {
      pricing = await Pricing.find({  });
    }
    console.log('pricing', pricing)

    // order doesn't exist
    if (!pricing) {
      return res.status(400).json({ message: "No pricing found." });
    }

    return res.status(200).json({ data: pricing });
  });

  router.get('/:_id', async (req, res) => {
    console.log('get pricing endpoint')
    const { Pricing } = models;
    const { _id } = req.params;
    console.log('_id', _id)

    const pricing = await Pricing.find({ _id });
    console.log('pricing', pricing)

    // order doesn't exist
    if (!pricing) {
      return res.status(400).json({ message: "No pricing found." });
    }

    return res.status(200).json({ data: pricing[0] });
  });

  router.put('/:_id', async (req, res) => {
    console.log('patching pricing');
    const { _id } = req.params;

    const { Pricing } = models;
    const item = await Pricing.findOne({ _id });

    // poll doesn't exist
    if (!item) {
      return res.status(400).json({ message: "Pricing not found." });
    }
    _.assign(item, ...req.body);

    const { priceItems } = req.body;
    console.log('priceItems', priceItems)
    if (priceItems.length > 0) {
      priceItems.forEach((priceItem: any, index: number) => {
        item.priceItems[index] = { name: priceItem.name, price: priceItem.price };
      })
    }
    await item.save();
    console.log('patched pricing', item);

    return res.status(200).json({ data: item });
  });

  router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    console.log('_id', _id)

    const { Pricing } = models;

    try {
      const item = await Pricing.findOneAndDelete({ _id });
      res.status(200).send({ data: item, message: "Pricing successfully deleted!" });
    } catch (error) {
      console.log('error', error)
      return res.status(400).json({ message: "Error deleting pricing." });
    }
  });

}

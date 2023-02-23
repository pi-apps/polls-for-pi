import { Router } from "express";
import "../types/session";

export default function mountPricingEndpoints(router: Router, models: any) {
  router.get('/', async (req, res) => {
    const { Pricing, Product } = models;

    let query = { };
    const productName = req.body.product;
    if (productName) {
      query = {
        name: new RegExp(`${productName}`, 'i')
      };
    }

    const app = req.app;
    const product = await Product.find(query);
    const pricing = await Pricing.find({ product });

    console.log('pricing', pricing)

    // order doesn't exist
    if (!pricing) {
      return res.status(400).json({ message: "No pricing found." });
    }

    return res.status(200).json({ data: pricing[0] });
  });

}

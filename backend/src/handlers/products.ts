import { Router } from "express";
import "../types/session";

export default function mountProductsEndpoints(router: Router) {
  router.get('/', async (req, res) => {
    const app = req.app;
    const { Product } = app.locals.collections;
    const products = await Product.find({ });

    // order doesn't exist
    if (!products || products.length <= 0) {
      return res.status(400).json({ message: "No products found." });
    }

    return res.status(200).json({ data: products });
  });

}

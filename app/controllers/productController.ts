import { Request, Response } from "express";
import {
  createProduct,
  storeProduct,
  updateProduct,
} from "../services/productService";
import { Product } from "@prisma/client";
class ProductController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const product = await createProduct(data);
      res.status(201).json({ message: "success", data: product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    const product_id = req.body.product_id;
    const data: Product = req.body;
    try {
      const product = await updateProduct(data);
      res.status(202).json({ message: "success", data: product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getByStore(req: Request, res: Response) {
    try {
      const product = await storeProduct(req.params.id);
      res.status(202).json({ message: "success", data: product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default ProductController;

import { Request, Response } from "express";
import BukalapakService from "../services/bukalapakServices";
import BlibliService from "../services/blibliServices";

const productService = new BlibliService(); // Buat instance service

class BlibliController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProductByKeyword(req: Request, res: Response) {
    try {
      const keyword = req.params.id;
      const product = await productService.getProductByKeyword(keyword);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default BlibliController;

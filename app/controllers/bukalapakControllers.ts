import { Request, Response } from "express";
const puppeteer = require("puppeteer-extra");
import BukalapakService from "../services/bukalapakServices";

const productService = new BukalapakService(); // Buat instance service

class BukalapakController {
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

export default BukalapakController;

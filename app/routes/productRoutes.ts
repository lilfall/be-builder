import express from "express";
import ProductController from "../controllers/productController";

const router = express.Router();

const productController = new ProductController();

// Menangani rute "/product"
router.post("/", productController.create);
router.patch("/", productController.update);
router.get("/:id", productController.getByStore);

export default router;

import express from "express";
import BlibliController from "../controllers/blibliControllers";

const router = express.Router();

const blibliControllers = new BlibliController();

// Menangani rute "/products" (Endpoint untuk daftar produk)
router.get("/", blibliControllers.getAllProducts);

// Menangani rute "/products/:id" (Endpoint untuk detail produk)
router.get("/:id", blibliControllers.getProductByKeyword);

export default router;

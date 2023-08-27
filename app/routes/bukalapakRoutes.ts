import express from "express";
import BukalapakController from "../controllers/bukalapakControllers";

const router = express.Router();

const bukalapakController = new BukalapakController();

// Menangani rute "/products" (Endpoint untuk daftar produk)
router.get("/", bukalapakController.getAllProducts);

// Menangani rute "/products/:id" (Endpoint untuk detail produk)
router.get("/:id", bukalapakController.getProductByKeyword);

export default router;

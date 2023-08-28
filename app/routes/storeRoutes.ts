import express from "express";
import UserController from "../controllers/userController";
import StoreController from "../controllers/storeController";

const router = express.Router();

const userController = new UserController();
const storeController = new StoreController();

// Menangani rute "/store"
router.post("/", storeController.newStore);
router.get("/:id", storeController.getStore);
router.post("/setting", storeController.storeSetting);
router.delete("/", storeController.storeDelete);

export default router;

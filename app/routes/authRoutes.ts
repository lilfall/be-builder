import express from "express";
import AuthController from "../controllers/authControllers";

const router = express.Router();

const authController = new AuthController();

// Menangani rute "/user"
router.post("/login", authController.authLogin);
router.post("/register", authController.authRegister);

export default router;

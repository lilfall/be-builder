import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

const userController = new UserController();

// Menangani rute "/user"
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/:id", userController.userById);

export default router;

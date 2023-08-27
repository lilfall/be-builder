import { Request, Response } from "express";
import AuthService from "../services/AuthServices";
import User from "../models/db-model/user";

const authService = new AuthService();

type RegistrationData = {
  email: string;
  password: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  additionalData: object;
};

class AuthController {
  async authLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Panggil fungsi login dari AuthService
      const loginResult = await authService.login(email, password);

      if (loginResult.status === "sukses") {
        res
          .status(200)
          .json({ message: "Login successful", token: loginResult.token });
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async authRegister(req: Request, res: Response) {
    try {
      const {
        email,
        password,
        fullName,
        address,
        phoneNumber,
        additionalData,
      } = req.body as RegistrationData;

      await authService.register(
        email,
        password,
        fullName,
        address,
        phoneNumber,
        additionalData
      );

      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      res.status(500).json({ message: "Registration failed" });
    }
  }
}

export default AuthController;

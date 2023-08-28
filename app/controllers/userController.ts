import { Request, Response } from "express";
import { createUser } from "../services/userService";
import bcrypt from "bcrypt";
class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { email, password, fullName, address, phoneNumber } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser({
        email,
        password: hashedPassword,
        fullName,
        address,
        phoneNumber,
        // tambahkan field-field lainnya yang sesuai dengan model User
      });

      res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default UserController;

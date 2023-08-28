import { Request, Response } from "express";
import { createUser, getUserById, loginUser } from "../services/userService";
class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { email, password, fullName, address, phoneNumber } = req.body;

      const newUser = await createUser({
        email,
        password,
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

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const login = await loginUser({ email, password });
      if (login.status == "Success") {
        res.status(200).json({ login });
      } else {
        res
          .status(404)
          .json({ status: "Failed", message: "Email or password not match" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async userById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await getUserById(id);

      res.status(200).json({ message: "success", data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default UserController;

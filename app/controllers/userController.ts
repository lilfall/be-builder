import { Request, Response } from "express";
import { createUser, getUserById, loginUser } from "../services/userService";
class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const newUser = await createUser({
        ...data,
      });
      const result = newUser;
      if (newUser.data.meta) {
        result.data = newUser.data.meta;
      }
      res.status(result.code).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const login = await loginUser(data);
      if (login) {
        res.status(200).json(login);
      } else {
        res.status(404).json({ message: "Login Failed" });
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

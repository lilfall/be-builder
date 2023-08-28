import { Request, Response } from "express";
import {
  createStore,
  deleteStore,
  getAll,
  setSetting,
} from "../services/storeService";

class StoreController {
  async getStore(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const store = await getAll(id);
      res.status(201).json({ message: "success", data: store });
    } catch (error) {
      res.status(500).json({ message: "Internal server error mnih" });
    }
  }

  async newStore(req: Request, res: Response) {
    console.log(req.body);
    try {
      const { store_name, user_id } = req.body;
      const newStore = await createStore({
        user_id,
        store_name,
      });
      res.status(201).json({ message: "success", store: newStore });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  }

  async storeSetting(req: Request, res: Response) {
    try {
      const store_id = req.body.store_id;
      const settingData = req.body.setting;
      const setting = await setSetting({
        store_id: store_id,
        setting: settingData,
      });
      res.status(200).json({ message: "success", setting });
    } catch (error) {
      res.status(500).json({ message: "internal server error", error: error });
    }
  }

  async storeDelete(req: Request, res: Response) {
    try {
      const store_id = req.body.store_id;
      const deletes = await deleteStore({
        store_id: store_id,
      });
      res.status(201).json({ message: "success", store: deletes });
    } catch (error) {
      res.status(500).json({ message: "internal server error", error: error });
    }
  }
}

export default StoreController;

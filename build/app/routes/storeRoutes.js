"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const storeController_1 = __importDefault(require("../controllers/storeController"));
const router = express_1.default.Router();
const userController = new userController_1.default();
const storeController = new storeController_1.default();
// Menangani rute "/store"
router.post("/", storeController.newStore);
router.get("/", storeController.getStore);
router.post("/setting", storeController.storeSetting);
router.delete("/", storeController.storeDelete);
router.get("/user/:id", storeController.storeByUser);
router.get("/:id", storeController.storeById);
exports.default = router;

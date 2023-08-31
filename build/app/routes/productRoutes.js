"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
const router = express_1.default.Router();
const productController = new productController_1.default();
// Menangani rute "/product"
router.post("/", productController.create);
router.patch("/", productController.update);
router.get("/:id", productController.getByStore);
exports.default = router;

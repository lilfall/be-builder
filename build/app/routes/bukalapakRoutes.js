"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bukalapakControllers_1 = __importDefault(require("../controllers/bukalapakControllers"));
const router = express_1.default.Router();
const bukalapakController = new bukalapakControllers_1.default();
// Menangani rute "/products" (Endpoint untuk daftar produk)
router.get("/", bukalapakController.getAllProducts);
// Menangani rute "/products/:id" (Endpoint untuk detail produk)
router.get("/:id", bukalapakController.getProductByKeyword);
exports.default = router;

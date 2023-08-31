"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blibliControllers_1 = __importDefault(require("../controllers/blibliControllers"));
const router = express_1.default.Router();
const blibliControllers = new blibliControllers_1.default();
// Menangani rute "/products" (Endpoint untuk daftar produk)
router.get("/", blibliControllers.getAllProducts);
// Menangani rute "/products/:id" (Endpoint untuk detail produk)
router.get("/:id", blibliControllers.getProductByKeyword);
exports.default = router;

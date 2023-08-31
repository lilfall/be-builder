"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Mengimpor rute bukalapak
const bukalapakRoutes_1 = __importDefault(require("./routes/bukalapakRoutes"));
const blibliRoutes_1 = __importDefault(require("./routes/blibliRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const storeRoutes_1 = __importDefault(require("./routes/storeRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
const port = 3070;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Gunakan rute produk
app.use("/bukalapak", bukalapakRoutes_1.default);
app.use("/blibli", blibliRoutes_1.default);
app.use("/user", authRoutes_1.default);
app.use("/store", storeRoutes_1.default);
app.use("/product", productRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

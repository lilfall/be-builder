"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeProduct = exports.updateProduct = exports.createProduct = void 0;
function createProduct(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { product_name, description, price, stock, store_id } = data;
        try {
            const product = yield prisma.product.create({
                data: {
                    product_name,
                    description,
                    price,
                    stock,
                    store_id,
                },
            });
            return product;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createProduct = createProduct;
function updateProduct(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const product_id = data.product_id;
        const cleanedData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null));
        try {
            const product = yield prisma.product.update({
                where: {
                    product_id,
                },
                data: Object.assign({}, cleanedData),
            });
            return product;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateProduct = updateProduct;
function storeProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield prisma.store.findUnique({
                where: {
                    store_id: id,
                },
                include: {
                    products: true,
                },
            });
            return product;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.storeProduct = storeProduct;

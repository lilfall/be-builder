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
const storeService_1 = require("../services/storeService");
class StoreController {
    getStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const store = yield (0, storeService_1.getAll)();
                res.status(201).json({ message: "success", data: store });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error " });
            }
        });
    }
    storeByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const store = yield (0, storeService_1.getStoreByUser)(id);
                res.status(201).json({ message: "success", data: store });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error " });
            }
        });
    }
    storeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const store = yield (0, storeService_1.getStoreById)(id);
                res.status(201).json({ message: "success", data: store });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error " });
            }
        });
    }
    newStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const { store_name, user_id } = req.body;
                const newStore = yield (0, storeService_1.createStore)({
                    user_id,
                    store_name,
                });
                res.status(201).json({ message: "success", store: newStore });
            }
            catch (error) {
                res.status(500).json({ message: "internal server error" });
            }
        });
    }
    storeSetting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store_id = req.body.store_id;
                const settingData = req.body.setting;
                const setting = yield (0, storeService_1.setSetting)({
                    store_id: store_id,
                    setting: settingData,
                });
                res.status(200).json({ message: "success", setting });
            }
            catch (error) {
                res.status(500).json({ message: "internal server error", error: error });
            }
        });
    }
    storeDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store_id = req.body.store_id;
                const deletes = yield (0, storeService_1.deleteStore)({
                    store_id: store_id,
                });
                res.status(201).json({ message: "success", store: deletes });
            }
            catch (error) {
                res.status(500).json({ message: "internal server error", error: error });
            }
        });
    }
}
exports.default = StoreController;

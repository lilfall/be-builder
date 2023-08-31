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
exports.deleteStore = exports.setSetting = exports.createStore = exports.getStoreById = exports.getStoreByUser = exports.getAll = void 0;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const store = yield prisma.store.findMany({
                include: {
                    User: {
                        select: {
                            name: true,
                        },
                    },
                    _count: true,
                },
            });
            return store;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}
exports.getAll = getAll;
function getStoreByUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const store = yield prisma.user.findUnique({
                where: {
                    id: id,
                },
                select: {
                    name: true,
                    email: true,
                    store: {
                        include: {
                            _count: true,
                        },
                    },
                },
            });
            return store;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}
exports.getStoreByUser = getStoreByUser;
function getStoreById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const store = yield prisma.store.findUnique({
                where: {
                    store_id: id,
                },
                include: {
                    _count: true,
                },
            });
            return store;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}
exports.getStoreById = getStoreById;
function createStore(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = data.user_id;
        try {
            const create = yield prisma.store.create({
                data: {
                    store_name: data.store_name,
                    user_id: user_id,
                    store_setting: {},
                },
            });
            return create;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createStore = createStore;
function setSetting(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = data.store_id;
        try {
            const setting = yield prisma.store.update({
                where: {
                    store_id: id,
                },
                data: {
                    store_id: id,
                    store_setting: data.setting,
                },
            });
            return setting;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.setSetting = setSetting;
function deleteStore(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = data.store_id;
        try {
            const deletes = yield prisma.store.delete({
                where: {
                    store_id: id,
                },
            });
            return deletes;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.deleteStore = deleteStore;

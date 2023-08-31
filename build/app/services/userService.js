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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.loginUser = exports.createUser = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cleanedData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null));
            const user = yield client_1.default.user.create({
                data: Object.assign({ email: data.email }, cleanedData),
            });
            return user;
        }
        catch (error) {
            return error;
        }
    });
}
exports.createUser = createUser;
function loginUser(data) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield client_1.default.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (user) {
                const hashedPassword = yield bcrypt_1.default.compare(data.password, (_a = user.password) !== null && _a !== void 0 ? _a : "");
                if (hashedPassword) {
                    return user;
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.loginUser = loginUser;
function getUserById(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = user_id;
        try {
            const user = yield client_1.default.user.findUnique({
                where: {
                    id: id,
                },
                include: {
                    _count: true,
                },
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getUserById = getUserById;

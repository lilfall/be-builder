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
const userService_1 = require("../services/userService");
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, userService_1.createUser)(req.body);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const login = yield (0, userService_1.loginUser)(data);
                if (login) {
                    res.status(200).json(login);
                }
                else {
                    res.status(404).json({ message: "Login Failed" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    userById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield (0, userService_1.getUserById)(id);
                res.status(200).json({ message: "success", data: user });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.default = UserController;

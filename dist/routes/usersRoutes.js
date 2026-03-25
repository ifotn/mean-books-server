"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// url mapping
router.post('/register', usersController_1.register);
router.post('/login', usersController_1.login);
router.get('/logout', usersController_1.logout);
// check for valid jwt => return true / false as client app can't read cookie by itself
router.get('/verify', auth_1.verifyToken, usersController_1.verifyAuth);
exports.default = router;

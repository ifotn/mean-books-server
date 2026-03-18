"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    // check if jwt is valid
    try {
        // get jwt from cookie
        const authToken = req.cookies.authToken;
        if (!authToken)
            throw new Error('Unauthorized');
        // convert jwt contents back to simple user json object
        const decode = jsonwebtoken_1.default.verify(authToken, process.env.PASSPORT_SECRET);
        req.user = decode;
        next(); // user is authenticated, continue to next method
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized ' });
    }
};
exports.verifyToken = verifyToken;

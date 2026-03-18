"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const register = async (req, res) => {
    try {
        const duplicateUser = await user_1.default.find({ username: req.body.username });
        if (duplicateUser.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        if (req.body.password.length < 8) {
            return res.status(400).json({ error: 'Password must be min 8 characters' });
        }
        // first create user
        const user = new user_1.default({ username: req.body.username });
        // then hash password
        await user.setPassword(req.body.password);
        // create new user
        await user.validate();
        await user.save();
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        // first try by username only
        const user = await user_1.default.findOne({ username: req.body.username });
        // username not found
        if (!user)
            throw new Error('Invalid Login');
        const result = await user.authenticate(req.body.password);
        // incorrect password after salt / hash
        if (!result.user)
            throw new Error('Invalid Login');
        // success => return id and username but not salt & hash password vals
        return res.status(200).json({ id: result.user._id, username: result.user.username });
    }
    catch (error) {
        return res.status(401).json('Invalid Login');
    }
};
exports.login = login;

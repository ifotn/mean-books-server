import express, { Request, Response } from 'express';
import User from '../models/user';

export const register = async(req: Request, res: Response) => {
    try {
        const duplicateUser = await User.find({ username: req.body.username });

        if (duplicateUser.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        if (req.body.password.length < 8) {
             return res.status(400).json({ error: 'Password must be min 8 characters' });
        }

        // first create user
        const user = new User({ username: req.body.username });

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
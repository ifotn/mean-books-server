import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

// private methods for token mgmt
const generateToken = (user: any): string => {
    // make jwt with user data
    const jwtPayload = {
        id: user._id,
        username: user.username
    };

    const jwtOptions = { expiresIn: '1hr' };

    // make token using options above
    return jwt.sign(jwtPayload, process.env.PASSPORT_SECRET, jwtOptions);
}

const setTokenCookie = (res: Response, token: string) => {
    // put jwt in httponly cookie
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
}

const clearTokenCookie = (res: Response) => {
    // remove cookie containing jwt
    res.clearCookie('authToken');
}

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
        return res.status(201).json({ id: user._id, username: user.username });
    }
    catch (error) {
        return res.status(400).json(error);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // first try by username only
        const user = await User.findOne({ username: req.body.username });

        // username not found
        if (!user) throw new Error('Invalid Login');

        const result = await user.authenticate(req.body.password);

        // incorrect password after salt / hash
        if (!result.user) throw new Error('Invalid Login');

        // success 
        // create jwt using user id + username
        const authToken: string = generateToken(result.user);
        
        // store jwt in httponly cookie
        setTokenCookie(res, authToken);

        // return id and username but not salt & hash password vals
        return res.status(200).json({ id: result.user._id, username: result.user.username });
    }
    catch (error) {
        return res.status(401).json('Invalid Login');
    }
};

export const logout = (req: Request, res: Response) => {
    // remove cookie containing jwt
    clearTokenCookie(res);
    return res.status(200).json({ message: 'Logged Out' });
}

export const verifyAuth = (req: Request, res: Response) => {
    res.status(200).json({
        authenticated: true,
        username: req.user?.username
    });
}
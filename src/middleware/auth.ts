import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    username: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // check if jwt is valid
    try {
        // get jwt from cookie
        const authToken: string = req.cookies.authToken;

        if (!authToken) throw new Error('Unauthorized');

        // convert jwt contents back to simple user json object
        const decode: JwtPayload = jwt.verify(authToken, process.env.PASSPORT_SECRET) as JwtPayload;
        req.user = decode;
        next();  // user is authenticated, continue to next method
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized '});
    }
}

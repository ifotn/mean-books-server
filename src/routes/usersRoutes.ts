import express, { Router } from 'express';
import { register, login, logout, verifyAuth } from '../controllers/usersController';
import { verifyToken } from '../middleware/auth';

const router: Router = express.Router();

// url mapping
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// check for valid jwt => return true / false as client app can't read cookie by itself
router.get('/verify', verifyToken, verifyAuth);

export default router;
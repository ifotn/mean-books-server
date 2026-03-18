import express, { Router } from 'express';
import { register, login, logout } from '../controllers/usersController';

const router: Router = express.Router();

// url mapping
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
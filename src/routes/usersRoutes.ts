import express, { Router } from 'express';
import { register, login } from '../controllers/usersController';

const router: Router = express.Router();

// url mapping
router.post('/register', register);
router.post('/login', login);

export default router;
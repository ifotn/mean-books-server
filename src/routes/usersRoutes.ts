import express, { Router } from 'express';
import { register } from '../controllers/usersController';

const router: Router = express.Router();

// url mapping
router.post('/register', register);

export default router;
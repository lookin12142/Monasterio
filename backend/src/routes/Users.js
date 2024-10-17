import express from 'express';
const router = express.Router();
import { createUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

router.post('/', auth, createUser);

export default router;

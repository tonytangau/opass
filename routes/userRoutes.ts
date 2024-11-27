import express from 'express';
import { authenticateJWT } from "../middleware/jwtMiddleware";
import { getUserProfile } from '../controllers/userController';

const router = express.Router();

router.get('/profile', authenticateJWT, getUserProfile);

export default router;

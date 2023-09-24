import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.insertIntoDB);
router.post('/signin', AuthController.loginUser);
router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;

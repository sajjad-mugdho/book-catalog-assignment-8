import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.post('/create-user', UserController.insertIntoDB);

export const UserRoutes = router;

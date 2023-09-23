import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.updateUser);

export const UserRoutes = router;

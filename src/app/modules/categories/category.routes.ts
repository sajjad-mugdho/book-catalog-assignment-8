import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getCategoryById);
router.patch('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);
export const CategoryRoutes = router;

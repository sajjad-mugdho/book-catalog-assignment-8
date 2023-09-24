import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './books.controller';

const router = express.Router();
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);
router.get('/:categoryId/category', BookController.getBooksByCategory);

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateBook);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

// /api/v1/books/:categoryId/category

export const BookRoutes = router;

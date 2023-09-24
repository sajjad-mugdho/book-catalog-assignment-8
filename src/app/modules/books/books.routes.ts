import express from 'express';
import { BookController } from './books.controller';

const router = express.Router();
router.post('/create-book', BookController.createBook);
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.patch('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

// /api/v1/books/:categoryId/category

export const BookRoutes = router;

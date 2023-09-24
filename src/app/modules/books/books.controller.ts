import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './books.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Book Successfully',
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrive Books Successfully',
    data: result,
  });
});
const getBookById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getBookById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Book Retrive Successfully',
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Book Updated Successfully',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Book Deleted Successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
};

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UsersService } from './users.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created SuccsessFully',
    data: result,
  });
});

export const UserController = {
  insertIntoDB,
};

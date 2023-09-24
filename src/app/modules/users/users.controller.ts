import { Users } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './users.constant';
import { UsersService } from './users.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UsersService.getAllUsers(filters, paginationOptions);

  sendResponse<Partial<Users>[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully !',
    data: result,
  });
});
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.getUserById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Retrive by Id SuccsessFully',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UsersService.updateUser(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated by Id SuccsessFully',
    data: result,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.deleteUserById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted by Id SuccsessFully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};

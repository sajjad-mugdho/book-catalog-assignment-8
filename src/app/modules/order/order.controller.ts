/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IUser } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  console.log('body:', req.body);
  const user = (req as any).user;
  const result = await OrderService.createOrder(req.body, user);

  console.log('controller:', req.user, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Fetched Successufully',
    data: result,
  });
});
const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = (req as any).user;
  console.log('USER', user);
  console.log(req.cookies);

  const result = await OrderService.getAllOrder(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully !',
    data: result,
  });
});
const getOrderByOrderId = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = (req as any).user;
  const orderId = req.params.orderId;
  const result = await OrderService.getOrderByOrderId(user, orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !',
    data: result,
  });
});

export const OrderController = {
  getAllOrder,
  createOrder,
  getOrderByOrderId,
};

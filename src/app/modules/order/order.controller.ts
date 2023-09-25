/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
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
  const result = await OrderService.getAllOrder();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders Retrives succsefully',
    data: result,
  });
});
const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrderById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Retrives succsefully',
    data: result,
  });
});

export const OrderController = {
  getAllOrder,
  createOrder,
  getOrderById,
};

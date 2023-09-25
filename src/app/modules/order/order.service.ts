/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../../../interfaces/common';
import { prisma } from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { IOrderCreateData, IOrderedBook } from './order.interface';

const createOrder = async (
  payload: IOrderCreateData,
  user: IUser
): Promise<any> => {
  const { userId, role } = user;

  const { orderedBooks } = payload;

  if (user) {
    console.log('From order', user);
  }

  if (role != 'customer') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Invalid Role. Only Customer can place an order.'
    );
  }

  const newOrder = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.order.create({
      data: {
        userId,
      },
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order');
    }

    if (orderedBooks && orderedBooks.length > 0) {
      await asyncForEach(
        orderedBooks,
        async (OrderedBookItem: IOrderedBook) => {
          const createOrderResult = await transactionClient.orderedBook.create({
            data: {
              userId: user.userId,
              orderId: result.id,
              bookId: OrderedBookItem.bookId,
              quantity: OrderedBookItem.quantity,
            },
          });
          console.log('createPrerequisite', createOrderResult);
        }
      );
    }

    return result;
  });

  if (newOrder) {
    const responseData = await prisma.order.findUniqueOrThrow({
      where: {
        id: newOrder.id,
      },
      include: {
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order');
};

const getAllOrder = async (user: IUser): Promise<any[]> => {
  const { userId, role } = user;
  console.log('service user', user);

  if (role == 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    });
    return result;
  } else {
    const result = await prisma.order.findMany({
      include: {
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    });
    return result;
  }
};
const getOrderById = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return result;
};
const getOrderForCustomer = () => {
  console.log('test');
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getOrderById,
  getOrderForCustomer,
};

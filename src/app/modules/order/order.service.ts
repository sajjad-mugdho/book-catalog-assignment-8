import { Order } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createOrder = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });

  return result;
};

const getAllOrder = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({});

  return result;
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

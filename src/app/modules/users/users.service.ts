import { Users } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const getAllUsers = async () => {
  const result = await prisma.users.findMany({});

  return result;
};

const getUserById = async (id: string) => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  return result;
};
const updateUser = async (id: string, paylod: Partial<Users>) => {
  const result = await prisma.users.update({
    where: {
      id,
    },
    data: paylod,
  });

  return result;
};

const deleteUserById = async (id: string) => {
  const result = await prisma.users.delete({
    where: {
      id,
    },
  });

  return result;
};

export const UsersService = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};

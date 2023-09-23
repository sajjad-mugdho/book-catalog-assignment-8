import { Users } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (data: Users): Promise<Users> => {
  const result = await prisma.users.create({
    data,
  });

  return result;
};

export const UsersService = {
  insertIntoDB,
};

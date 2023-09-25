import { Users } from '@prisma/client';
import { IUser } from '../../../interfaces/common';
import { prisma } from '../../../shared/prisma';

const getProfile = async (user: IUser): Promise<Users | null> => {
  const { userId } = user;
  const result = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  return result;
};

export const ProfileService = {
  getProfile,
};

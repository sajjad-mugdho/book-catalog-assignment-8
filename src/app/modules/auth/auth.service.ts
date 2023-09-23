import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (data: Users): Promise<Users> => {
  const { password, name, email, address, contactNo, roll, profileImg } = data;
  const hashPassword = await bcrypt.hash(password, 12);

  const result = await prisma.users.create({
    data: {
      name,
      email,
      address,
      contactNo,
      roll,
      profileImg,
      password: hashPassword,
    },
  });

  return result;
};

export const AuthService = {
  insertIntoDB,
};

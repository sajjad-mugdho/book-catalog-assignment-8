import { Prisma, Users } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { userSearchableFields, userSelect } from './users.constant';
import { IUserFilters } from './users.interface';

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<Partial<Users>[]> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { size, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $OR for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          equals: value,
        },
      })),
    });
  }

  const whereConditions: Prisma.UsersWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.users.findMany({
    where: whereConditions,
    select: userSelect,
    skip,
    take: size,
  });

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

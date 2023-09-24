import { Books, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  bookConditionalFileds,
  bookConditionalFiledsMapper,
  bookRelationalFileds,
  bookSearchableFields,
} from './books.constant';
import { IBookFilterableFields } from './books.interface';

const createBook = async (data: Books): Promise<Books> => {
  const result = await prisma.books.create({
    data,
  });

  return result;
};

const getAllBooks = async (
  filters: IBookFilterableFields,
  options: IPaginationOptions
): Promise<IGenericResponse<Books[]>> => {
  const { size, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { search, ...filtersData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([key, value]) => {
        if (bookRelationalFileds.includes(key)) {
          return {
            [key]: {
              id: value,
            },
          };
        } else if (bookConditionalFileds.includes(key)) {
          const amount = Number(value);
          return {
            price: {
              [bookConditionalFiledsMapper[key]]: amount,
            },
          };
        } else {
          return {
            [key]: {
              equals: value,
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BooksWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  // console.log("WHERE CONDITION", whereConditions);

  const allBook = await prisma.books.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.books.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: allBook,
  };
};
const getBooksByCategory = async (
  categoryId: string
): Promise<IGenericResponse<Books[]>> => {
  const { size, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination({});

  const allBook = await prisma.books.findMany({
    include: {
      category: true,
    },
    where: {
      categoryId,
    },
    skip,
    take: size,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.books.count({
    where: {
      categoryId,
    },
  });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: allBook,
  };
};
const getBookById = async (id: string): Promise<Books | null> => {
  const result = await prisma.books.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Books>
): Promise<Books | null> => {
  const result = await prisma.books.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteBook = async (id: string): Promise<Books | null> => {
  const result = await prisma.books.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByCategory,
};

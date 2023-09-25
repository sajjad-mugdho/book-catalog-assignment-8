"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = require("../../../shared/prisma");
const utils_1 = require("../../../shared/utils");
const createOrder = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    const { orderedBooks } = payload;
    if (user) {
        console.log('From order', user);
    }
    if (role != 'customer') {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Role. Only Customer can place an order.');
    }
    const newOrder = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.order.create({
            data: {
                userId,
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create order');
        }
        if (orderedBooks && orderedBooks.length > 0) {
            yield (0, utils_1.asyncForEach)(orderedBooks, (OrderedBookItem) => __awaiter(void 0, void 0, void 0, function* () {
                const createOrderResult = yield transactionClient.orderedBook.create({
                    data: {
                        userId: user.userId,
                        orderId: result.id,
                        bookId: OrderedBookItem.bookId,
                        quantity: OrderedBookItem.quantity,
                    },
                });
                console.log('createPrerequisite', createOrderResult);
            }));
        }
        return result;
    }));
    if (newOrder) {
        const responseData = yield prisma_1.prisma.order.findUniqueOrThrow({
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
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create order');
});
const getAllOrder = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    console.log('service user', user);
    if (role == 'customer') {
        const result = yield prisma_1.prisma.order.findMany({
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
    }
    else {
        const result = yield prisma_1.prisma.order.findMany({
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
});
const getOrderByOrderId = (user, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    if (role == 'customer') {
        const result = yield prisma_1.prisma.order.findUnique({
            where: {
                id: orderId,
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
        if ((result === null || result === void 0 ? void 0 : result.userId) != userId) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You Do not have any order with this order id');
        }
        return result;
    }
    else if (role == 'admin') {
        const result = yield prisma_1.prisma.order.findUniqueOrThrow({
            where: {
                id: orderId,
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
    }
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getOrderByOrderId,
};

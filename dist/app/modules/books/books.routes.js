"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const books_controller_1 = require("./books.controller");
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_controller_1.BookController.createBook);
router.get('/:categoryId/category', books_controller_1.BookController.getBooksByCategory);
router.get('/', books_controller_1.BookController.getAllBooks);
router.get('/:id', books_controller_1.BookController.getBookById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_controller_1.BookController.updateBook);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_controller_1.BookController.deleteBook);
// /api/v1/books/:categoryId/category
exports.BookRoutes = router;

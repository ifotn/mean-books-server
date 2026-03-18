"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm imports
const express_1 = __importDefault(require("express"));
// our own mvc file imports
const booksController_1 = require("../controllers/booksController");
// auth middleware to protect POST/PUT/DELETE
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// map all `/books` url's to the corresponding controller function.  : represents url param
router.get('/', booksController_1.getBooks);
router.post('/', auth_1.verifyToken, booksController_1.createBook);
router.put('/:id', auth_1.verifyToken, booksController_1.updateBook);
router.delete('/:id', auth_1.verifyToken, booksController_1.deleteBook);
router.post('/:id/authors', auth_1.verifyToken, booksController_1.createAuthor);
// make router public
exports.default = router;

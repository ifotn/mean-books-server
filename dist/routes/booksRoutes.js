"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm imports
const express_1 = __importDefault(require("express"));
// our own mvc file imports
const booksController_1 = require("../controllers/booksController");
const router = express_1.default.Router();
// map all `/books` url's to the corresponding controller function.  : represents url param
router.get('/', booksController_1.getBooks);
router.post('/', booksController_1.createBook);
router.put('/:id', booksController_1.updateBook);
router.delete('/:id', booksController_1.deleteBook);
// make router public
exports.default = router;

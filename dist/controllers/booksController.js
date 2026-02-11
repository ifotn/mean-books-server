"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
// // in-memory Book def => replaced next week with book model
// interface Book {
//     id: number;
//     title: string;
//     year: number;
// }
// // create mock book data in memory
// let books: Book[] = [
//     { id: 1, title: 'The Edible Woman', year: 1969 },
//     { id: 2, title: 'Hell\'s Acre', year: 1984 },
//     { id: 3, title: 'Claw of the Concilliator', year: 1981 }
// ];
/**
* @swagger
* /api/v1/books:
*   get:
*     summary: Retrieve list of books
*     tags:
*       - Book
*   responses:
*     200:
*       description: A list of books
*/
const getBooks = async (req, res) => {
    // use Book Model to query books collection in MongoDB
    const books = await book_1.default.find();
    return res.status(200).json(books);
};
exports.getBooks = getBooks;
/**
* @swagger
* /api/v1/books:
*   post:
*     summary: Add a new book
*     tags:
*       - Book
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*           properties:
*             title:
*               type: string
*               required: true
*             year:
*               type: number
*               required: true
*   responses:
*     201:
*       description: Book created
*     400:
*       description: Bad request
*/
const createBook = async (req, res) => {
    // validate
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request: Incomplete Data' });
    }
    // add new book from request body using model
    try {
        await book_1.default.create(req.body);
        return res.status(201).json(); // 201: Success, Resource Created
    }
    catch (error) {
        return res.status(400).json({ 'error': error });
    }
};
exports.createBook = createBook;
/** @swagger
* /api/v1/books/{id}:
*   put:
*     summary: Update a book
*     tags:
*       - Book
*     parameters:
*       - name: id
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*           properties:
*             title:
*               type: string
*               required: true
*             year:
*               type: number
*               required: true
*   responses:
*     204:
*       description: Book updated
*     400:
*       description: Bad request
*     404:
*       description: Book not found
*/
const updateBook = async (req, res) => {
    // find book based on id param
    const book = await book_1.default.findById(req.params.id);
    // book not found 
    if (!book) {
        return res.status(404).json({ 'error': 'Book Not Found' });
    }
    // update book values from request body
    try {
        await book_1.default.findByIdAndUpdate(req.params.id, req.body);
        return res.status(204).json(); // 204: Accepted, No Content
    }
    catch (error) {
        return res.status(400).json({ 'error': error });
    }
};
exports.updateBook = updateBook;
/** @swagger
* /api/v1/books/{id}:
*   delete:
*     summary: Remove a book
*     tags:
*       - Book
*     parameters:
*       - name: id
*         required: true
*         schema:
*           type: string
*   responses:
*     204:
*       description: Book deleted
*     400:
*       description: Bad request
*     404:
*       description: Book not found
*/
const deleteBook = async (req, res) => {
    // find book based on id param
    const book = await book_1.default.findById(req.params.id);
    // book not found 
    if (!book) {
        return res.status(404).json({ 'error': 'Book Not Found' });
    }
    // update book values from request body
    try {
        await book_1.default.findByIdAndDelete(req.params.id, req.body);
        return res.status(204).json(); // 204: Accepted, No Content
    }
    catch (error) {
        return res.status(400).json({ 'error': error });
    }
};
exports.deleteBook = deleteBook;

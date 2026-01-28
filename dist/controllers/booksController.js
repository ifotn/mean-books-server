"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.getBooks = void 0;
// create mock book data in memory
let books = [
    { id: 1, title: 'The Edible Woman', year: 1969 },
    { id: 2, title: 'Hell\'s Acre', year: 1984 },
    { id: 3, title: 'Claw of the Concilliator', year: 1981 }
];
// GET: retrieve all books
const getBooks = (req, res) => {
    return res.status(200).json(books);
};
exports.getBooks = getBooks;
// POST: save new book from request body
const createBook = (req, res) => {
    // validate
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request: Incomplete Data' });
    }
    // add new book to array from request body
    books.push(req.body);
    return res.status(201).json(); // 201: Success, Resource Created
};
exports.createBook = createBook;

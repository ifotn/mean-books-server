import express, { Request, Response } from 'express';

import Book from '../models/book';

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

// GET: retrieve all books
export const getBooks = async (req: Request, res: Response) => {
    // use Book Model to query books collection in MongoDB
    const books = await Book.find();
    return res.status(200).json(books);
};

// POST: save new book from request body
export const createBook = async (req: Request, res: Response) => {
    // validate
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request: Incomplete Data' });
    }

    // add new book from request body using model
    await Book.create(req.body);
    return res.status(201).json(); // 201: Success, Resource Created
};

// PUT: update book based on id in url param => /api/v1/books/3893
export const updateBook = (req: Request, res: Response) => {
    // find book in array based on id param
    //const index: number = books.findIndex(b => b.id.toString() === req.params.id.toString());

    // book not found in array
    // if (index == -1) {
    //     return res.status(404).json({ 'error': 'Not Found' });
    // }

    // update book values from request body
    //books[index].title = req.body.title;
    //books[index].year = req.body.year;
    //return res.status(204).json(); // 204: Accepted, No Content
};

// DELETE: remove book based on id in url param => /api/v1/books/3893
export const deleteBook = (req: Request, res: Response) => {
    // // find book in array based on id param
    // const index: number = books.findIndex(b => b.id.toString() === req.params.id.toString());

    // // book not found in array
    // if (index == -1) {
    //     return res.status(404).json({ 'error': 'Not Found' });
    // }

    // // remove book from array
    // books.splice(index, 1);
    // return res.status(204).json(); // 204: Accepted, No Content
};
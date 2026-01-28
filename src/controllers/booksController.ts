import express, { Request, Response } from 'express';

// in-memory Book def => replaced next week with book model
interface Book {
    id: number;
    title: string;
    year: number;
}

// create mock book data in memory
let books: Book[] = [
    { id: 1, title: 'The Edible Woman', year: 1969 },
    { id: 2, title: 'Hell\'s Acre', year: 1984 },
    { id: 3, title: 'Claw of the Concilliator', year: 1981 }
];

// GET: retrieve all books
export const getBooks = (req: Request, res: Response) => {
    return res.status(200).json(books);
};

// POST: save new book from request body
export const createBook = (req: Request, res: Response) => {
    // validate
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request: Incomplete Data' });
    }

    // add new book to array from request body
    books.push(req.body);
    return res.status(201).json(); // 201: Success, Resource Created
};
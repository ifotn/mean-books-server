// npm imports
import express, { Router } from 'express';

// our own mvc file imports
import { createBook, deleteBook, getBooks, updateBook, createAuthor } from '../controllers/booksController';

// auth middleware to protect POST/PUT/DELETE
import { verifyToken } from '../middleware/auth';

const router: Router = express.Router();

// map all `/books` url's to the corresponding controller function.  : represents url param
router.get('/', getBooks);
router.post('/', verifyToken, createBook);
router.put('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);
router.post('/:id/authors', verifyToken, createAuthor);

// make router public
export default router;
// npm imports
import express, { Router } from 'express';

// our own mvc file imports
import { createBook, deleteBook, getBooks, updateBook } from '../controllers/booksController';

const router: Router = express.Router();

// map all `/books` url's to the corresponding controller function.  : represents url param
router.get('/', getBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

// make router public
export default router;
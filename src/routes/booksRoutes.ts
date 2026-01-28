// npm imports
import express, { Router } from 'express';

// our own mvc file imports
import { createBook, getBooks } from '../controllers/booksController';

const router: Router = express.Router();

// map all `/books` url's to the corresponding controller function
router.get('/', getBooks);
router.post('/', createBook);

// make router public
export default router;
// npm imports
import express, { Application } from 'express';
import bodyParser from 'body-parser';

// our own mvc file imports
import booksRoutes from './routes/booksRoutes';

// create & start new express app
const app: Application = express();

// app config
app.use(bodyParser.json());

app.listen(4000, () => { console.log('Express API running on port 4000') });

// map url's based on resource names to corresponding routers
app.use('/api/v1/books', booksRoutes);
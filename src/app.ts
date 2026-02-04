// npm imports
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// our own mvc file imports
import booksRoutes from './routes/booksRoutes';

// create & start new express app
const app: Application = express();

// app config
app.use(bodyParser.json());

// db connection
mongoose.connect(process.env.DB, {})
.then((response) => console.log('Connected to MongoDB'))
.catch((error) => console.log(`Connection Error: ${error}`));

app.listen(4000, () => { console.log('Express API running on port 4000') });

// map url's based on resource names to corresponding routers
app.use('/api/v1/books', booksRoutes);
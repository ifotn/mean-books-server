// npm imports
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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

// swagger config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MEAN Books API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js']  // location of yaml comments describing each method
};

// create new swagger doc 
const openApiSpecs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve);

app.get('/api-docs', (req: Request, res: Response) => {
    const html: string = swaggerUi.generateHTML(openApiSpecs);
    res.send(html);
});

app.listen(4000, () => { console.log('Express API running on port 4000') });

// map url's based on resource names to corresponding routers
app.use('/api/v1/books', booksRoutes);
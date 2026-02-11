import mongoose, { Schema } from 'mongoose';

interface Author {
    firstName: string;
    lastName: string;
}

interface Book {
    title: string;
    year: number;
    authors: Author[];
}

const authorSchema = new Schema<Author>({
    firstName: {
        type: String,
        required: [true, 'First Name is Required'],
        trim: true,
        minLength: 1
    },
     lastName: {
        type: String,
        required: [true, 'Last Name is Required'],
        trim: true,
        minLength: 1
    }
});

const bookSchema = new Schema<Book>({
    title: { 
        type: String,
        required: [true, 'Title is Required'],
        trim: true,
        minLength: 3
    },
    year: {
        type: Number,
        required: [true, 'Year is Required'],
        min: 1000
    },
    authors: [authorSchema]
});

// our model inherits from Mongoose so it has all the built-in CRUD methods
const Book = mongoose.model<Book>('Book', bookSchema);

// make public so controllers can use it for CRUD
export default Book;
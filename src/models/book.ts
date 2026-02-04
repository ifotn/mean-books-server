import mongoose, { Schema } from 'mongoose';

interface Book {
    title: string;
    year: number;
}

const bookSchema = new Schema<Book>({
    title: { 
        type: String,
        required: [true, 'Title is Required']
    },
    year: {
        type: Number,
        required: [true, 'Year is Required'],
        min: 1000
    }
});

// our model inherits from Mongoose so it has all the built-in CRUD methods
const Book = mongoose.model<Book>('Book', bookSchema);

// make public so controllers can use it for CRUD
export default Book;
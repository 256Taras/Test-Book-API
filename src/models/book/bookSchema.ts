import mongoose from 'mongoose';

import { IBook } from './shared/book';

export interface IBookSchema extends IBook {
    _id: string;
}

export interface IBookModel extends IBookSchema, mongoose.Document {
    _id: string;
}

export type BookDatabaseModel = mongoose.Model<IBookModel, {}>;

const bookSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }, 
    author: {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName:{
            type: String,
            required: true,
            trim: true
        }
    },
    publishingDate:{
        type: String
    },
    finishedReading:{
        type: Boolean,
        required: true,
        default: false
    }
} as any, {
    timestamps: true
});

const Book: BookDatabaseModel = mongoose.model<IBookModel>('Book', bookSchema);

export default Book;
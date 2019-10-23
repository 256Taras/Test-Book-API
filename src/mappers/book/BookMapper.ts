import { IMapper } from "../shared/mapper";
import { Book } from "../../models/book/Book";
import { IBookSchema } from './../../models/book/bookSchema';

export const BookMapper = (): IMapper<Book, IBookSchema> => ({
    toPersistence: (book: Book): IBookSchema => ({
        _id: book.id,
        title: book.title,
        isbn: book.isbn,
        author: book.author,
        publishingDate: book.publishingDate,
        finishedReading: book.finishedReading
    }),
    toDomain: (raw: IBookSchema): Book => 
        Book.create({
            title: raw.title,
            isbn: raw.isbn,
            author: raw.author,
            publishingDate: raw.publishingDate,
            finishedReading: raw.finishedReading
        }, raw._id)
});
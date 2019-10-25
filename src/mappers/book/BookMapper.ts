import { IDomainPersistenceMapper, IDomainResponseDTOMapper } from "../shared/mapper";
import { Book } from "../../models/book/Book";
import { IBookSchema } from './../../models/book/bookSchema';
import { IBookResponseDTO } from "../../dtos/book";

export const BookDomainPersistenceMapper = (): IDomainPersistenceMapper<Book, IBookSchema> => ({
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

export const BookDomainResponseDTOMapper = (): IDomainResponseDTOMapper<Book, IBookResponseDTO> => ({
    toResponseDTO: (book: Book): IBookResponseDTO => ({
        book: {
            id: book.id,
            title: book.title,
            isbn: book.isbn,
            author: book.author,
            publishingDate: book.publishingDate,
            finishedReading: book.finishedReading
        }
    })
})
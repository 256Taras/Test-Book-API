import { IDomainPersistenceMapper, IDomainDTOMapper } from "../shared/mapper";
import { Book, Title, ISBN, PersonName, Author } from "../../models/book/Book";
import { IBookSchema } from './../../models/book/bookSchema';
import { IBookResponseDTO } from "../../dtos/book";
import { Result, ResultType } from './../../utils/Result';
import { IBook } from './../../models/book/shared/book';
import { IBookRequestDTO } from './../../dtos/book';

const attemptToCreateBook = (candidate: IBook, id?: string): Result<Book> => {
    const bookTitleOrFailure = Title.create(candidate.title);
    const isbnOrFailure = ISBN.create(candidate.isbn);
    const personNameOrFailure = PersonName.create(candidate.author.firstName, candidate.author.lastName);
    
    const partialDomainResult = Result.combine([
        bookTitleOrFailure,
        isbnOrFailure,
        personNameOrFailure
    ]);

    if (partialDomainResult.isFailure) {
        return Result.fail<Book>(ResultType.Invalid, partialDomainResult.error);
    }

    const authorOrFailure = Author.create({
        name: personNameOrFailure.value
    });

    if (authorOrFailure.isFailure) {
        return Result.fail<Book>(ResultType.Invalid, authorOrFailure.error!)
    }

    const bookOrFailure = Book.create({
        title: bookTitleOrFailure.value,
        isbn: isbnOrFailure.value,
        author: authorOrFailure.value,
        publishingDate: new Date(candidate.publishingDate),
        finishedReading: candidate.finishedReading
    }, id);

    if (bookOrFailure.isFailure) {
        return Result.fail<Book>(ResultType.Invalid, bookOrFailure.error!)
    }

    return Result.pass<Book>(bookOrFailure.value);
}

export const BookDomainPersistenceMapper = (): IDomainPersistenceMapper<Book, IBookSchema> => ({
    toPersistence: (book: Book): IBookSchema => ({
        _id: book.id,
        title: book.title.value,
        isbn: book.isbn.value,
        author: book.author.value.name.value,
        publishingDate: book.publishingDate.toString(),
        finishedReading: book.finishedReading
    }),
    toDomain: (raw: IBookSchema): Result<Book> => {
        return attemptToCreateBook(raw, raw._id);
    }
});

export const BookDomainDTOMapper = (): IDomainDTOMapper<Book, IBookRequestDTO, IBookResponseDTO> => ({
    toResponseDTO: (book: Book): IBookResponseDTO => ({
        book: {
            id: book.id,
            title: book.title.value,
            isbn: book.isbn.value,
            author: book.author.value.name.value,
            publishingDate: book.publishingDate.toString(),
            finishedReading: book.finishedReading
        }
    }),
    toDomain(requestDTO: IBookRequestDTO): Result<Book> {
        return attemptToCreateBook(requestDTO.book);
    }
})
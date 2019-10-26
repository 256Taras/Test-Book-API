import { IRepository } from "./shared/repository";
import { Book } from "../models/book/Book";
import { IBookSchema, BookDatabaseModel } from './../models/book/bookSchema';
import { IDomainPersistenceMapper } from "../mappers/shared/mapper";
import { Result, ResultType } from "../utils/Result";

// Notice interface methods follow CQS.
export interface IBookRepository extends IRepository {
    insertBook(book: Book): Promise<Result<void>>;
    getAllBooks(): Promise<Result<Book[]>>;
    getBookById(id: string): Promise<Result<Book>>;
    updateBookById(id: string): Promise<void>;
    deleteBookById(id: string): Promise<void>;
}

export class BookRepository implements IBookRepository {
    private books: Array<IBookSchema>;
    private readonly bookMapper: IDomainPersistenceMapper<Book, IBookSchema>

    constructor(
        private readonly BookModel: BookDatabaseModel,
        bookDomainPersistenceMapper: IDomainPersistenceMapper<Book, IBookSchema>
    ) {
        // Operate on an in-memory collection for now.
        this.books = [];
        this.bookMapper = bookDomainPersistenceMapper;
    }

    async insertBook(book: Book): Promise<Result<void>> {
        const rawBook = this.bookMapper.toPersistence(book);

        try {
            this.books.push(rawBook);
            // const newBook = new this.BookModel(rawBook);
            // await newBook.save();
            return Result.pass<void>();
        } catch (e) {
            return Result.fail<void>(ResultType.Unexpected, 'An unexpected error occurred.');
        }
    }

    async getAllBooks(): Promise<Result<Book[]>> {
        const domainEntities: Book[] = [];

        try {
            //const persistenceBooks = await this.BookModel.find({});
            const persistenceBooks = this.books;

            for (const rawBook of persistenceBooks) {
                const bookEntityOrFailure = this.bookMapper.toDomain(rawBook);

                if (bookEntityOrFailure.isFailure) {
                    Result.fail<Book[]>(ResultType.Unexpected, 'An unexpected error occurred');
                }
                
                domainEntities.push(bookEntityOrFailure.value);
            }

            return Result.pass<Book[]>(domainEntities);
        } catch (e) {
            return Result.fail<Book[]>(ResultType.Unexpected, 'An unexpected error occurred');
        }
    }

    async getBookById(id: string): Promise<Result<Book>> {
        try {
            const persistenceBook = this.books.filter(book => id === book._id);

            if (!persistenceBook[0]) 
                Result.fail<Book>(ResultType.NotFound, `The Book with id ${id} could not be found`);

            const domainBookOrFailure = this.bookMapper.toDomain(persistenceBook[0]);

            if (domainBookOrFailure.isFailure)
                Result.fail<Book>(ResultType.Unexpected, 'An unexpected error occurred');

            return Result.pass<Book>(domainBookOrFailure.value);
        } catch (e) {
            return Result.fail<Book>(ResultType.Unexpected, 'An unexpected error occurred');
        }
    }

    async updateBookById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async deleteBookById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async exists(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
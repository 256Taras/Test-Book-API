import { IRepository } from "./shared/repository";
import { Book } from "../models/book/Book";
import { IBookSchema, BookDatabaseModel, IBookModel } from './../models/book/bookSchema';
import { IDomainPersistenceMapper } from "../mappers/shared/mapper";
import { Result, ResultType } from "../utils/Result";

// Notice interface methods follow CQS.
export interface IBookRepository extends IRepository {
    insertBook(book: Book): Promise<Result<void>>;
    getAllBooks(): Promise<Result<Book[]>>;
    getBookById(id: string): Promise<Result<Book>>;
    updateBookById(id: string, updates: any): Promise<Result<void>>;
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
            const newBook = new this.BookModel(rawBook);
            await newBook.save();
            return Result.pass<void>();
        } catch (e) {
            return Result.fail<void>(ResultType.Unexpected, 'An unexpected error occurred.');
        }
    }

    async getAllBooks(): Promise<Result<Book[]>> {
        const domainEntities: Book[] = [];

        try {
            const persistenceBooks = await this.BookModel.find({});

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
            const persistenceBook = await this.BookModel.findById(id);

            if (!persistenceBook) 
                return Result.fail<Book>(ResultType.NotFound, `The Book with id ${id} could not be found`);

            const domainBookOrFailure = this.bookMapper.toDomain(persistenceBook);

            if (domainBookOrFailure.isFailure)
                Result.fail<Book>(ResultType.Unexpected, 'An unexpected error occurred');

            return Result.pass<Book>(domainBookOrFailure.value);
        } catch (e) {
            return Result.fail<Book>(ResultType.Unexpected, 'An unexpected error occurred');
        }
    }

    async updateBookById(id: string, updates: any): Promise<Result<void>> {
        try {
            // Keep the original so we can rollback if validation on domain model fails.
            const originalPersistenceBook = await this.BookModel.findById(id);

            if (!originalPersistenceBook) 
                return Result.fail<void>(ResultType.NotFound, `Resource with ${id} not found.`)
            
            const updatedPersistenceBook = await this.BookModel.findByIdAndUpdate(id, updates, { new: true }) as IBookModel;

            const updatedBookEntityOrFailure = this.bookMapper.toDomain(updatedPersistenceBook);

            if (updatedBookEntityOrFailure.isFailure) {
                // Rollback operations.
                await this.BookModel.findByIdAndUpdate(id, originalPersistenceBook);
                return Result.fail<void>(updatedBookEntityOrFailure.resultType, updatedBookEntityOrFailure.error);
            }

            return Result.pass<void>();
        } catch (e) {
            return Result.fail<void>(ResultType.Unexpected, 'An unexpected error occurred.');
        }
    }

    async deleteBookById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async exists(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
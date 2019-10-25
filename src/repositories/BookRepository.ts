import { IRepository } from "./shared/repository";
import { Book } from "../models/book/Book";
import { IBookSchema, BookDatabaseModel } from './../models/book/bookSchema';
import { IDomainPersistenceMapper } from "../mappers/shared/mapper";

// Notice interface methods follow CQS.
export interface IBookRepository extends IRepository {
    createBook(book: Book): Promise<void>;
    getAllBooks(): Promise<Book[]>;
    getBookById(id: string): Promise<Book>;
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

    async createBook(book: Book): Promise<void> {
        const rawBook = this.bookMapper.toPersistence(book);
        this.books.push(rawBook);
    }

    async getAllBooks(): Promise<Book[]> {
        return this.books.map(book => this.bookMapper.toDomain(book));
    }

    async getBookById(id: string): Promise<Book> {
        throw new Error("Method not implemented.");
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
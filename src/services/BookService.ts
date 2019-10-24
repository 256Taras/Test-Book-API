import { IBookRequestDTO, IBookResponseDTO } from "../dtos/book";
import { Book } from "../models/book/Book";
import { IMapper } from "../mappers/shared/mapper";
import { IBookSchema } from "../models/book/bookSchema";
import { IBookRepository } from "../repositories/BookRepository";

// Notice: Interface complies with CQS.
export interface IBookService {
    createBook(bookDTO: IBookRequestDTO): Promise<void>;
    getAllBooks(): Promise<IBookResponseDTO[]>;
    getBookById(id: string): Promise<Book>;
    deleteBookById(id: string): Promise<void>;
}

export class BookService implements IBookService {
    constructor(
        private readonly bookRepository: IBookRepository,
        private readonly bookMapper: IMapper<Book, IBookSchema, IBookResponseDTO>
    ) {}

    async createBook(bookDTO: IBookRequestDTO): Promise<void> {
        const book = Book.create(bookDTO.book);
        await this.bookRepository.createBook(book);
    }    
    
    async getAllBooks(): Promise<IBookResponseDTO[]> {
        const books = await this.bookRepository.getAllBooks();
        return books.map(book => this.bookMapper.toResponseDTO(book));
    }

    async getBookById(id: string): Promise<Book> {
        throw new Error("Method not implemented.");
    }

    async deleteBookById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
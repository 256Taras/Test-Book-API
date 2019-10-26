import { IBookRequestDTO, IBookResponseDTO, IBookDTO } from "../dtos/book";
import { Book } from "../models/book/Book";
import { IDomainDTOMapper } from "../mappers/shared/mapper";
import { IBookRepository } from "../repositories/BookRepository";
import { Result, ResultType } from "../utils/Result";

// Notice: Interface complies with CQS.
export interface IBookService {
    createBook(bookDTO: IBookRequestDTO): Promise<Result<void>>;
    getAllBooks(): Promise<Result<IBookResponseDTO[]>>;
    getBookById(id: string): Promise<Result<Book>>;
    updateBookById(id: string, updates: Partial<IBookDTO>): Promise<Result<void>>;
    deleteBookById(id: string): Promise<Result<void>>;
}

export class BookService implements IBookService {
    private readonly bookMapper: IDomainDTOMapper<Book, IBookRequestDTO, IBookResponseDTO>;

    constructor(
        private readonly bookRepository: IBookRepository,
        bookDomainDTOMapper: IDomainDTOMapper<Book, IBookRequestDTO, IBookResponseDTO>
    ) {
        this.bookMapper = bookDomainDTOMapper;
    }

    async createBook(bookDTO: IBookRequestDTO): Promise<Result<void>> {
        const bookOrFailure = this.bookMapper.toDomain(bookDTO);

        if (bookOrFailure.isFailure) 
            return Result.fail<void>(bookOrFailure.resultType, bookOrFailure.error);

        return this.bookRepository.insertBook(bookOrFailure.value);
    }    
    
    async getAllBooks(): Promise<Result<IBookResponseDTO[]>> {
        const booksOrFailure = await this.bookRepository.getAllBooks();

        if (booksOrFailure.isFailure) 
            return Result.fail<IBookResponseDTO[]>(booksOrFailure.resultType, booksOrFailure.error);

        const books = booksOrFailure.value;
        const bookDTOs = books.map(book => this.bookMapper.toResponseDTO(book));

        return Result.pass<IBookResponseDTO[]>(bookDTOs);
    }

    async getBookById(id: string): Promise<Result<Book>> {
        throw new Error("Method not implemented.");
    }

    async updateBookById(id: string, updates: Partial<IBookDTO>): Promise<Result<void>> {
        return this.bookRepository.updateBookById(id, updates);
    }

    async deleteBookById(id: string): Promise<Result<void>> {
        throw new Error("Method not implemented.");
    }
}
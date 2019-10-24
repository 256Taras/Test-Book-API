import { Request, Response } from 'express';
import { route, GET, POST, PATCH, DELETE, before } from 'awilix-router-core';
import { IBookService } from '../services/BookService';
import { IBookRequestDTO } from '../dtos/book';

export class BookController {
    constructor(private readonly bookService: IBookService) {}

    @GET()
    async getAll(req: Request, res: Response) {
        return res.send({ books: await this.bookService.getAllBooks() });
    }

    @route('/:id')
    @GET()
    async getById(req: Request, res: Response) {
        return res.send('Action Not Implemented');
    }

    @POST()
    async create(req: Request, res: Response) {
        const bookDTO = req.body as IBookRequestDTO;
        await this.bookService.createBook(bookDTO);
        return res.json(bookDTO)
    }

    @route('/:id')
    @DELETE()
    delete(req: Request, res: Response) {
        return res.send('Action Not Implemented');
    }

    @route('/:id')
    @PATCH()
    update(req: Request, res: Response) {
        return res.send('Action Not Implemented');
    }
}

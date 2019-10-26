import { 
    AwilixContainer, 
    createContainer, 
    asClass, 
    asFunction, 
    asValue, 
    Lifetime, 
    InjectionMode
} from 'awilix';

import { BookService } from "./../services/BookService";
import { BookRepository } from './../repositories/BookRepository';
import { BookDomainPersistenceMapper, BookDomainDTOMapper } from './../mappers/book/BookMapper';

import Book from './../models/book/bookSchema';
import { HttpHandler } from '../controllers/shared/HttpHandler';

export const containerFactory = (): AwilixContainer =>
    createContainer({ injectionMode: InjectionMode.CLASSIC })
        .register({
            bookService: asClass(BookService, { lifetime: Lifetime.SINGLETON }),
            bookRepository: asClass(BookRepository, { lifetime: Lifetime.SINGLETON }),
            bookDomainPersistenceMapper: asFunction(BookDomainPersistenceMapper, { lifetime: Lifetime.SINGLETON }),
            bookDomainDTOMapper: asFunction(BookDomainDTOMapper, { lifetime: Lifetime.SINGLETON }),
            BookModel: asValue(Book),
            httpHandler: asClass(HttpHandler, { lifetime: Lifetime.SCOPED })
        });

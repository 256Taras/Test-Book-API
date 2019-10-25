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
import { BookDomainPersistenceMapper, BookDomainResponseDTOMapper } from './../mappers/book/BookMapper';

import Book from './../models/book/bookSchema';

export const containerFactory = (): AwilixContainer =>
    createContainer({ injectionMode: InjectionMode.CLASSIC })
        .register({
            bookService: asClass(BookService, { lifetime: Lifetime.SINGLETON }),
            bookRepository: asClass(BookRepository, { lifetime: Lifetime.SINGLETON }),
            bookDomainPersistenceMapper: asFunction(BookDomainPersistenceMapper, { lifetime: Lifetime.SINGLETON }),
            bookDomainResponseDTOMapper: asFunction(BookDomainResponseDTOMapper, { lifetime: Lifetime.SINGLETON }),
            BookModel: asValue(Book)
        });

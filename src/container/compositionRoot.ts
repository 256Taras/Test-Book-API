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
import { BookMapper } from './../mappers/book/BookMapper';

import Book from './../models/book/bookSchema';

export const containerFactory = (): AwilixContainer =>
    createContainer({ injectionMode: InjectionMode.CLASSIC })
        .register({
            bookService: asClass(BookService, { lifetime: Lifetime.SINGLETON }),
            bookRepository: asClass(BookRepository, { lifetime: Lifetime.SINGLETON }),
            bookMapper: asFunction(BookMapper, { lifetime: Lifetime.SINGLETON }),
            BookModel: asValue(Book)
        });

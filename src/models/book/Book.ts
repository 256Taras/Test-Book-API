import uuid from 'uuid';
import validator from 'validator';

import { Guard } from "../../utils/Guard";
import { Result, ResultType } from '../../utils/Result';

export interface IBookProps {
    title: Title;
    isbn: ISBN;
    author: Author;
    publishingDate: Date;
    finishedReading?: boolean;
}

export class Title {
    private readonly title: string;

    private constructor(title: string) {
        this.title = title;
    }

    public static create(title: string): Result<Title> {
        const guardResult = Guard.isNotNullOrUndefined(title, 'title');

        if (!guardResult.isSuccess) return Result.fail<Title>(ResultType.Invalid, `Required property [${guardResult.failedOn}] was not provided.`)


        if (!this.meetsLengthRequirements(title)) {
            return Result.fail<Title>(ResultType.Invalid, 'The provided title does not meet required length criteria.');
        }

        return Result.pass<Title>(new Title(title));
    }   
    
    private static meetsLengthRequirements(candidate: string): boolean {
        return candidate.length >= 2 && candidate.length <= 200;
    }

    get value() {
        return this.title;
    }
}

// Book ISBN
export class ISBN {
    private readonly isbn: string;

    private constructor(isbn: string) {
        this.isbn = isbn;
    }

    public static create(isbn: string): Result<ISBN> {
        const guardResult = Guard.isNotNullOrUndefined(isbn, 'isbm');

        if (!guardResult.isSuccess) return Result.fail<ISBN>(ResultType.Invalid, `Required property [${guardResult.failedOn}] was not provided.`)

        if (!this.isValidISBN(isbn)) {
            return Result.fail<ISBN>(ResultType.Invalid, 'The provided ISBN is not a valid ISBN-10 or ISBN-13.');
        }

        return Result.pass<ISBN>(new ISBN(isbn));
    }

    private static isValidISBN(candidate: string): boolean {
        return validator.isISBN(candidate);
    }

    public get value() {
        return this.isbn;
    }
}

// A Person's first name or last name.
export class PersonName {
    private readonly firstName: string;
    private readonly lastName: string;

    private constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public static create(firstName: string, lastName: string): Result<PersonName> {
        const guardResult = Guard.noneAreNullOrUndefined([
            { argument: firstName, argumentName: 'personName.firstName' },
            { argument: lastName, argumentName: 'personName.lastName' }
        ]);

        if (!guardResult.isSuccess) {
            return Result.fail<PersonName>(ResultType.Invalid, `Required property [${guardResult.failedOn}] was not provided.`)
        }

        if (!this.meetsLengthRequirements(firstName) || !this.meetsLengthRequirements(lastName)) {
            return Result.fail<PersonName>(ResultType.Invalid, 'The provided name does not meet required length criteria.');
        }

        return Result.pass<PersonName>(new PersonName(firstName, lastName));
    }

    private static meetsLengthRequirements(candidate: string): boolean {
        return candidate.length >= 2 && candidate.length <= 50;
    }

    get value() {
        return {
            firstName: this.firstName,
            lastName: this.lastName
        }
    }
}

// Book Author
interface IAuthorProps {
    name: PersonName
}

export class Author {
    private readonly props: IAuthorProps;

    private constructor(props: IAuthorProps) {
        this.props = props;
    }

    public static create(props: IAuthorProps): Result<Author> {
        const guardResult = Guard.isNotNullOrUndefined(props.name, 'author.name');

        if (!guardResult.isSuccess) {
            return Result.fail<Author>(ResultType.Invalid, `Required property [${guardResult.failedOn}] was not provided`);
        }

        return Result.pass<Author>(new Author(props));
    }

    get value() {
        return this.props;
    }
}

export class Book {
    private readonly _id: string;
    private readonly props: IBookProps;

    private constructor(props: IBookProps, id?: string) {
        this._id = id ? id : uuid.v4();
        this.props = props;
    }

    public static create(props: IBookProps, id?: string): Result<Book> {
        const guardResult = Guard.noneAreNullOrUndefined([
            { argument: props.title, argumentName: 'book.title' },
            { argument: props.isbn, argumentName: 'book.isbn' },
            { argument: props.author.value.name.value.firstName, argumentName: 'book.author.firstName' },
            { argument: props.author.value.name.value.lastName, argumentName: 'book.author.lastName' },
            { argument: props.publishingDate, argumentName: 'book.publishingDate' }
        ]);

        if (!guardResult.isSuccess) {
            return Result.fail<Book>(ResultType.Invalid, `Required property [${guardResult.failedOn}] was not provided.`);
        }

        // Default to false if not defined.
        props.finishedReading = props.finishedReading ? props.finishedReading : false;

        return Result.pass<Book>(new Book(props, id));
    }

    get id() {
        return this._id;
    }

    get title() {
        return this.props.title;
    }

    get isbn() {
        return this.props.isbn;
    }

    get author() {
        return this.props.author;
    }

    get publishingDate() {
        return this.props.publishingDate;
    }

    get finishedReading() {
        return this.props.finishedReading;
    }
}






/*
export class Book {
    private readonly _id: string;
    private readonly props: IBookProps;

    private constructor(props: IBookProps, id?: string) {
        this._id = id ? id : uuid.v4(); // <- Should probably be a ValueObject
        this.props = props;
    }

    public static create(props: IBookProps, id?: string): Book {
        const guardResult = Guard.isNotNullOrUndefined(props.finishedReading);

        if (!guardResult.isSuccess) props.finishedReading = false;

        return new Book(props, id);
    }

    get id() {
        return this._id;
    }

    get title() {
        return this.props.title;
    }

    get isbn() {
        return this.props.isbn;
    }

    get author() {
        return this.props.author;
    }

    get publishingDate() {
        return this.props.publishingDate;
    }

    get finishedReading() {
        return this.props.finishedReading;
    }
}
*/
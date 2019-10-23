import uuid from 'uuid';

import { IBook } from "./shared/book";
import { Guard } from "../../utils/Guard";

// Just in case we need anything extra for the domain.
export interface IBookProps extends IBook {  }

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
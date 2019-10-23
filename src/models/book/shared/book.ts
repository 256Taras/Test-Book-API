export interface IBook {
    title: string;
    isbn: string;
    author: {
        firstName: string;
        lastName: string;
    };
    publishingDate: string;
    finishedReading?: boolean;
}
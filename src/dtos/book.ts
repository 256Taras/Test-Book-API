export namespace RequestDTOs {

}

export namespace ResponseDTOs {

}

export interface IBookDTO {
    title: string;
    isbn: string;
    author: {
        firstName: string;
        lastName: string;
    }
    publishingDate: string;
    finishedReading?: boolean;
}

export interface IBookRequestDTO {
    book: IBookDTO
}

export interface IBookResponseDTO {
    book: IBookRequestDTO['book'] & {
        id: string;
    }
}

export interface IBookArrayResponseDTO {
    books: IBookRequestDTO[];
};

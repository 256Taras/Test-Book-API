export interface IBookRequestDTO {
    book: {
        title: string;
        isbn: string;
        author: {
            firstName: string;
            lastName: string;
        }
        publishingDate: string;
        finishedReading?: boolean;
    }
}

export interface IBookResponseDTO {
    book: IBookRequestDTO['book'] & {
        id: string;
    }
}

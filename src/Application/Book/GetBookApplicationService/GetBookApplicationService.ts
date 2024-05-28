import { BookId } from "Domain/models/Book/BookId/BookId";
import { IBookRepository } from "Domain/models/Book/IBookRepository";
import { BookDto } from "../BookDto";

export class GetBookApplicationService {
  constructor(private bookRepository: IBookRepository) {}

  async execute(isbn: string): Promise<BookDto | null> {
    const book = await this.bookRepository.find(new BookId(isbn));

    if (!book) return null;
    return new BookDto(book);
  }
}

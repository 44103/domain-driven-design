import { ISBNDuplicationCheckDomainService } from "Domain/services/Book/IsbnDuplicationCheckDomainService/IsbnDuplicationCheckDomainService";
import { InMemoryBookRepository } from "./InMemoryBookRepository";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { Title } from "Domain/models/Book/Title/Title";
import { Price } from "Domain/models/Book/Price/Price";
import { Book } from "Domain/models/Book/Book";

describe("IsbnDuplicationCheckDomainService", () => {
  let isbnDuplicationCheckDomainService: ISBNDuplicationCheckDomainService;
  let inMemoryBookRepository: InMemoryBookRepository;

  beforeEach(() => {
    // テスト前に初期化する
    inMemoryBookRepository = new InMemoryBookRepository();
    isbnDuplicationCheckDomainService = new ISBNDuplicationCheckDomainService(
      inMemoryBookRepository
    );
  });

  it("重複がない場合、 false を返す", async () => {
    const isbn = new BookId("9784167158057");
    const result = await isbnDuplicationCheckDomainService.execute(isbn);

    expect(result).toBeFalsy();
  });

  it("重複がある場合、 true を返す", async () => {
    const isbn = new BookId("9784167158057");
    const title = new Title("吾輩は猫である");
    const price = new Price({ amount: 770, currency: "JPY" });
    const book = Book.create(isbn, title, price);

    await inMemoryBookRepository.save(book);
    const result = await isbnDuplicationCheckDomainService.execute(isbn);

    expect(result).toBeTruthy();
  });

  it("異なる ISBN で重複がない場合、 false を返す", async () => {
    const existingIsbn = new BookId("9784167158057");
    const newIsbn = new BookId("9784167158064");
    const title = new Title("テスト書籍");
    const price = new Price({ amount: 500, currency: "JPY" });
    const book = Book.create(existingIsbn, title, price);

    await inMemoryBookRepository.save(book);
    const result = await isbnDuplicationCheckDomainService.execute(newIsbn);

    expect(result).toBeFalsy();
  });
});

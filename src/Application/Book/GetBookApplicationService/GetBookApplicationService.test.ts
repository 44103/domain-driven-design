import { InMemoryBookRepository } from "Infrastructure/InMemory/Book/InMemoryBookRepository";
import { GetBookApplicationService } from "./GetBookApplicationService";
import { bookTestDataCreator } from "Infrastructure/shared/Book/bookTestDataCreator";
import { BookDto } from "../BookDto";

describe("GetBookApplicationService", () => {
  it("指定された ID の書籍が存在する場合 DTO に詰め替えられ取得できる", async () => {
    const repository = new InMemoryBookRepository();
    const getBookApplicationService = new GetBookApplicationService(repository);

    // テスト用データ作成
    const createdBook = await bookTestDataCreator(repository)({});

    const data = await getBookApplicationService.execute(
      createdBook.bookId.value
    );

    expect(data).toEqual(new BookDto(createdBook));
  });

  it("指定された ID の書籍が存在しない場合 null が取得できる", async () => {
    const repository = new InMemoryBookRepository();
    const getBookApplicationService = new GetBookApplicationService(repository);

    const data = await getBookApplicationService.execute("9784167158057");

    expect(data).toBeNull();
  });
});

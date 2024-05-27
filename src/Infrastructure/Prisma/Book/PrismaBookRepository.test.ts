import { PrismaClient } from "@prisma/client";
import { PrismaBookRepository } from "./PrismaBookRepository";
import { bookTestDataCreator } from "Infrastructure/shared/Book/bookTestDataCreator";
import { Book } from "Domain/models/Book/Book";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { Title } from "Domain/models/Book/Title/Title";
import { Price } from "Domain/models/Book/Price/Price";
import { QuantityAvailable } from "Domain/models/Book/Stock/QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "Domain/models/Book/Stock/Status/Status";
import { Stock } from "Domain/models/Book/Stock/Stock";
import { PrismaClientManager } from "../PrismaClientManager";

const prisma = new PrismaClient();

describe("PrismaBookRepository", () => {
  beforeEach(async () => {
    // テストごとにデータを初期化する
    await prisma.$transaction([prisma.book.deleteMany()]);
    await prisma.$disconnect();
  });

  const clientManager = new PrismaClientManager();
  const repository = new PrismaBookRepository(clientManager);

  it("save した集約が find で取得できる", async () => {
    const bookId = new BookId("9784167158057");
    const title = new Title("吾輩は猫である");
    const price = new Price({
      amount: 770,
      currency: "JPY",
    });
    const book = Book.create(bookId, title, price);
    await repository.save(book);

    const createdEntity = await repository.find(bookId);
    expect(createdEntity!.bookId.isEqual(bookId)).toBeTruthy();
    expect(createdEntity!.title.isEqual(title)).toBeTruthy();
    expect(createdEntity!.price.isEqual(price)).toBeTruthy();
    expect(createdEntity!.stockId.isEqual(book.stockId)).toBeTruthy();
    expect(
      createdEntity!.quantityAvailable.isEqual(book.quantityAvailable)
    ).toBeTruthy();
    expect(createdEntity!.status.isEqual(book.status)).toBeTruthy();
  });

  it("update できる", async () => {
    const createdEntity = await bookTestDataCreator(repository)({});

    const stock = Stock.reconstruct(
      createdEntity.stockId,
      new QuantityAvailable(100),
      new Status(StatusEnum.InStock)
    );

    const book = Book.reconstruct(
      createdEntity.bookId,
      new Title("吾輩は猫である(改訂版))"),
      new Price({
        amount: 800,
        currency: "JPY",
      }),
      stock
    );

    await repository.update(book);
    const updatedEntity = await repository.find(createdEntity.bookId);
    expect(updatedEntity!.bookId.isEqual(book.bookId)).toBeTruthy();
    expect(updatedEntity!.title.isEqual(book.title)).toBeTruthy();
    expect(updatedEntity!.price.isEqual(book.price)).toBeTruthy();
    expect(updatedEntity!.stockId.isEqual(book.stockId)).toBeTruthy();
    expect(
      updatedEntity!.quantityAvailable.isEqual(book.quantityAvailable)
    ).toBeTruthy();
    expect(updatedEntity!.status.isEqual(book.status)).toBeTruthy();
  });

  it("delete できる", async () => {
    const createdEntity = await bookTestDataCreator(repository)({});

    const readEntity = await repository.find(createdEntity.bookId);
    expect(readEntity).not.toBeNull();

    await repository.delete(createdEntity.bookId);
    const deletedEntity = await repository.find(createdEntity.bookId);
    expect(deletedEntity).toBeNull();
  });
});

import { QuantityAvailable } from "./QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "./Status/Status";
import { StockId } from "./StockId/StockId";

export class Stock {
  private constructor(
    private readonly _stockId: StockId,
    private _quantityAvailable: QuantityAvailable,
    private _status: Status
  ) {}

  // 新規エンティティの生成
  static create() {
    const defaultStockId = new StockId(); // 自動 ID 採番
    const defaultQuantityAvailable = new QuantityAvailable(0);
    const defaultStatus = new Status(StatusEnum.OutOfStock);
    return new Stock(defaultStockId, defaultQuantityAvailable, defaultStatus);
  }

  public delete() {
    if (this.status.value !== StatusEnum.OutOfStock)
      throw new Error("在庫がある場合削除できません。");
  }

  public changeStatus(newStatus: Status) {
    this._status = newStatus;
  }

  increaseQuantity(amount: number) {
    if (amount < 0) throw new Error("増加量は 0 以上でなければなりません。");

    const newQuantity = this.quantityAvailable.increment(amount).value;
    if (newQuantity <= 10) this.changeStatus(new Status(StatusEnum.LowStock));
    this._quantityAvailable = new QuantityAvailable(newQuantity);
  }

  decreaseQuantity(amount: number) {
    if (amount < 0) throw new Error("減少量は 0 以上でなければなりません。");

    const newQuantity = this.quantityAvailable.decrement(amount).value;
    if (newQuantity <= 10) this.changeStatus(new Status(StatusEnum.LowStock));
    if (newQuantity === 0) this.changeStatus(new Status(StatusEnum.OutOfStock));
    this._quantityAvailable = new QuantityAvailable(newQuantity);
  }

  // エンティティの再構築
  static reconstruct(
    stockId: StockId,
    quantityAvailable: QuantityAvailable,
    status: Status
  ) {
    return new Stock(stockId, quantityAvailable, status);
  }

  get stockId(): StockId {
    return this._stockId;
  }

  get quantityAvailable(): QuantityAvailable {
    return this._quantityAvailable;
  }

  get status(): Status {
    return this._status;
  }
}

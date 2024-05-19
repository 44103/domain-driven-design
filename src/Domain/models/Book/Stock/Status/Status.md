# Status (ステータス)

```mermaid
%%{init:{'theme':'neutral'}}%%

classDiagram
class Status {
    +string value
}
```

## ビジネスルール

在庫のステータスは、 InStock (在庫あり), LowStock (残りわずか),  
OutOfStock (在庫切れ)の 3 つ

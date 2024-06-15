# BDS-Logging Server
## 概要
このプロジェクトは、kaito02020424/BDSX-LoggingのBDS移植を目的としたものです。
その名残のため、XUIDなどの不要なカラムも互換性のために維持しています。

## 注意点
このサーバーは,localhostなどのLocal-Network(=BDSサーバーからのみアクセスできる環境)で解放されることを想定しています。
そのため、
- POSTデータの検証
- 日付の検証
- レート制限
等を設けていません。

## 使用方法
BDSX-Logging Clientと組み合わせて使用します。(後日公開)
NodejsおよびTypeScriptが必要です。
1. Logging Serverを`git clone`する。
2. `tsc -d`を実行し、TSをJSへトランスパイルする。
3. `npm i`を実行し、依存関係を解決する。
4. `node .`を実行し、HTTPサーバーを起動する。
> [!NOTE]
> ポートはデフォルトで3000を使用しますが、index.tsを編集することでポート番号を変更できます。

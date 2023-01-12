# japanese-word-count README
日本語の文字数をカウントするVSCodeの拡張。Japanese Word Countという名前だが、実際には、日本語の文字数カウント(Japanese Character Count)を行う。カウントの行い方は、[この記事](https://qiita.com/suin/items/3da4fb016728c024eaca)を参考にしているため、サロゲートペアで表現する文字である「🇯🇵」や「👨🏻‍💻」や「𩸽」などの絵文字や漢字も正しく1文字としてカウントできる。

ちなみに実装は、[holmesconan/vscode-wordcount-cjk](https://github.com/holmesconan/vscode-wordcount-cjk)を参考にした。

## カウントの仕様
### 文字数カウント
- 改行(正規表現`\n`と`\r`) を取り除いたあとJavaScriptの"ja"のロケールの[Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)で分割できるキャラクターの数をカウント

### 文字数カウント (スペース無視)
- 改行(正規表現`\n`と`\r`)とスペース(正規表現`\s`)を取り除いたあとJavaScriptの"ja"のロケールの[Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)で分割できるキャラクターの数をカウント

### 原稿用紙換算(400x?枚)
- 改行(正規表現`\n`)で各行を分割した後、キャリッジリターンの改行コード(正規表現`\r`)を除去し、"ja"のロケールの[Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)で分割できるキャラクターの数が20文字切り上げで行数をカウントし、20行の切り上げ値を原稿用紙の枚数としてカウント

## 機能
- 日本語の文字数カウントを行い、ステータスバーに表示する
- ステータスバーのツールチップには加えて、スペースを抜いたものと、400字詰め原稿用紙の枚数を表示する
- アクティブにしたウインドウの他、選択した文字列に関してもカウントを行う

## 必要要件
なし

## 拡張の設定
なし

## 既知の問題
GitHubのリポジトリの[Issues](https://github.com/sifue/vscode-japanese-word-count/issues)までお願いします。

## Release Notes
### 0.0.1
初回リリース

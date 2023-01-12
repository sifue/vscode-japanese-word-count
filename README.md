# japanese-word-count README
![ScreenShot](./image/screenshot.png)

Japanese Word Countという名前のVSCodeの拡張。実際には、日本語の文字数カウント(Japanese Character Count)を行う。カウントの行い方は、[この記事](https://qiita.com/suin/items/3da4fb016728c024eaca)を参考にしているため、サロゲートペアで表現する文字である「🇯🇵」や「👨🏻‍💻」や「𩸽」などの絵文字や漢字も正しく1文字としてカウントできる。

ちなみに実装は、[holmesconan/vscode-wordcount-cjk](https://github.com/holmesconan/vscode-wordcount-cjk)を参考にした。

## 機能
- 日本語の文字数カウントを行い、ステータスバーに表示する。
- ステータスバーのツールチップには加えて、スペースを抜いたものと、400字詰め原稿用紙の枚数を表示する。
- アクティブにしたウインドウの他、選択した文字列に関してもカウントを行う

## 必要要件
なし

## 拡張の設定
なし

## 既知の問題
GitHubのリポジトリのIssuesまでお願いします。

## Release Notes
### 0.0.1
初回リリース

**Enjoy!**

# Reverse AutoScroll Extension

[English](./README.md) | [简体中文](./README_zh.md) | [日本語](./README_ja.md)

ネイティブの中クリック自動スクロールに近い操作感を再現しつつ、スクロール方向を強制的に反転する Chrome 拡張です。`macOS natural scrolling` のような方向感を求めるユーザー向けです。

## 機能
- 中クリックを離した時点で自動スクロールをオン/オフ切り替え
- ネイティブの中クリック自動スクロールを奪取し、競合を防止
- クリック位置に固定アンカーを表示
- デッドゾーンと加速カーブでネイティブに近い手触り
- 縦横ともに反転スクロール
- 任意マウスクリック、`Esc`、ウィンドウ非アクティブで終了

## 対応範囲と制限
- 通常ページのみ対応: `http://*/*`、`https://*/*`
- 制限ページは非対応: `chrome://*`、Chrome ウェブストアなど

## インストール（デベロッパーモード）
1. `chrome://extensions` を開く
2. デベロッパーモードを有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このプロジェクトフォルダを選択

## 開発情報
- メインスクリプト: `content.js`
- マニフェスト: `manifest.json`
- リポジトリ: `https://github.com/lyuro/reverse-autoscroll-extension`

## ライセンス
MIT。詳細は [LICENSE](./LICENSE) を参照してください。

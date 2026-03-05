# Reverse AutoScroll Extension

[English](./README.md) | [简体中文](./README_zh.md) | [日本語](./README_ja.md)

一个 Chrome 扩展：尽量复刻原生中键自动滚动手感，并强制反转滚动方向。也适合搜索 `macOS natural scrolling` 相关需求的用户。

## 功能
- 中键释放后开关自动滚动（不需要长按）
- 接管原生中键自动滚动，避免图标和行为冲突
- 在点击位置显示固定视觉锚点
- 带死区和加速曲线，手感接近原生
- 横向和纵向都反向
- 任意鼠标按键、`Esc`、窗口失焦可退出

## 作用范围与限制
- 支持普通网页：`http://*/*`、`https://*/*`
- 不支持受限页面：`chrome://*`、Chrome 网上应用店等

## 安装（开发者模式）
1. 打开 `chrome://extensions`
2. 开启“开发者模式”
3. 点击“加载已解压的扩展程序”
4. 选择本项目文件夹

## 开发说明
- 主逻辑文件：`content.js`
- 扩展清单：`manifest.json`
- 项目主页：`https://github.com/lyuro/reverse-autoscroll-extension`

## 许可证
MIT，详见 [LICENSE](./LICENSE)。

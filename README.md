# Reverse AutoScroll Extension

[English](./README.md) | [简体中文](./docs/README_zh.md) | [日本語](./docs/README_ja.md)

A Chrome extension that reproduces native middle-click autoscroll feel and forces the scroll direction to be reversed, useful for users who want a `macOS natural scrolling`-like direction on middle-click autoscroll.

## Features
- Middle click release toggles autoscroll on and off (no long-press required)
- Native middle-click autoscroll takeover to avoid conflicts
- Fixed visual anchor at click position
- Deadzone + acceleration curve tuned close to native behavior
- Full reversed direction on both axes
- Exit via any mouse click, `Esc`, or window blur

## Scope and Limitations
- Works on normal pages: `http://*/*` and `https://*/*`
- Does not run on restricted pages like `chrome://*` and Chrome Web Store
- If you want to disable it on specific sites, use Chrome's built-in site access control in `chrome://extensions` for this extension.

## Install

**[Chrome Web Store](https://chromewebstore.google.com/detail/reverse-autoscroll/odpdphjknpipbmkhepbaloflincdafjm)**

### Developer Mode
1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this project folder

## Development
- Main script: `content.js`
- Manifest: `manifest.json`
- Homepage: `https://github.com/kicucya/reverse-autoscroll-extension`

## Privacy
This extension does not collect or transmit user data to any developer-owned server.
Settings are saved in Chrome Storage (`chrome.storage.sync`) and may sync across your signed-in Chrome browsers depending on your sync settings.

## Permissions
- `storage`: save your reverse-direction preferences (`reverseX` and `reverseY`).
- Site access on `http://*/*` and `https://*/*`: required to handle middle-click autoscroll behavior directly on web pages.

## License
MIT. See [LICENSE](./LICENSE).

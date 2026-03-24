// i18n: apply localized strings
document.querySelectorAll('[data-i18n]').forEach(el => {
  const msg = chrome.i18n.getMessage(el.dataset.i18n);
  if (msg) el.textContent = msg;
});
// i18n: set text direction (RTL for Arabic, etc.)
document.body.dir = chrome.i18n.getMessage('@@bidi_dir');

const DEFAULTS = { reverseX: false, reverseY: true, altClickEnabled: false };

const elX = document.getElementById('reverseX');
const elY = document.getElementById('reverseY');
const elAltClick = document.getElementById('altClickEnabled');

chrome.storage.sync.get(DEFAULTS, (settings) => {
  elX.checked = settings.reverseX;
  elY.checked = settings.reverseY;
  elAltClick.checked = settings.altClickEnabled;
});

elX.addEventListener('change', () => {
  chrome.storage.sync.set({ reverseX: elX.checked });
});

elY.addEventListener('change', () => {
  chrome.storage.sync.set({ reverseY: elY.checked });
});

elAltClick.addEventListener('change', () => {
  chrome.storage.sync.set({ altClickEnabled: elAltClick.checked });
});

const DEFAULTS = { reverseX: false, reverseY: true };

const elX = document.getElementById('reverseX');
const elY = document.getElementById('reverseY');

chrome.storage.sync.get(DEFAULTS, (settings) => {
  elX.checked = settings.reverseX;
  elY.checked = settings.reverseY;
});

elX.addEventListener('change', () => {
  chrome.storage.sync.set({ reverseX: elX.checked });
});

elY.addEventListener('change', () => {
  chrome.storage.sync.set({ reverseY: elY.checked });
});

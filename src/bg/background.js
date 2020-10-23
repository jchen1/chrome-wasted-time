function interval() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      const domain = new URL(tab.url).hostname;
      if (shouldShowFrame(domain)) {
        chrome.windows.get(tab.windowId, (window) => {
          if (window.focused) {
            chrome.storage.local.get(domain, (res) => {
              chrome.storage.local.set({ [domain]: (res[domain] || 0) + 1 });
            });
          }
        });
      }
    });
  });
}

// unix timestamp
function toLocalDay(ts) {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  return Math.floor((ts - offset) / (1000 * 60 * 60 * 24));
}

function reset() {
  chrome.storage.local.get("wasted-time-last-ts", (res) => {
    const then = res["wasted-time-last-ts"];
    const now = Date.now();

    if (toLocalDay(then) !== toLocalDay(now)) {
      chrome.storage.local.clear();
      chrome.storage.local.set({ "wasted-time-last-ts": now });
    }
  });
}

setInterval(interval, 1000);
setInterval(reset, 60000);

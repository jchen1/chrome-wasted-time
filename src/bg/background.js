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

function reset() {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    chrome.storage.local.clear();
  }
}

setInterval(interval, 1000);
setInterval(reset, 60000);

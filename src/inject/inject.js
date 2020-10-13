const whitelist = [
  /reddit\.com/,
  /arstechnica\.com/,
  /youtube\.com/,
  /twitter\.com/,
  /facebook\.com/,
  /theringer\.com/,
  /news\.ycombinator\.com/,
  /hckrnews\.com/,
  /anandtech\.com/,
  /twitch\.tv/,
  /espn\.com/,
];

function shouldShowFrame(domain) {
  return whitelist.some((r) => r.test(domain));
}

function onmessage(msg) {
  const domain = window.location.hostname;

  if (shouldShowFrame(domain)) {
    const frame = document.createElement("iframe");
    frame.src = chrome.runtime.getURL("src/frame.html");
    frame.style =
      "position: fixed; bottom: 10px; right: 10px; border: 1px solid grey; border-radius: 5px; z-index: 99999; height: 30px; width: 150px;";
    frame.name = domain;
    document.body.insertBefore(frame, document.body.firstChild);
  }
}

onmessage();

// chrome.storage.sync.set({ url: new Date() });

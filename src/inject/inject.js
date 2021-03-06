function onmessage(msg) {
  const domain = window.location.hostname;

  if (shouldShowFrame(domain)) {
    const frame = document.createElement("iframe");
    frame.src = chrome.runtime.getURL("src/frame.html");
    frame.style =
      "position: fixed; bottom: 10px; right: 10px; border: 1px solid grey; border-radius: 15px; z-index: 2147483647; height: 150px; width: 430px;";
    frame.name = domain;
    document.body.insertBefore(frame, document.body.firstChild);
  }
}

onmessage();

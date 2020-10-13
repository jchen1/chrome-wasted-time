const url = window.name;

function pad(num) {
  return String(num).padStart(2, "0");
}

const start = new Date();

function interval() {
  chrome.storage.local.get(null, (result) => {
    const diff = result[url];

    const secs = diff % 60;
    const mins = Math.floor(diff / 60) % 60;
    const hours = Math.floor(diff / 60 / 60) % 24;

    const sessionString = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    document.getElementById("wasted-today").innerText = sessionString;
  });
}

window.setInterval(interval, 1000);
window.addEventListener("DOMContentLoaded", interval, false);

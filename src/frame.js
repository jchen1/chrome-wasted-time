const url = window.name;

function pad(num) {
  return String(num).padStart(2, "0");
}

function formatTime(diff) {
  const secs = diff % 60;
  const mins = Math.floor(diff / 60) % 60;
  const hours = Math.floor(diff / 60 / 60) % 24;

  return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
}

const start = new Date();

function interval() {
  chrome.storage.local.get(null, (result) => {
    const diff = result[url];
    document.getElementById("wasted-here").innerText = formatTime(diff);

    const total = Object.keys(result).reduce(
      (total, key) => {
        if (key !== "wasted-time-last-ts") {
          return total + result[key];
        }
        return total;
      },
      0,
    );
    document.getElementById("wasted-today").innerText = formatTime(total);
  });
}

window.setInterval(interval, 1000);
window.addEventListener("DOMContentLoaded", interval, false);

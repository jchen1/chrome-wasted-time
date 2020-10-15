const whitelist = [
  /reddit\.com/,
  /arstechnica\.com/,
  /www\.youtube\.com/, // exclude youtube music
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

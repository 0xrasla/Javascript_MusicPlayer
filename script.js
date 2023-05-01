let Playing = false;
let current = 0;
const audio = document.querySelector("#audio");
const songplaying = document.querySelector(".song_title");
const songstatus = document.querySelector(".song_status > .bar");
const songtime = document.querySelector(".song_time");
//   buttons
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

async function getAllMusic() {
  try {
    const response = await fetch("/music");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const links = doc.querySelectorAll("a");
    const mp3Links = Array.from(links).filter((link) =>
      link.href.endsWith(".mp3")
    );
    const mp3Files = mp3Links.map((link) => link.href.split("/").pop());
    audio.src = "/music/" + mp3Files[current];
    songplaying.innerHTML = parseText(mp3Files[current]);

    return mp3Files;
  } catch (error) {
    console.error(error);
  }
}

getAllMusic().then((music) => {
  audio.volume = 0.5;

  // play and pause
  play.addEventListener("click", () => {
    if (Playing) {
      audio.pause();
      document
        .querySelector("#play")
        .setAttribute("src", "./assets/icons/play.png");
      Playing = false;
    } else {
      audio.play();
      document
        .querySelector("#play")
        .setAttribute("src", "./assets/icons/pause.png");
      Playing = true;
    }
  });

  // skip some time
  prev.addEventListener("click", () => {
    if (current > 0) {
      current--;
    } else {
      current = music.length - 1;
    }
    audio.src = "/music/" + music[current];
    songplaying.innerHTML = parseText(music[current]);
    audio.play();
  });

  // skip some time
  next.addEventListener("click", () => {
    if (current < music.length - 1) {
      current++;
    } else {
      current = 0;
    }
    audio.src = "/music/" + music[current];
    songplaying.innerHTML = parseText(music[current]);
    audio.play();
  });

  // progress bar
  audio.addEventListener("timeupdate", () => {
    const percentage = Math.floor((audio.currentTime / audio.duration) * 100);

    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds =
      Math.floor(currentTime % 60)
        .toString()
        .padStart(2, "0") ?? "00";
    const totalMinutes = Math.floor(duration / 60) || "00";
    const totalSeconds =
      Math.floor(duration % 60)
        .toString()
        .padStart(2, "0") || "00";
    const formattedTime = `${currentMinutes}:${currentSeconds} / ${totalMinutes} : ${
      totalSeconds == "NaN" ? "00" : totalSeconds
    }`;
    songtime.innerHTML = formattedTime;
    songstatus.style.width = percentage + "%";

    if (audio.ended) {
      next.click();
    }
  });
});

// utils functions
function parseText(str) {
  str = str.toString();
  return str.replace(/%20/g, " ").replace(/\.mp3/g, "");
}

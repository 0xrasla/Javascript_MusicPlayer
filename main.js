import "./style.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomLetter() {
  let rand = Math.floor(Math.random() * letters.length);
  let caporsmall_prob = Math.floor(Math.random() * 2);

  if (!caporsmall_prob) return letters[rand];
  return letters[rand].toLowerCase();
}

function render() {
  for (let i = 0; i < 50; i++) {
    let rowCont = document.createElement("div");
    for (let i = 0; i < 14; i++) {
      let letter = document.createElement("div");
      letter.classList.add("letter");
      letter.innerText = randomLetter();
      rowCont.classList.add("row");
      rowCont.appendChild(letter);
    }
    document.querySelector("#app").appendChild(rowCont);
  }
}

function blink() {
  let rows = document.querySelectorAll(".row");
  let lastSelected = null;
  setInterval(() => {
    let randRow = Math.floor(Math.random() * rows.length);
    // make sure random start is greater than half of the last selected
    let randStart = Math.floor(Math.random() * rows[randRow].children.length);
    // run a while loop that check the random row is not the same as the last selected row
    while (randRow === lastSelected) {
      randRow = Math.floor(Math.random() * rows.length);
    }

    for (let i = randStart; i < rows[randRow].children.length; i++) {
      let element = rows[randRow].children[i];
      element.classList.add("blink");
      element.style.animationDelay = `${Math.floor(Math.random() * 600)}ms`;
      element.style.animationDuration = `${Math.floor(Math.random() * 5000)}ms`;

      setTimeout(() => {
        element.classList.remove("blink");
      }, Math.floor(Math.random() * 2000));
    }
  }, Math.floor(Math.random() * 700));
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  blink();
});

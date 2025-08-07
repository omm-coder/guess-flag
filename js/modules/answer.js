import { nextQuestion } from "./case.js";
import { callPrintQuestion, endGame } from "./helper.js";
import { counter } from "./main.js";
import { setIsClickable, countScore } from "./state.js";

const scoreElement = document.querySelector("#score-in-normal");
let normal_score = 0;

function check_answer(el, country) {
  let text = el.textContent.split(" ").slice(1);
  let countryName = text.join(" ");

  let isRight = countryName === country.name.common;
  let cssClass = isRight ? "right" : "wrong";

  if (isRight) countScore();

  el.classList.add(cssClass);

  setTimeout(() => {
    el.classList.remove(cssClass);
    setIsClickable(true);
    counter() ? callPrintQuestion() : endGame();
  }, 1000);
}

function normal_check_answer(el, country) {
  let text = el.textContent.split(" ").slice(1);
  let countryName = text.join(" ");

  let isRight = countryName === country.name.common;
  let cssClass = isRight ? "right" : "wrong";

  el.classList.add(cssClass);
  setTimeout(() => {
    el.classList.remove(cssClass);
    if (isRight) {
      normal_score += 1;
      scoreElement.textContent = `score:${normal_score}`;
    }
    counter() ? nextQuestion() : alert("Finhsed");
  }, 1000);
}

export { check_answer, normal_check_answer };

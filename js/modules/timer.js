import { callPrintQuestion, endGame } from "./helper.js";
import { counter, takeSecondsPerQuestion } from "./main.js";
import { getIsClickable, setIsClickable } from "./state.js";

// const h1 = document.querySelector("#h-s");
let questionTimer = null;
let questionTime;
let globalTimer = null;
let globalTime;

function startQuestionTimer() {
  clearTimeout(questionTimer);

  questionTime = takeSecondsPerQuestion();

  //   let seconds = questionTime / 1000;
  //   h1.textContent = `seconds: ${seconds}`;

  //   questionTimer = setInterval(() => {
  //     h1.textContent = `seconds: ${seconds}`;
  //     if(seconds === 0) {
  //         clearInterval(questionTimer);
  //         counter() ? callPrintQuestion() : End();
  //     }
  //     seconds--;
  //   }, 1000);


  questionTimer = setTimeout(() => {
    if (getIsClickable) {
      // Only trigger next if user hasn't clicked
      setIsClickable(false); // block clicks now
      if (counter()) callPrintQuestion();
      else endGame();
    } else {
      console.log("✅ User already answered — timer canceled");
    }
  }, questionTime);
}
function startGlobalTimer(totalTime, id) {
  clearInterval(globalTimer);

  const spanTime = document.querySelector(`#${id}`);
  globalTime = totalTime;
  let minutes = Math.floor(globalTime / 60);
  let seconds = globalTime % 60;
  spanTime.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;

  globalTimer = setInterval(() => {
    spanTime.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(globalTimer);
        endGame();
        return;
      } else {
        minutes--;
        seconds = 59;
      }
    }
    seconds--;
  }, 1000);
}

function StopQuestionTimer() {
  clearTimeout(questionTimer);
}
const stopGlobalTimer = () =>  clearInterval(globalTimer);

export { startQuestionTimer, startGlobalTimer, StopQuestionTimer, stopGlobalTimer};

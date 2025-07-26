import { getTotalQuestion } from "./main.js";
import { PrintQuestion, handleAnswer } from "./question.js";
import { showPopUp } from "./result.js";
import { getScore } from "./state.js";

function endGame() {
  const containerBox = document.querySelector("#container");
  setTimeout(() => {
    showPopUp(getScore(), getTotalQuestion());
    containerBox.classList.remove("showContainer");
  }, 1000);
}

function callPrintQuestion() {
  PrintQuestion();
  handleAnswer();
}



export { callPrintQuestion, endGame};

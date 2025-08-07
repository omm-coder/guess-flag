import { getTotalQuestion } from "./main.js";
import { PrintQuestion, handleAnswer } from "./question.js";
import { showPopUp } from "./result.js";
import { getScore } from "./state.js";

function endGame() {
  const containerBox = document.querySelector("#container");
  const cont_parent = document.querySelector("#cont-parent");
  const normal_container = document.querySelector("#normal-container");
  setTimeout(() => {
    showPopUp(getScore(), getTotalQuestion());
    containerBox.classList.remove("showContainer");
    normal_container.classList.remove("showContainer")
    cont_parent.classList.remove("start")
  }, 1000);
}

function callPrintQuestion() {
  PrintQuestion();
  handleAnswer();
}



export { callPrintQuestion, endGame};

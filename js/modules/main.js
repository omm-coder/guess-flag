import { PrintQuestion, handleAnswer } from "./question.js";
import { resetScore } from "./state.js";
import { startGlobalTimer } from "./timer.js";

// grab all ellements
let allIcons = document.querySelectorAll("i");
let allButons = document.querySelectorAll("button");
let allInputs = document.querySelectorAll("input");
let allSpan = document.querySelectorAll("span");

const aside = document.querySelector("aside");
const model = document.querySelector("#model");
const popup = document.querySelector("#popup");
const beginDiv = document.querySelector("#begin");
const containerBox = document.querySelector("#container");
const errorPara = document.querySelector("#error");

//global variable
let seconds_per_Question;
let totalSeconds;
let message;

// allFunctions
function getTotalQuestion() {
  return Math.floor(totalSeconds / seconds_per_Question);
}
function createCountQuestionNumber() {
  let countQuestion = 1;
  return function () {
    if (countQuestion < getTotalQuestion() + 1) {
      const track_q_span = document.querySelectorAll(".track-q");
      track_q_span.forEach((span) => (span.textContent = countQuestion));
      // console.log("countQuestion number: "+ countQuestion);
      countQuestion++;
      return true;
    } else {
      return false;
    }
  };
}
let counter = createCountQuestionNumber();
function resetCount() {
  counter = createCountQuestionNumber();
}
const takeSecondsPerQuestion = () => seconds_per_Question * 1000;

function writeOnSpan(span) {
  switch (span.id) {
    case "displaySec-per-q":
      span.textContent = `${seconds_per_Question}s`;
      break;
    case "display-total-time":
      span.textContent = `${totalSeconds}s`;
      break;
    case "display-total-q":
      span.textContent = getTotalQuestion();
    case "totalQuestion":
      span.textContent = getTotalQuestion();
      break;
    case "time":
      setTimeout(() => startGlobalTimer(totalSeconds, "time"), 2000);
      break;
    default:
      break;
  }
}
const hasThemValue = () =>
  seconds_per_Question && totalSeconds ? true : false;

function callModel(btn) {
  let isOk = hasThemValue();
  alert(isOk);
  if (isOk) {
    
    model.classList.add("show-model");
    aside.classList.remove("showAside");
    beginDiv.classList.add("hideBegin");
    allSpan.forEach(writeOnSpan);
    btn.disabled = true;
  } else {
    errorPara.textContent = message ? message : "Please configure time";
    errorPara.style.visibility = "visible";
    setTimeout(() => (errorPara.style.visibility = "hidden"), 3000);
  }
}
function clearInputs() {
  allInputs.forEach((input) => (input.value = ""));
}
function validateInput(value, id) {
  if (id === "time-per-q") {
    if (!(value >= 3 && value <= 15)) {
      message = "choose seconds between 3-15 ";
      return;
    }
    return value;
  }
  if (id === "total-time") {
    if (!(value >= 20 && value <= 150)) {
      message = "choose seconds between 20-150 ";
      return;
    }
    return value;
  }
}

function onChangeInput(input) {
  input.addEventListener("input", () => {
    // Limit to 2 digits of seconds
    if (input.id === "time-per-q" && input.value.length > 2) {
      input.value = input.value.slice(0, 2);
    }

    // Limit to 3 digits of seconds
    if (input.id === "total-time" && input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  });
  input.addEventListener("change", () => {
    let numberSeconds = parseInt(input.value);
    if (input.id === "time-per-q")
      seconds_per_Question = validateInput(numberSeconds, input.id);
    else if (input.id === "total-time")
      totalSeconds = validateInput(numberSeconds, input.id);
  });
}

function clickIcon(icon) {
  icon.addEventListener("click", () => {
    if (icon.id === "setting") aside.classList.add("showAside");
    else if (icon.id === "hide-setting") aside.classList.remove("showAside");
    else if (icon.id === "hide-model") {
      model.classList.remove("showModel");
      const btn = document.querySelector("#ready");
      btn.disabled = false;
    }
  });
}

function clickButton(button) {
  button.addEventListener("click", () => {
    if (button.id === "ready") callModel(button);
    else if (button.id === "start") {
      resetScore();
      resetCount();
      counter(); // start question count

      containerBox.classList.add("showContainer");
      model.classList.remove("show-model");

      PrintQuestion();
      handleAnswer();
    } else if (button.id === "quite") {
      popup.classList.remove("show-popup");
      beginDiv.classList.remove("hideBegin");
      const btn = document.querySelector("#ready");
      btn.disabled = false;
      clearInputs();
    } else if (button.id === "play_again") {
      resetScore();
      resetCount();
      counter();

      popup.classList.remove("show-popup");
      containerBox.classList.add("showContainer");

      PrintQuestion();
      handleAnswer();
      startGlobalTimer(totalSeconds, "time");
    }
  });
}

function start() {
  allIcons.forEach(clickIcon);
  allButons.forEach(clickButton);
  allInputs.forEach(onChangeInput);
}

export {
  totalSeconds,
  start,
  getTotalQuestion,
  takeSecondsPerQuestion,
  counter,
};

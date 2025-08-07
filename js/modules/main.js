import {
  checkNumberCountries,
  clearValues,
  getNumberFlags,
  handleAnswerClick,
  nextQuestion,
} from "./case.js";
import { PrintQuestion, fetchAllCountries, handleAnswer } from "./question.js";
import { resetScore } from "./state.js";
import { startGlobalTimer, stopGlobalTimer } from "./timer.js";

// grab all ellements
let allIcons = document.querySelectorAll("i");
let allButons = document.querySelectorAll("button");
let allInputs = document.querySelectorAll("input");
let allSpan = document.querySelectorAll("span");

const aside = document.querySelector("aside");
const cont_parent = document.querySelector("#cont-parent");
const model = document.querySelector("#model");
const popup = document.querySelector("#popup");
const beginDiv = document.querySelector("#begin");
const normal_container = document.querySelector("#normal-container");
const containerBox = document.querySelector("#container");
const play_normal = document.querySelector("#play-normal");
const play_with_time = document.querySelector("#play-with-time");
const con_play_normal = document.querySelector("#con-play-normal");
const con_play_with_time = document.querySelector("#con-play-with-time");
const errorPara = document.querySelector("#error");

//global variable
let seconds_per_Question;
let totalSeconds;
let message;

// allFunctions
function getTotalQuestion() {
  let numberFlags = parseInt(getNumberFlags());
  let totalQuestion =
    totalSeconds && seconds_per_Question
      ? Math.floor(totalSeconds / seconds_per_Question)
      : numberFlags;

  return totalQuestion;
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
      startGlobalTimer(totalSeconds, "time");
      break;
    default:
      break;
  }
}
const displayError = () => {
  errorPara.style.visibility = "visible";
  setTimeout(() => (errorPara.style.visibility = "hidden"), 3000);
};
const addRemoveHelper = (element) => {
  if (element) model.classList.add("show-model");
  aside.classList.remove("showAside");
  beginDiv.classList.add("hideBegin");
};
const hasThemValue = () =>
  seconds_per_Question && totalSeconds ? true : false;

function callModel() {
  let isOk = hasThemValue();
  if (isOk) {
    addRemoveHelper(model);
    allSpan.forEach(writeOnSpan);
  } else {
    errorPara.textContent = message ? message : "Please configure time";
    displayError();
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

async function checkCountries() {
  const message = await checkNumberCountries();
  if (message) {
    errorPara.textContent = message;
    displayError();
    clearValues();
    return;
  }
  addRemoveHelper();
  cont_parent.classList.add("start");
  normal_container.style.display = "flex";

  counter();
  nextQuestion();
  handleAnswerClick();
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
  icon.addEventListener("click", (e) => {
    if (icon.id === "setting") aside.classList.add("showAside");
    else if (icon.id === "hide-setting") aside.classList.remove("showAside");
    else if (icon.id === "hide-model") {
      model.classList.remove("show-model");
      const btn = document.querySelector("#ready");
      btn.disabled = false;
    }
  });
}

function clickButton(button) {
  button.addEventListener("click", () => {
    if (button.id === "ready") {
      fetchAllCountries();
      callModel(button);
    } else if (button.id === "normal") {
      checkCountries();
    } else if (button.id == "back") {
      cont_parent.classList.remove("start");
      beginDiv.classList.remove("hideBegin");
      normal_container.style.display = "none";
      clearValues();
    } else if (button.id === "start") {
      resetScore();
      resetCount();
      counter(); // start question count

      cont_parent.classList.add("start");
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
      stopGlobalTimer();
      location.reload();
    } else if (button.id === "play_again") {
      resetScore();
      resetCount();
      counter();

      popup.classList.remove("show-popup");
      cont_parent.classList.add("start");
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

play_normal.addEventListener("click", () => {
  con_play_with_time.classList.remove("showCase-setting");
  con_play_normal.classList.add("showCase-setting");

  play_normal.classList.add("selected");
  play_with_time.classList.remove("selected");
});
play_with_time.addEventListener("click", () => {
  con_play_normal.classList.remove("showCase-setting");
  con_play_with_time.classList.add("showCase-setting");

  play_with_time.classList.add("selected");
  play_normal.classList.remove("selected");
});

export {
  totalSeconds,
  start,
  getTotalQuestion,
  takeSecondsPerQuestion,
  counter,
};

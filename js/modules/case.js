import { normal_check_answer } from "./answer.js";
import { printAnswers, updateRandomCountries } from "./question.js";

const checkBox_continents = document.getElementsByName("continent");
const radio_flags_number = document.getElementsByName("flags");
const answersBox = document.querySelector("#normal-answers");

let numberFlags;
let selectedConntinents = [];
let combined = [];
let countryToGuess;

function getSelectedContinents() {
  let selectedValues = [];
  for (let i = 0; i < checkBox_continents.length; i++) {
    if (checkBox_continents[i].checked) {
      selectedValues.push(checkBox_continents[i].value);
    }
  }
  return selectedValues;
}

function getNumberFlags() {
  for (let i = 0; i < radio_flags_number.length; i++) {
    if (radio_flags_number[i].checked) {
      numberFlags = radio_flags_number[i].value;
      break; // Exit the loop once the checked radio button is found
    }
  }
  return numberFlags;
}

function makeUrls() {
  const urls = [];
  selectedConntinents = getSelectedContinents();

  for (let continent of selectedConntinents) {
    const url =
      continent === "all"
        ? `https://restcountries.com/v3.1/${continent}?fields=name,capital,flags`
        : `https://restcountries.com/v3.1/region/${continent}?fields=name,capital,flags`;
    urls.push(url);
  }
  return urls;
}

const getCountries_of_continent = async () => {
  const urls = makeUrls();
  const results = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );
  return results.flat();
};

async function checkNumberCountries() {
  numberFlags = getNumberFlags();
  if (!numberFlags) return "Please select number of flags";

  combined = await getCountries_of_continent();

  if (combined.length < numberFlags) return "Too short countries selected!";

  const span = document.querySelector("#totalQuestion-normal");
  span.textContent = numberFlags;
  return;
}

const clearValues = () => {
  for (let checkBox of checkBox_continents) checkBox.checked = false;
  selectedConntinents = [];
  for (let radio_number_flag of radio_flags_number)
    radio_number_flag.checked = false;
  numberFlags = 0;
};

function nextQuestion() {
  let randomCountries = [];

  updateRandomCountries(randomCountries, combined);

  let indexCountryToGuess = Math.floor(Math.random() * randomCountries.length);
  countryToGuess = randomCountries[indexCountryToGuess];

  printAnswers("normal-img", "normal-answers", countryToGuess, randomCountries);
}

function answerClick(e) {
  normal_check_answer(e.target, countryToGuess);
}

function handleAnswerClick() {
  answersBox.addEventListener("click", answerClick);
}
export {
  getSelectedContinents,
  getNumberFlags,
  checkNumberCountries,
  clearValues,
  nextQuestion,
  handleAnswerClick,
};

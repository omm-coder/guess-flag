import { check_answer } from "./answer.js";
import { getIsClickable, setIsClickable } from "./state.js";
import { startQuestionTimer, StopQuestionTimer } from "./timer.js";

const url = "https://restcountries.com/v3.1/all?fields=name,capital,flags";
let img = document.querySelector("img");
let answerBox = document.querySelector(".answers-box");
let containerBox = document.querySelector("#container");
let spinDiv = document.querySelector("#spinner");
let countryToGuess;

function PrintQuestion() {
  spinDiv.style.display = "block";
  containerBox.style.opacity = "0";

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Fetch Failed");
      return response;
    })
    .then((res) => res.json())
    .then((data) => {
      const countries = data;

      let randomCountries = [];

      for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * countries.length);
        let country = countries[randomIndex];
        if(country === country) {
          randomIndex = Math.floor(Math.random() * countries.length);
          country = countries[randomIndex];
          randomCountries.push(country)
        }
        else randomCountries.push(country);
      }

      let indexCountryToGuess = Math.floor(
        Math.random() * randomCountries.length
      );

      countryToGuess = randomCountries[indexCountryToGuess];

      img.src = countryToGuess.flags.png;
      let alphabet = 65;

      // const allList = answerBox.querySelectorAll('li');
      // allList.forEach((li, index) => {
      //   const character = String.fromCharCode(alphabet);
      //   li.textContent = `${character}) ${randomCountries[index].name.common}`;
      //   alphabet++;
      // });

      while (answerBox.firstChild) answerBox.removeChild(answerBox.firstChild);
      for (let i = 0; i < randomCountries.length; i++) {
        const character = String.fromCharCode(alphabet);
        const li = document.createElement("li");
        li.textContent = `${character}) ${randomCountries[i].name.common}`;

        answerBox.appendChild(li);
        alphabet++;
      }

      setIsClickable(true);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      spinDiv.style.display = "none"; // hide spinner after all
      containerBox.style.opacity = "1";
    });

  startQuestionTimer();
}

function handleClick(e) {
  if (!getIsClickable()) return;

  setIsClickable(false);
  StopQuestionTimer();
  check_answer(e.target, countryToGuess);
}

function handleAnswer() {
  answerBox.removeEventListener("click", handleClick); // remove previous listener
  answerBox.addEventListener("click", handleClick); // add fresh listener
}

export { PrintQuestion, handleAnswer };

import { check_answer } from "./answer.js";
import { getIsClickable, setIsClickable } from "./state.js";
import { startQuestionTimer, StopQuestionTimer } from "./timer.js";

// let containerBox = document.querySelector("#container");
// let spinDiv = document.querySelector("#spinner");
let countryToGuess;
let countries = [];

const url = "https://restcountries.com/v3.1/all?fields=name,capital,flags";

async function fetchCountries() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fetch Failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
const fetchAllCountries = async () => (countries = await fetchCountries());

// function PrintQuestion() {
//   spinDiv.style.display = "block";
//   containerBox.style.opacity = "0";

//   fetch(url1)
//     .then((response) => {
//       if (!response.ok) throw new Error("Fetch Failed");
//       return response;
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       const countries = data;

//       let randomCountries = [];

//       for (let i = 0; i < 4; i++) {
//         let randomIndex = Math.floor(Math.random() * countries.length);
//         let country = countries[randomIndex];
//         if(country === country) {
//           randomIndex = Math.floor(Math.random() * countries.length);
//           country = countries[randomIndex];
//           randomCountries.push(country)
//         }
//         else randomCountries.push(country);
//       }

//       let indexCountryToGuess = Math.floor(
//         Math.random() * randomCountries.length
//       );

//       countryToGuess = randomCountries[indexCountryToGuess];

//       img.src = countryToGuess.flags.png;
//       let alphabet = 65;

//       // const allList = answerBox.querySelectorAll('li');
//       // allList.forEach((li, index) => {
//       //   const character = String.fromCharCode(alphabet);
//       //   li.textContent = `${character}) ${randomCountries[index].name.common}`;
//       //   alphabet++;
//       // });

//       while (answerBox.firstChild) answerBox.removeChild(answerBox.firstChild);
//       const ul = document.createElement('ul');
//       for (let i = 0; i < randomCountries.length; i++) {
//         const character = String.fromCharCode(alphabet);
//         const li = document.createElement("li");
//         li.textContent = `${character}) ${randomCountries[i].name.common}`;

//         ul.appendChild(li);
//         alphabet++;
//       }
//       answerBox.appendChild(ul)

//       setIsClickable(true);
//       startQuestionTimer();
//     })
//     .catch((err) => console.log(err))
//     .finally(() => {
//       spinDiv.style.display = "none"; // hide spinner after all
//       containerBox.style.opacity = "1";
//     });

// }

function updateRandomCountries(randomArray, array) {
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    let country = array[randomIndex];

    if (!randomArray.includes(country)) randomArray.push(country);
    else i--;
  }
}

function printAnswers(image_id, box_id,countryToGuess, randomCountries) {
  let img = document.querySelector(`#${image_id}`);
  let answerBox = document.querySelector(`#${box_id}`);

  img.src = countryToGuess.flags.png;
  let alphabet = 65;

  while (answerBox.firstChild) answerBox.removeChild(answerBox.firstChild);
  const ul = document.createElement("ul");
  for (let i = 0; i < randomCountries.length; i++) {
    const character = String.fromCharCode(alphabet);
    const li = document.createElement("li");
    li.textContent = `${character}) ${randomCountries[i].name.common}`;

    ul.appendChild(li);
    alphabet++;
  }

  answerBox.appendChild(ul);
}

function PrintQuestion() {
  let randomCountries = [];

  updateRandomCountries(randomCountries, countries);

  let indexCountryToGuess = Math.floor(Math.random() * randomCountries.length);
  countryToGuess = randomCountries[indexCountryToGuess];

  printAnswers("img", "answers", countryToGuess, randomCountries);

  setIsClickable(true);
  startQuestionTimer();
}

function handleClick(e) {
  if (!getIsClickable()) return;

  setIsClickable(false);
  StopQuestionTimer();
  check_answer(e.target, countryToGuess);
}

function handleAnswer() {
  let answerBox = document.querySelector('#answers');
  answerBox.removeEventListener("click", handleClick); // remove previous listener
  answerBox.addEventListener("click", handleClick); // add fresh listener
}

export {
  fetchAllCountries,
  PrintQuestion,
  printAnswers,
  handleAnswer,
  updateRandomCountries,
};

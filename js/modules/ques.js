let img = document.querySelector("img");
let answerBox = document.querySelector(".answers-box");
let containerBox = document.querySelector("#container");
let countries;

async function fetchCountries() {
  try {
    const response = await fetch(url1);
    if (!response.ok) throw new Error("Fetch Failed");
    const data = await response.json();
    countries = data;
  } catch (error) {
    console.log(error);
  }
}

function PrintQuestion() {
  let randomCountries = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * countries.length);
    let country = countries[randomIndex];

    if (!randomCountries.includes(country)) randomCountries.push(country);
  }

  let indexCountryToGuess = Math.floor(Math.random() * randomCountries.length);

  countryToGuess = randomCountries[indexCountryToGuess];

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

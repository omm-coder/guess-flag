// Elements for result display
const h1_score = document.querySelector('#total-answer');
const h2_encourage = document.querySelector('#message');
const average_span = document.querySelector('#average');
const star_span = document.querySelector('#star');

// Star rendering helper
function getStar(number) {
  star_span.innerHTML = ''; // Clear existing stars
  star_span.parentElement.style.visibility = number === 0 ? 'hidden' : 'visible';

  for (let i = 0; i < number; i++) {
    const iTag = document.createElement("i");
    iTag.classList.add("fa-solid", "fa-star");
    star_span.appendChild(iTag);
  }
}

// Function to generate message based on average score
function displayScoreMessage(average) {
  if (average <= 29) return `Try again!!`;
  else if (average >= 30 && average <= 49) return `Nice try!!!`;
  else if (average >= 50 && average <= 74) return `🫡 Good Job!!`;
  else if (average >= 75 && average <= 89) return `Excellent`;
  else return `💥 Clever!!!`;
}

// Show result popup and fill result info
function showResult(score, total_question, average) {
  // Show message based on average
  const message = displayScoreMessage(average);

  // Display scores and message in DOM
  h1_score.textContent = `${score}/${total_question}`;
  h2_encourage.textContent = message;
  average_span.textContent = `${average}%`;

  // Determine number of stars
  let number_of_star;
  if (average >= 55 && average <= 70) number_of_star = 1;
  else if (average >= 71 && average <= 85) number_of_star = 2;
  else if (average >= 86 && average <= 100) number_of_star = 3;
  else number_of_star = 0;

  getStar(number_of_star);
}

// Show the popup with result info
function showPopUp(score, total_question) {
  const popup = document.querySelector("#popup");
  popup.classList.add("show-popup");

  const average = ((score / total_question) * 100).toFixed(1);
  showResult(score, total_question, average);
}

// Exported function for external use to show popup
export { showPopUp };

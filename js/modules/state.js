// state.js
let score = 0;
let isClickable = true;

function getScore() {
  return score;
}
function countScore() {
  score++;
}
function resetScore() {
  score = 0;
}

function getIsClickable() {
  return isClickable;
}
function setIsClickable(value) {
  isClickable = value;
}

export {
  getScore,
  countScore,
  resetScore,
  getIsClickable,
  setIsClickable,
};

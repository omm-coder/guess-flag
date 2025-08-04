const checkBox_continents = document.getElementsByName("continent");
const radio_flags_number = document.getElementsByName("flags");

let numberFlags;
let selectedConntinents = [];

function getSelectedContinent() {
  for (let i = 0; i < checkBox_continents.length; i++) {
    if (checkBox_continents[i].checked) {
      selectedConntinents.push(checkBox_continents[i].value);
    }
  }
  return selectedConntinents;
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

  for (let continent of selectedConntinents) {
    const url = `https://restcountries.com/v3.1/region/${continent}?fields=name,capital,flags`;
    urls.push(url);
  }
  return urls
}

const getCountries_of_continent = async() => {
  const urls = makeUrls();
  const results = await Promise.all(urls.map(url => fetch(url).then(res => res.json())))
  const combined = results.flat();
  console.log("Combined countries:", combined.length);
  return combined.length > numberFlags;
};

const clearValues = () => {
    for(let checkBox of checkBox_continents) checkBox.checked = false;
    selectedConntinents = [];
    for(let radio_number_flag of radio_flags_number) radio_number_flag.checked = false;
    numberFlags = 0;
}

export { getSelectedContinent, getNumberFlags, getCountries_of_continent ,clearValues};

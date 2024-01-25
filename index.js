const bodyContainer = document.querySelector('.js-body');
const currencyFromContainerElement = document.querySelector('.js-currencies-from-input');
const currencyToContainerElement = document.querySelector('.js-currencies-to-input');
const amountInputElement = document.querySelector('.js-amount-input');
const currencySymbolElement = document.querySelector('.js-currency-symbol');
const convertButtonElement = document.querySelector('.js-convert-button');
let currencyContainerResultList = document.querySelectorAll('.js-currency-result');
const currencyFromContainerResultAdded = document.querySelector('.js-input-container-from-result');
const currencyToContainerResultAdded = document.querySelector('.js-input-container-to-result');
const headerElement = document.querySelector('.js-header');
const footerElement = document.querySelector('.js-convert-results');

const currencies = [{
  id: 1,
  value: 1,
  type: "USD",
  flag: "Flags/UnitedStates.svg",
  pronounce: "US DOLLARS",
  symbol: "&dollar;"
},{
  id: 2,
  value: 0.91303039,
  type: "EUR",
  flag: "Flags/Europe.svg",
  pronounce: "Euro",
  symbol: "&euro;"
},{
  id: 3,
  value:  144.91455,
  type: "JPY",
  flag: "Flags/Japan.svg",
  pronounce: "Japansese Yen",
  symbol: "&yen;"
},{
  id: 4,
  value: 82.898008,
  type: "INR",
  flag: "Flags/India.svg",
  pronounce: "Indian Rupee",
  symbol: "&#x20B9;"
},{
  id: 5,
  value: 30.901141,
  type: "EGP",
  flag: "Flags/Eygpt.svg",
  pronounce: "Egyptian Pound",
  symbol: "&pound;"
},{
  id: 6,
  value: 18.612909,
  type: "ZAR",
  flag: "Flags/SouthAfrica.svg",
  pronounce: "South African Rand",
  symbol: "R"
},{
  id: 7,
  value: 7.1623287,
  type: "CNY",
  flag: "Flags/China.svg",
  pronounce: "Chinese Yuan",
  symbol: "&yen;"
},{
  id: 8,
  value: 22.499864,
  type: "STN",
  flag: "Flags/Sao Tomean.svg",
  pronounce: "Sao Tomean Dobra",
  symbol: "Db"
},{
  id: 9,
  value: 1310.2997,
  type: "IQD",
  flag: "Flags/Iraq.svg",
  pronounce: "Iraqi Dinar",
  symbol: "ع.د"
},{
  id: 10,
  value: 10.333836,
  type: "NOK",
  flag: "Flags/Norway.svg",
  pronounce: "Norwegian Krone",
  symbol: "kr"
}];

// Default settings
currencyFromContainerElement.classList.add('hide');
currencyToContainerElement.classList.add('hide');
let fromInputResultID = 1;
let toInputResultID = 2;
let amountInput = 1;
let fromAmount;
let toAmount;
let convertAmount;
let matchedFromCurrency;
let matchedToCurrency;

convertButtonElement.addEventListener('click', () => {
  amountInputElement.value = "";
  updateSummary();
});

currencyFromContainerResultAdded.addEventListener('click', () => {
  currencyFromContainerElement.classList.remove('hide');
  currencyFromContainerResultAdded.classList.add('hide');
});

currencyToContainerResultAdded.addEventListener('click', () => {
  currencyToContainerElement.classList.remove('hide');
  currencyToContainerResultAdded.classList.add('hide');
});



function currencyInputContainerHTML () {
  let array = ['from', 'to']
  array.forEach(inputType => {
    let html = ""
    currencies.forEach(currency => {
      html += 
      `
      <li 
        class="js-currency-result"
        data-input-type="${inputType}"
        data-currency-id="${currency.id}"
      >
        <img src="${currency.flag}">
        ${currency.type}-
        <span>${currency.pronounce}</span>
      </li>
      `;
    });
  
    inputType === 'from' ? 
    currencyFromContainerElement.innerHTML = html :
    currencyToContainerElement.innerHTML = html;

  });

  currencyContainerResultList = 
  document.querySelectorAll('.js-currency-result');
}

currencyInputContainerHTML();

// Checks if there is a value in amount element,
// and if there is then convert on turns on
let amountInputTimer;
amountInputTimer = setInterval(() =>{
  if (amountInputElement.value >= 1 && 
    amountInputElement.value <= 99999999999999999) {
    convertButtonElement.classList.add('active');
    amountInput = amountInputElement.value
  } else {
    convertButtonElement.classList.remove('active');
  }
},100);


function updateMatchedCurrencyID () {
  matchedFromCurrency;
  matchedToCurrency;

  currencies.forEach(currency => {
    currency.id === fromInputResultID &&
      (matchedFromCurrency = currency)
    currency.id === toInputResultID && 
      (matchedToCurrency = currency)
  });
}

function updateInputResultHTML () {

  currencyFromContainerResultAdded.innerHTML =
  `
    <img src="${matchedFromCurrency.flag}">
    <span>${matchedFromCurrency.type}-</span>
    <span>${matchedFromCurrency.pronounce}</span>
    <img src="Icons/Down-half-tag.svg">
  `;

  currencyToContainerResultAdded.innerHTML =
  `
    <img src="${matchedToCurrency.flag}">
    <span>${matchedToCurrency.type}-</span>
    <span>${matchedToCurrency.pronounce}</span>
    <img src="Icons/Down-half-tag.svg">
  `;
}


function updateHeaderHTML () {
  const html =
  `
  ${amountInput || 0} 
  ${matchedFromCurrency.type} to 
  ${matchedToCurrency.type} - 
  ${matchedFromCurrency.pronounce} to 
  ${matchedToCurrency.pronounce}
  `

  headerElement.innerHTML = html;
}

function updateCurrencySymbol () {
  currencySymbolElement.innerHTML = 
  `${matchedFromCurrency.symbol}`;
}

function convertCurrency () {

let fromValue = matchedFromCurrency.value;
let toValue = matchedToCurrency.value;

  fromAmount = 1 / fromValue;
  toAmount = fromAmount * toValue;
  convertAmount = toAmount * amountInput;
}

function updateResultsHTML () {
  const html = `
  <p>
    ${amountInput} ${matchedFromCurrency.pronounce} =
  </p>
  <h2>
    ${convertAmount} ${matchedToCurrency.pronounce}
  </h2>
  <p>
    1 ${matchedFromCurrency.type} = 
    ${toAmount} ${matchedToCurrency.type}
  </p>
  `;

  footerElement.innerHTML = html;
}

currencyContainerResultList.forEach(result => {
  result.addEventListener('click', () => {
    const { inputType } = result.dataset;
    const { currencyId } = result.dataset;
    //const currencyId = result.dataset.currencyId;
    
    if (inputType === 'to') {
      toInputResultID = Number(currencyId);
      currencyToContainerElement.classList.add('hide');
      currencyToContainerResultAdded.classList.remove('hide');
    } else {
      fromInputResultID = Number(currencyId);
      currencyFromContainerElement.classList.add('hide');
      currencyFromContainerResultAdded.classList.remove('hide');
    }
    updateSummary();
  })
});


function updateSummary () {
  updateMatchedCurrencyID();
  updateInputResultHTML();
  updateCurrencySymbol();
  updateHeaderHTML();
  convertCurrency();
  updateResultsHTML();
}

updateSummary();

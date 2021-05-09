
let currencyFrom = 'RUB';
let currencyTo = 'USD';
let amount = 1;
let courseLeftToRight = 0;
let courseRightToLeft = 0;
const selectFrom = document.querySelector('.other-currencies-from');
const selectTo = document.querySelector('.other-currencies-to');
const selectedCurrency = selectFrom.selectedIndex;
const currencyFromChoice = document.querySelector('.currency-choice-from');
const currencyToChoice = document.querySelector('.currency-choice-to');
const currentExchangeLeft = document.querySelector('.current-exchange-rate-left');
const currentExchangeRight = document.querySelector('.current-exchange-rate-right');
const inputLeft = document.querySelector('.for-input-left');
const inputRight = document.querySelector('.for-input-right');
const forError = document.querySelector('.for-error');
let newPar = document.querySelector('.new-p');
const loadingBlock = document.querySelector(".loading-block");
let flagAPI = false;
const choiceLeft = document.querySelectorAll('.choice-left');
const choiceRight = document.querySelectorAll('.choice-right');


// ~~~~~~~~~~~~~~~~~~LEFT BLOCK!!!!!!!

currencyFromChoice.addEventListener('click', event => {
    choiceLeft.forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
    if (event.target.tagName.toLowerCase() === 'button') {
    currencyFrom = event.target.innerHTML;
    getData();

    } else {
        return;
    }
})

selectFrom.addEventListener('change', event => {
    choiceLeft.forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
    currencyFrom = document.querySelector('.other-currencies-from').value;
    getData();
})

inputLeft.addEventListener('input', event => {
    inputToCalc(event.target, inputRight, courseLeftToRight)
})

// ~~~~~~~~~~~~~~~~~~~RIGHT BLOCK!!!!!!!!

currencyToChoice.addEventListener('click', event => {
    choiceRight.forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
    if (event.target.tagName.toLowerCase() === 'button') {
    currencyTo = event.target.innerHTML;
    getData();
    } else {
        return;
    }
})

selectTo.addEventListener('change', event => {
    choiceRight.forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
    currencyTo = document.querySelector('.other-currencies-to').value;
    getData();
})

inputRight.addEventListener('input', event => {
    inputToCalc(event.target, inputLeft, courseRightToLeft)
})

// ~~~~~~~~~~~~~~~~~~~~MIDDLE ARROW!!! добавить изменение класса
document.querySelector('.middle-arrow').addEventListener('click', event => {
    let a = currencyFrom;
    let b = currencyTo;
    currencyFrom = b;
    currencyTo = a;
    let indexSelectLeft = selectFrom.selectedIndex;
    let indexSelectRight = selectTo.selectedIndex;
    selectFrom.getElementsByTagName('option')[indexSelectRight].selected = 'selected';
    selectTo.getElementsByTagName('option')[indexSelectLeft].selected = 'selected';

    choiceLeft.forEach(el => 
        el.classList.remove('active'))
    document.querySelectorAll('.button-left').forEach(el => {
        if (el.innerHTML === currencyFrom) {
            el.classList.add('active');
        } 
    })
   if (document.querySelectorAll('.left-block button.active').length === 0) {
        selectFrom.classList.add('active');
   }
    choiceRight.forEach(el => {
        el.classList.remove('active')
    })
    document.querySelectorAll('.button-right').forEach(el => {
        if (el.innerHTML === currencyTo) {
            el.classList.add('active');
        } 
    })
   if (document.querySelectorAll('.right-block button.active').length === 0) {
        selectTo.classList.add('active');
   }
    getData();
})

// ~~~~~~~~~~~~~~~~~~~FOR API!!!!!!

const getData = async () => {
    if (currencyFrom === currencyTo) {
        courseLeftToRight = 1;
        courseRightToLeft = 1;
        console.log(`I work without API...`)
        newPar.innerHTML = ``; 
    } else try {  
        showLoading();
        const response = await fetch(`https://api.ratesapi.io/api/latest?base=${currencyFrom}&symbols=${currencyTo}`);
        const data = await response.json();
        courseLeftToRight = data.rates[currencyTo];
        const response2 = await fetch(`https://api.ratesapi.io/api/latest?base=${currencyTo}&symbols=${currencyFrom}`);
        const data2 = await response2.json();
        courseRightToLeft = data2.rates[currencyFrom];
        flagAPI = true;
        console.log(`I work with API...`);
        loadingBlock.style.display = 'none';
        newPar.innerHTML = ``; 
    } catch(error) {
            newPar.innerHTML = `Что-то пошло не так...`; 
        console.log('something went wrong...', error);
    }
    currentExchangeLeft.innerHTML = `1 ${currencyFrom} = ${courseLeftToRight} ${currencyTo}`;
    currentExchangeRight.innerHTML = `1 ${currencyTo} = ${courseRightToLeft} ${currencyFrom}`;
    inputToCalc(inputLeft, inputRight, courseLeftToRight);
}

// ~~~~~~~~~~~~~~~~~~~~INPUT!!!!

function inputToCalc(el, secEl, course) {
    let stringValue = String(el.value);
    stringValue = stringValue
        .replace(/([^0-9.,])/g, '')
        .replace(/,/g, '.');
const pointIndex = stringValue.indexOf('.');
if (pointIndex !== -1) {
    const pointAndBefore = stringValue.substring(0, pointIndex + 1);
    const afterPoint = stringValue.substring(pointIndex + 1);
    stringValue = `${pointAndBefore}${afterPoint.replace(/\./g, '')}`;
}
    el.value = stringValue;
    secEl.value = (Number(stringValue) * course).toFixed(4);
}

// ~~~~~~~~~~~~~~~~~Loader!!!

const showLoading = function() {
    setTimeout(function() {
        if (!flagAPI) {
        loadingBlock.style.display = "block";
        }
    }, 500);
}

// ~~~~~~~~~~~~~~~~~~~DEFAULT!!!

getData();



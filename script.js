// GET https://api.ratesapi.io/api/2010-01-12?symbols=USD,GBP HTTP/2

// Для получения данных по курсу валют, вам нужно запросить 
// данные по валютной паре, добавив к URL-адресу два сокращения этих валют 
// (без пробелов и разделителей). Пример для пары USD и RUB:
// https://api.ratesapi.io/api/latest?base=USD&symbols=RUB
// В ответ приходит JSON с объектом. В поле rates этого объекта лежит 
// объект пар ключ-значение. По ключу RUB будет находится число — текущий курс на данный момент.
// Калькулятор с помощью элементов управления позволяет пользователю 
// выбрать две валюты и сумму конвертации. После выбора калькулятор отображает кросс-курс и итоговую сумму. 
// Предусмотреть обработку ошибок загрузки.

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
const regTest = /^[0-9]*[.,]?[0-9]+$/;


// ~~~~~~~~~~~~~~~~~~LEFT BLOCK!!!!!!!

currencyFromChoice.addEventListener('click', event => {
    document.querySelectorAll('.choice-left').forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
    if (event.target.tagName.toLowerCase() === 'button') {
    currencyFrom = event.target.innerHTML;
    getData();

    } else {
        return;
    }
    console.log(currencyFrom)
})

selectFrom.addEventListener('change', event => {
    document.querySelectorAll('.choice-left').forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
    currencyFrom = document.querySelector('.other-currencies-from').value;
    getData();
    console.log(currencyFrom)
})

// ~~~~~~~~~~~~~~~~~~~RIGHT BLOCK!!!!!!!!

currencyToChoice.addEventListener('click', event => {
    document.querySelectorAll('.choice-right').forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
    if (event.target.tagName.toLowerCase() === 'button') {
    currencyTo = event.target.innerHTML;
    getData();
    } else {
        return;
    }
    console.log(currencyTo)
})

selectTo.addEventListener('change', event => {
    document.querySelectorAll('.choice-right').forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
    currencyTo = document.querySelector('.other-currencies-to').value;
    getData();
    console.log(currencyTo)
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

    document.querySelectorAll('.choice-left').forEach(el => 
        el.classList.remove('active'))
    document.querySelectorAll('.button-left').forEach(el => {
        if (el.innerHTML === currencyFrom) {
            console.log(`I'm in if......`)
            el.classList.add('active');
        } 
    })
   if (document.querySelectorAll('.left-block button.active').length === 0) {
        selectFrom.classList.add('active');
   }
    document.querySelectorAll('.choice-right').forEach(el => {
        el.classList.remove('active')
    })
    document.querySelectorAll('.button-right').forEach(el => {
        if (el.innerHTML === currencyTo) {
            console.log(`I'm in if......`)
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
        console.log(courseLeftToRight);
        const response2 = await fetch(`https://api.ratesapi.io/api/latest?base=${currencyTo}&symbols=${currencyFrom}`);
        const data2 = await response2.json();
        courseRightToLeft = data2.rates[currencyFrom];
        console.log(courseRightToLeft);
        console.log(data, data2);
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
    inputToCalcLeft(inputLeft, inputRight, courseLeftToRight);
}

// ~~~~~~~~~~~~~~~~~~~~INPUT!!!!

// ~~~~~~~~~~~~LEFT!!!

inputLeft.addEventListener('input', event => {
    inputToCalcLeft(event.target, inputRight, courseLeftToRight)
})

function inputToCalcLeft(el, secEl, course) {
    let stringValue = String(el.value);
    console.log(stringValue, '1')
    stringValue = stringValue
        .replace(/([^0-9.,])/g, '')
        .replace(/,/g, '.');
const pointIndex = stringValue.indexOf('.');
if (pointIndex !== -1) {
    const pointAndBefore = stringValue.substring(0, pointIndex + 1);
    const afterPoint = stringValue.substring(pointIndex + 1);
    stringValue = `${pointAndBefore}${afterPoint.replace(/\./g, '')}`;
}
    console.log(stringValue)
    el.value = stringValue;
    console.log(amount, 'bu')
    secEl.value = (Number(stringValue) * course).toFixed(4);
}


// ~~~~~~~~~~RIGHT!!!

inputRight.addEventListener('input', event => {
    inputToCalcLeft(event.target, inputLeft, courseRightToLeft)
})

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



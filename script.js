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

// добавить замену класса при работе стрелки
// добавить окно загрузки
// сделать контроль ввода и отображения:
//                   замена точки на запятую  
//                   отображение 4 знаков после запятой toFixed(кол-во з) !!!
//                   разбивка по три символа при отображении в инпутах toLocaleString() ?

// При недоступности API или ошибках при выполнении запроса 
// на него приложение не зависает и не перестает работать, 
// а пользователю выводится сообщение о том, что что-то пошло не так.


// ~~~~~~~~~~~~~~~~~~LEFT BLOCK!!!!!!!


function letActiveClassForLeft() {
    currencyFromChoice.addEventListener('click', event => {
    document.querySelectorAll('.choice-left').forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
})
}

currencyFromChoice.addEventListener('click', event => {
    letActiveClassForLeft();
    if (event.target.tagName.toLowerCase() === 'button') {
    currencyFrom = event.target.innerHTML;
    getData();
    
    } else {
        return;
    }
    console.log(currencyFrom)
})

selectFrom.addEventListener('change', event => {
    letActiveClassForLeft()
    currencyFrom = document.querySelector('.other-currencies-from').value;
    getData();
    console.log(currencyFrom)
})


// ~~~~~~~~~~~~~~~~~~~RIGHT BLOCK!!!!!!!!

function letActiveClassForRight() {
    currencyToChoice.addEventListener('click', event => {
    document.querySelectorAll('.choice-right').forEach(el =>
        el.classList.remove('active'))
    event.target.classList.add('active')
})
}

currencyToChoice.addEventListener('click', event => {
    letActiveClassForRight();
    if (event.target.tagName.toLowerCase() === 'button') {
    currencyTo = event.target.innerHTML;
    getData();
    } else {
        return;
    }
    console.log(currencyTo)
})

selectTo.addEventListener('change', event => {
    letActiveClassForRight()
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
    console.log('оно почти работает... ??? select only)')
    getData();
})

// ~~~~~~~~~~~~~~~~~~~FOR API!!!!!!

const getData = async () => {
    if (currencyFrom === currencyTo) {
        courseLeftToRight = 1;
        courseRightToLeft = 1;
        console.log(`I work without API...`)
    } else {  
        const response = await fetch(`https://api.ratesapi.io/api/latest?base=${currencyFrom}&symbols=${currencyTo}`);
        const data = await response.json();
        courseLeftToRight = data.rates[currencyTo];
        console.log(courseLeftToRight);
        const response2 = await fetch(`https://api.ratesapi.io/api/latest?base=${currencyTo}&symbols=${currencyFrom}`);
        const data2 = await response2.json();
        courseRightToLeft = data2.rates[currencyFrom];
        console.log(courseRightToLeft);
        console.log(data, data2);
        console.log(`I work with API...`)
    }
    currentExchangeLeft.innerHTML = `1 ${currencyFrom} = ${courseLeftToRight} ${currencyTo}`;
    currentExchangeRight.innerHTML = `1 ${currencyTo} = ${courseRightToLeft} ${currencyFrom}`;
    inputToCalcLeft();
}
  
// ~~~~~~~~~~~~~~~~~~~~INPUT!!!!

// ~~~~~~~~~~~~LEFT!!!

inputLeft.addEventListener('input', event => {
    inputToCalcLeft()
})

function inputToCalcLeft() {
    let stringValue = String(inputLeft.value);
    console.log(stringValue, '1')
    stringValue = stringValue.replace(',', '.')
    console.log(stringValue)
    amount = Number(stringValue);
    console.log(amount, 'bu')
    inputRight.value = (amount * courseLeftToRight).toFixed(4);
}

// ~~~~~~~~~~RIGHT!!!

inputRight.addEventListener('input', event => {
    inputToCalcRight()
})

function inputToCalcRight() {
    // if замена точки на запятую
    amount = inputRight.value;
    inputLeft.value = (amount * courseRightToLeft).toFixed(4);
}

// ~~~~~~~~~~~~~~~~~Loader!!!

window.onload = function() {

    setTimeout(function() {

        document.getElementById("loading-block").style.display = "none";

    }, 500);
}

// ~~~~~~~~~~~~~~~~~~~DEFAULT!!!

getData();



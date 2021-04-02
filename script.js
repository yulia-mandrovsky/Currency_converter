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
let selectFrom = document.querySelector('.other-currencies-from');
let selectTo = document.querySelector('.other-currencies-to');
let selectedCurrency = selectFrom.selectedIndex;
let currencyFromChoice = document.querySelector('.currency-choice-from');
let currencyToChoice = document.querySelector('.currency-choice-to');

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
    } else {
        return;
    }
    console.log(currencyFrom)
})

selectFrom.addEventListener('change', event => {
    letActiveClassForLeft()
    currencyFrom = document.querySelector('.other-currencies-from').value;
    console.log(currencyFrom)
})

// ~~~~~~~~~~~~~~~~~~ FOR COURSE STRINGS!!!




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
    } else {
        return;
    }
    console.log(currencyTo)
})

selectTo.addEventListener('change', event => {
    letActiveClassForRight()
    currencyTo = document.querySelector('.other-currencies-to').value;
    console.log(currencyTo)
})


// ~~~~~~~~~~~~~~~~~~~~MIDDLE ARROW!!!
document.querySelector('.middle-arrow').addEventListener('click', event => {
    let a = currencyFrom;
    let b = currencyTo;
    currencyFrom = b;
    currencyTo = a;
    console.log('оно почти работает... но не прааильно. Доработать)')
})


`https://api.ratesapi.io/api/latest?base=${currencyFrom}&symbols=${currencyTo}`





// нужна функция которая будет менять значение currencyFrom и currencyTo
// добавлять и убирать класс эктив

// const getCurrencyCourse = async (currencyFrom, currencyTo) => {
//     let rate = 0;
//     if (currencyFrom === currencyTo) {
//         return Promise.resolve('the same');
//       }
//       const response = fetch(`https://api.ratesapi.io/api/latest?base=${CurrencyFrom}&symbols=${CurrencyTo}`);
//       const data = await response.json();
//     console.log(data);
//     }

// GetCurrencyCourse(CurrencyFrom, CurrencyTo)

// getRate(currencyFrom, currencyTo) {
//     let rate = 0;
//      if (currencyFrom === "USD" && currencyTo === "EUR") {
//           rate = 0.93;
//         return Promise.resolve(rate);
//     } else if (currencyFrom === "EUR" && currencyTo === "USD") {
//         rate = 1.08;
//         return Promise.resolve(rate);
//     } else if (currencyFrom === "EUR" && currencyTo === "EUR") {
//         rate = 1;
//         return Promise.resolve(rate);
//     } else if (currencyFrom === "USD" && currencyTo === "USD") {
//         rate = 1;
//         return Promise.resolve(rate);
//     } else {
//         return Promise.reject('Не все переданные валюты поддерживаются');
//     }
// }

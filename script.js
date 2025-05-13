const display = document.querySelector('.display');
const comma = document.querySelector('.comma');
const themeSwitcher = document.querySelector('.theme-switcher');
const themeSwitcherBtn = document.querySelector('.theme-switcher button');
const wrapper = document.querySelector('.wrapper');


let firstNum = '';
let secondNum = '';
let sign = '';
const allSigns = ['+', '-', '÷', '×'];
const numbersAndComma = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
let mode = 'dark';

function clear () {
    firstNum = '';
    secondNum = '';
    sign = '';
    display.textContent = 0;
    comma.disabled = false;
}

function countPercent (str) {
    if (str === firstNum) {
        str = firstNum / 100;
        firstNum = str;
            return setTimeout (() => {
            display.textContent = firstNum;
        }, 2);
    } else if (str === secondNum) {
        str = secondNum / 100;
        secondNum = str;
            return setTimeout (() => {
            display.textContent = secondNum;
        }, 2);
    }
}

function changeSign (str) {
    let result = str;
    
        if (str === String(firstNum)) {
            result = (+firstNum) - Number(firstNum * 2);
            firstNum = result;
        } else if (str === String(secondNum)) {
            result = (+secondNum) - Number(secondNum * 2);
            secondNum = result;
        } 
        
    return setTimeout (() => {
        display.textContent = result;
    }, 2);
}

function count () {
    let result = 0;
    switch (sign) {
        case '+':
            result = (+firstNum) + (+secondNum);
            break;
        case '-':
            result = (+firstNum) - (+secondNum);
            break;
        case '÷':
            if (secondNum === '0') {
                result = 'Error';
            } else {
            result = (+firstNum) / (+secondNum)};
            break;
        case '×':
            result = (+firstNum) * (+secondNum);
    }
    firstNum = +result.toFixed(6);
    secondNum = '';
    display.textContent = firstNum;
}

themeSwitcher.addEventListener('click', () => {
    if (mode !== 'dark') {
        wrapper.classList.remove('light');
        display.classList.remove('light');
        themeSwitcherBtn.textContent = '🌞';
        mode = 'dark';
    } else {
        wrapper.classList.add('light');
        display.classList.add('light');
        themeSwitcherBtn.textContent = '🌚';
        mode = 'light';
    }
})

document.addEventListener('click', (event) => {

    let clickedNum = event.target.textContent;
    
    function commaChange () {
        if (event.target.textContent === ',') {
            if (firstNum === '') {
                firstNum = 0;
            }
            comma.disabled = true;
            clickedNum = '.';
        }
    }

    if (event.target.textContent === 'AC') {
        clear();
    } 
    
    if (event.target.textContent === '%') {
        countPercent(display.textContent);
    } else if (event.target.textContent === '+/-') {
        changeSign(display.textContent);
    }

    if (numbersAndComma.includes(event.target.textContent) && sign === '') { 
        commaChange();
        firstNum += clickedNum;
        display.textContent = firstNum;

    } else if (numbersAndComma.includes(event.target.textContent) && sign !== '') {
        commaChange();
        secondNum += clickedNum;
        display.textContent = secondNum;

    } else if (allSigns.includes(event.target.textContent) && sign === '') {
        sign = event.target.textContent;
        comma.disabled = false;
    }

    if (event.target.textContent === '=') {
        count();
        sign = '';
    } else if (allSigns.includes(event.target.textContent) && secondNum !== '') {
        count();
        sign = event.target.textContent;
        comma.disabled = false;
    }
})
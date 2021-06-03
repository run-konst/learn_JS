'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let one = function () {
    let gameNum = 42;
    return function gameStart () {
        let playerNum = prompt('Угадай число от 1 до 100');
        while (!isNumber(playerNum) || playerNum > 100 || playerNum < 1) {
            alert('Введи число от 1 до 100!');
            playerNum = prompt('Угадай число от 1 до 100');
        }
        playerNum = Number(playerNum);
        if (playerNum === gameNum) {
            alert('Поздравляю, Вы угадали!!!');
        } else if (playerNum > gameNum) {
            alert('Загаданное число меньше');
            gameStart(); 
        } else if (playerNum < gameNum) {
            alert('Загаданное число больше');
            gameStart();  
        }
    };
};

const two = one();
two();
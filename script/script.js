'use strict';

const 
    date = new Date(),
    hello = document.querySelector('.hello'),
    today = document.querySelector('.today'),
    time = document.querySelector('.time'),
    newyear = document.querySelector('.newyear'),
    hours = date.getHours(),
    year = date.getFullYear(),
    nextYear = year + 1,
    newYearDate = new Date(`1 1 ${nextYear}`),
    daysToNewYear = Math.ceil((newYearDate.getTime() - date.getTime()) / 1000 / 3600 / 24),
    numWord = function (value, words){  
        value = Math.abs(value) % 100; 
        var num = value % 10;
        if (value > 10 && value < 20) {
            return words[2];
        }
        if (num > 1 && num < 5) {
            return words[1];
        }
        if (num === 1) {
            return words[0];
        } 
        return words[2];
    },
    setHello = (hours) => {
        if (hours >= 4 && hours < 10) {
            return 'Доброе утро';
        } else if (hours >= 10 && hours < 18) {
            return 'Добрый день';
        } else if (hours >= 18 && hours < 23) {
            return 'Добрый вечер';
        } else if ((hours === 23) || (hours >= 0 && hours < 4)) {
            return 'Доброй ночи';
        }
    };


console.log(daysToNewYear);
hello.textContent = setHello(hours);
today.textContent = date.toLocaleString('ru-RU', {weekday: "long"});
time.textContent = date.toLocaleString('en-EN', {hour: "2-digit", minute: "2-digit", second: "2-digit"});
newyear.textContent = `${numWord(hours, ['остался', 'осталось', 'осталось'])} ${daysToNewYear} ${numWord(hours, ['день', 'дня', 'дней'])}`;
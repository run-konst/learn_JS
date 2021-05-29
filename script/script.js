'use strict';

let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

money = 100;
income = 'Фриланс';
addExpenses = 'Интернет, Такси, Коммуналка';
deposit = true;
mission = 1000;
period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);

let budgetDay = money / 30;
console.log(budgetDay);
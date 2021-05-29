'use strict';

const
money = 100,
income = 'Фриланс',
addExpenses = 'Интернет, Такси, Коммуналка',
deposit = true,
mission = 1000,
period = 10,
budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);
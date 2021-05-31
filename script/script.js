'use strict';

const
money = Number(prompt('Ваш месячный доход?')),
income = 'Фриланс',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
expenses1 = prompt('Введите обязательную статью расходов'),
amount1 = Number(prompt('Во сколько это обойдется?')),
expenses2 = prompt('Введите еще одну обязательную статью расходов'),
amount2 = Number(prompt('Во сколько это обойдется?')),
budgetMonth = amount1 + amount2,
mission = 100000,
period = 10,
missionTime = Math.ceil(mission / (money - budgetMonth)),
budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log('Цель будет достигнута за ' + missionTime + ' месяцев(а)');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ' + budgetMonth + ' рублей');
console.log('Бюджет на день: ' + budgetDay + ' рублей');

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay <= 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay > 0 && budgetDay <= 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}
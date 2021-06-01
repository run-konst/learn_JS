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
    mission = 100000,
    showTypeOf = function (data) {
        return typeof data;    
    },
    getExpensesMonth = function () {
        return amount1 + amount2;
    },
    getAccumulatedMonth = function () {
        return money - getExpensesMonth();
    },
    accumulatedMonth = getAccumulatedMonth(),
    getTargetMonth = function () {
        return Math.ceil(mission / accumulatedMonth);
    },
    budgetDay = Math.floor(accumulatedMonth / 30),
    getStatusIncome = function () {
        if (budgetDay > 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (budgetDay > 600 && budgetDay <= 1200) {
            console.log('У вас средний уровень дохода');
        } else if (budgetDay >= 0 && budgetDay <= 600) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так');
        }        
    };

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log(`Расходы за месяц ${getExpensesMonth()} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(`Цель заработать ${mission} рублей`);
console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев(а)`);
console.log(`Бюджет на месяц: ${accumulatedMonth} рублей`);
console.log(`Бюджет на день: ${budgetDay} рублей`);
getStatusIncome();

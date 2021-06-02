'use strict';

let 
    money,
    expenses = [];

const 
    isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    start = function () {
        do {
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));
        money = Number(money);        
    };

start();

const    
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    showTypeOf = function (data) {
        return typeof data;    
    },
    getExpensesMonth = function () {
        let sum = 0;
        let expense;
        for (let i = 0; i < 3; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов');
            do {
                expense = prompt('Во сколько это обойдется?');
            } while (!isNumber(expense));
            expense = Number(expense); 
            sum += expense;
        }
        return sum;
    },
    expensesMonth = getExpensesMonth(),
    getAccumulatedMonth = function () {
        return money - expensesMonth;
    },
    accumulatedMonth = getAccumulatedMonth(),
    getTargetMonth = function () {
        return Math.ceil(mission / accumulatedMonth);
    },
    targetMonth = getTargetMonth(),
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
console.log(`Доход за месяц ${money} рублей`);
console.log(`Расходы за месяц ${expensesMonth} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(`Цель заработать ${mission} рублей`);
if (targetMonth >= 0) {
    console.log(`Цель будет достигнута за ${targetMonth} месяцев(а)`);    
} else {
    console.log(`Цель не будет достигнута`);    
}
console.log(`Бюджет на месяц: ${accumulatedMonth} рублей`);
console.log(`Бюджет на день: ${budgetDay} рублей`);
getStatusIncome();

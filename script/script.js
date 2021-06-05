'use strict';

let money;

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

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 0,
    budgetDay: 0,
    budgetMonth : 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let question = prompt('Введите обязательную статью расходов');
            do {
                appData.expenses[question] = +prompt('Во сколько это обойдется?');
            } while (!isNumber(appData.expenses[question]));
        }
    },
    getExpensesMonth: function () {
        for (const key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0 && appData.budgetDay <= 600) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так');
        }        
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log(`Доход за месяц ${appData.budget} рублей`);
console.log(`Расходы за месяц ${appData.expensesMonth} рублей`);
console.log(`Цель заработать ${appData.mission} рублей`);
if (appData.period >= 0) {
    console.log(`Цель будет достигнута за ${appData.period} месяцев(а)`);    
} else {
    console.log(`Цель не будет достигнута`);    
}
console.log(`Бюджет на месяц: ${appData.budgetMonth} рублей`);
console.log(`Бюджет на день: ${appData.budgetDay} рублей`);
appData.getStatusIncome();

for (const key in appData) {
    console.log(`${key}: ${appData[key]}`);
}
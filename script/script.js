'use strict';

const 
    calcBtn = document.getElementById('start'),
    plusBtnFirst = document.getElementsByTagName('btn_plus')[0],
    plusBtnSecond = document.getElementsByTagName('btn_plus')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),
    calculatedValuesCollection = document.querySelectorAll('[class$=-value]'),
    calculatedValues = Array.from(calculatedValuesCollection),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    addExpenses = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodRange = document.querySelector('.period-select');

calculatedValues.shift();
console.log(calculatedValues);
console.log(calculatedValuesCollection);

// let money;

// const 
//     isNumber = function (n) {
//         return !isNaN(parseFloat(n)) && isFinite(n);
//     },
//     capitalizeFirstLetter = function (arr) {
//         let newArr = [];
//         arr.forEach( function (element) {
//             newArr.push(element.charAt(0).toUpperCase() + element.slice(1));       
//         });
//         return newArr;
//     },
//     start = function () {
//         do {
//             money = prompt('Ваш месячный доход?');
//         } while (!isNumber(money));
//         money = Number(money);        
//     };

// start();

// let appData = {
//     budget: money,
//     income: {},
//     addIncome: [],
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     percentDeposit: 0,
//     moneyDeposit: 0,
//     mission: 100000,
//     period: 3,
//     budgetDay: 0,
//     budgetMonth : 0,
//     expensesMonth: 0,
//     targetMonth: 0,
//     asking: function () {

//         if (confirm('Есть ли у вас дополнительный источник заработка')) {
//             let question;
//             do {
//                 question = prompt('Какой у вас дополнительный заработок');
//             } while (isNumber(question) || question === null || question.trim() === '');
//             do {
//                 appData.income[question] = prompt('Сколько в месяц вы на этом зарабатываете?');
//             } while (!isNumber(appData.income[question]));
//             appData.income[question] = Number(appData.income[question]);
//         }
//         console.log(appData.income);

//         let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//         appData.addExpenses = addExpenses.toLowerCase().split(', ');
//         appData.deposit = confirm('Есть ли у вас депозит в банке?');

//         for (let i = 0; i < 2; i++) {
//             let question;
//             do {
//                 question = prompt('Введите обязательную статью расходов');
//             } while (isNumber(question) || question === null || question.trim() === '');
//             do {
//                 appData.expenses[question] = prompt('Во сколько это обойдется?');
//             } while (!isNumber(appData.expenses[question]));
//             appData.expenses[question] = Number(appData.expenses[question]);
//         }
//         console.log(appData.expenses);
//     },
//     getExpensesMonth: function () {
//         for (const key in appData.expenses) {
//             appData.expensesMonth += appData.expenses[key];
//         }
//     },
//     getBudget: function () {
//         appData.budgetMonth = appData.budget - appData.expensesMonth;
//         appData.budgetDay = appData.budgetMonth / 30;
//     },
//     getTargetMonth: function () {
//         appData.targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
//     },
//     getStatusIncome: function () {
//         if (appData.budgetDay > 1200) {
//             console.log('У вас высокий уровень дохода');
//         } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
//             console.log('У вас средний уровень дохода');
//         } else if (appData.budgetDay >= 0 && appData.budgetDay <= 600) {
//             console.log('К сожалению у вас уровень дохода ниже среднего');
//         } else {
//             console.log('Что то пошло не так');
//         }        
//     },
//     getInfoDeposit: function () {
//         if (appData.deposit) {
//             do {
//                 appData.percentDeposit = prompt('Какой годовой процент?');
//             } while (!isNumber(appData.percentDeposit));
//             appData.percentDeposit = Number(appData.percentDeposit);
//             do {
//                 appData.moneyDeposit = prompt('Какая сумма заложена?');
//             } while (!isNumber(appData.moneyDeposit));
//             appData.moneyDeposit = Number(appData.moneyDeposit);            
//         }        
//     },
//     calcSavedMoney: function () {
//         return appData.budgetMonth * appData.period;
//     }

// };

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getInfoDeposit();

// console.log(`Доход за месяц ${appData.budget} рублей`);
// console.log(`Расходы за месяц ${appData.expensesMonth} рублей`);
// console.log(`Цель заработать ${appData.mission} рублей`);
// if (appData.targetMonth >= 0) {
//     console.log(`Цель будет достигнута за ${appData.targetMonth} месяцев(а)`);    
// } else {
//     console.log(`Цель не будет достигнута`);    
// }
// console.log(`Бюджет на месяц: ${appData.budgetMonth} рублей`);
// console.log(`Бюджет на день: ${appData.budgetDay} рублей`);
// appData.getStatusIncome();

// console.log(`Add expenses: ${capitalizeFirstLetter(appData.addExpenses).join(', ')}`);

// for (const key in appData) {
//     console.log(`${key}: ${appData[key]}`);
// }
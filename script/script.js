'use strict';

const 
    calcBtn = document.getElementById('start'),
    //Input
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),
    plusBtnIncome = document.getElementsByTagName('button')[0],
    addExpensesItems = document.querySelector('.additional_expenses-item'),
    plusBtnExpenses = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    //Output
    budgetMonth = document.getElementsByClassName('budget_month-value')[0],
    budgetDay = document.getElementsByClassName('budget_day-value')[0],
    expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonth = document.getElementsByClassName('target_month-value')[0];

let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');

const 
    isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    capitalizeFirstLetter = function (arr) {
        let newArr = [];
        arr.forEach( function (element) {
            newArr.push(element.charAt(0).toUpperCase() + element.slice(1));       
        });
        return newArr;
    },
    validate = function () {
        const numFields = document.querySelectorAll('[placeholder="Сумма"]');
        numFields.forEach(function (elem) {
            elem.addEventListener('input', function(){
                elem.value = elem.value.replace(/[^0-9]/g, "");
            });
        });
        const stringFields = document.querySelectorAll('[placeholder="Наименование"]');    
        stringFields.forEach(function (elem) {
            elem.addEventListener('input', function(){
                elem.value = elem.value.replace(/[^а-яА-ЯёЁ\s.,]/g, "");
            });  
        });  
    };

validate();

let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    budgetDay: 0,
    budgetMonth : 0,
    incomeMonth: 0,
    expensesMonth: 0,
    targetMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        appData.budget = Number(salaryAmount.value);
        appData.getExpenses();
        appData.getIncome();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.getTargetMonth();
        appData.showResults();
        appData.getStatusIncome();
    },
    addExpensesBlock: function () {
        let clonedExpensesItem = expensesItems[0].cloneNode(true);
        clonedExpensesItem.querySelector('.expenses-title').value = '';
        clonedExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(clonedExpensesItem, plusBtnExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        validate();
        if (expensesItems.length === 3) {
            plusBtnExpenses.style.display = 'none';            
        }      
    },
    getExpenses: function () {  
        expensesItems.forEach(function (item) {
            let expensesTitle = item.querySelector('.expenses-title').value;
            let expensesAmount = item.querySelector('.expenses-amount').value;
            appData.expenses[expensesTitle] = Number(expensesAmount);
        });
        for (const key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    addIncomeBlock: function () {
        let clonedIncomeItem = incomeItems[0].cloneNode(true);
        clonedIncomeItem.querySelector('.income-title').value = '';
        clonedIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(clonedIncomeItem, plusBtnIncome);
        incomeItems = document.querySelectorAll('.income-items');
        validate();
        if (incomeItems.length === 3) {
            plusBtnIncome.style.display = 'none';            
        }      
    },
    getIncome: function () {  
        incomeItems.forEach(function (item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            appData.income[incomeTitle] = Number(incomeAmount);
        });
        for (const key in appData.income) {
            appData.incomeMonth += appData.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = addExpensesItems.value.toLowerCase().split(',');
        let someArr = [];
        addExpenses.forEach(function (elem) {
            elem = elem.trim();
            if (elem !== '') {
                someArr.push(elem);                
            }
        });
        appData.addExpenses = capitalizeFirstLetter(someArr);
    },
    getAddIncome: function () {
        let someArr = [];
        addIncomeItems.forEach(function (elem) {
            elem = elem.value.trim();
            if (elem !== '') {
                someArr.push(elem);                
            }          
        });
        appData.addIncome = capitalizeFirstLetter(someArr);
    },
    showResults: function () {
        budgetMonth.value = appData.budgetMonth;
        budgetDay.value = appData.budgetDay;
        expensesMonth.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(', ');
        addIncomeValue.value = appData.addIncome.join(', ');
        targetMonth.value = appData.targetMonth;
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcSavedMoney();            
        });
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        appData.targetMonth = Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelect.value;
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
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?');
            } while (!isNumber(appData.percentDeposit));
            appData.percentDeposit = Number(appData.percentDeposit);
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            } while (!isNumber(appData.moneyDeposit));
            appData.moneyDeposit = Number(appData.moneyDeposit);            
        }        
    }
};

calcBtn.addEventListener('click', appData.start);
plusBtnExpenses.addEventListener('click', appData.addExpensesBlock);
plusBtnIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
});
salaryAmount.addEventListener('change', function () {
    if (salaryAmount.value === '') {
        calcBtn.disabled = true;
    } else {
        calcBtn.disabled = false;
    }
});
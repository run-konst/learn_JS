'use strict';

const 
    calcBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    textFields = document.querySelectorAll('input[type=text]'),
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
    isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n),
    capitalizeFirstLetter = (arr) => {
        let newArr = [];
        arr.forEach(element => {
            newArr.push(element.charAt(0).toUpperCase() + element.slice(1));       
        });
        return newArr;
    },
    validate = () => {
        const numFields = document.querySelectorAll('[placeholder="Сумма"]');
        numFields.forEach(elem => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^0-9]/g, "");
            });
        });
        const stringFields = document.querySelectorAll('[placeholder="Наименование"]');    
        stringFields.forEach(elem => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^а-яА-ЯёЁ\s.,]/g, "");
            });  
        });
    };

validate();

class AppData {
    constructor() {
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonth = 0;
        this.expensesMonth = 0;
        this.targetMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }
    start() {
        this.budget = Number(salaryAmount.value);
        this.getExpenses();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getTargetMonth();
        this.showResults();
        this.blockInputs();
        this.getStatusIncome();
        this.showCancelBtn();
    }
    reset() {
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonth = 0;
        this.expensesMonth = 0;
        this.targetMonth = 0;
        this.resetInputs();
        this.resetHTML();
        this.showStartBtn();        
    }
    addExpensesBlock() {
        let clonedExpensesItem = expensesItems[0].cloneNode(true);
        clonedExpensesItem.querySelector('.expenses-title').value = '';
        clonedExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(clonedExpensesItem, plusBtnExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        validate();
        if (expensesItems.length === 3) {
            plusBtnExpenses.style.display = 'none';            
        }  
    }
    getExpenses() {  
        expensesItems.forEach(item => {
            let expensesTitle = item.querySelector('.expenses-title').value;
            let expensesAmount = item.querySelector('.expenses-amount').value;
            this.expenses[expensesTitle] = Number(expensesAmount);
        });
        for (const key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }
    addIncomeBlock() {
        let clonedIncomeItem = incomeItems[0].cloneNode(true);
        clonedIncomeItem.querySelector('.income-title').value = '';
        clonedIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(clonedIncomeItem, plusBtnIncome);
        incomeItems = document.querySelectorAll('.income-items');
        validate();
        if (incomeItems.length === 3) {
            plusBtnIncome.style.display = 'none';            
        }    
    }
    getIncome () {  
        incomeItems.forEach(item => {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            this.income[incomeTitle] = Number(incomeAmount);
        });
        for (const key in this.income) {
            this.incomeMonth += this.income[key];
        }
    }
    getAddExpenses() {
        let addExpenses = addExpensesItems.value.toLowerCase().split(',');
        let someArr = [];
        addExpenses.forEach(elem => {
            elem = elem.trim();
            if (elem !== '') {
                someArr.push(elem);                
            }
        });
        this.addExpenses = capitalizeFirstLetter(someArr);
    }
    getAddIncome() {
        let someArr = [];
        addIncomeItems.forEach(elem => {
            elem = elem.value.trim();
            if (elem !== '') {
                someArr.push(elem);                
            }          
        });
        this.addIncome = capitalizeFirstLetter(someArr);
    }
    showResults() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonth.value = this.targetMonth;
        incomePeriodValue.value = this.calcSavedMoney();
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        this.targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    changePeriod() {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.calcSavedMoney();
    }
    blockInputs() {        
        const textFields = document.querySelectorAll('input[type=text]');
        textFields.forEach(item => {
            item.disabled = true;            
        });
        plusBtnExpenses.disabled = true;
        plusBtnIncome.disabled = true;
        depositCheckbox.disabled = true;
    }
    resetInputs() {
        textFields.forEach(item => {
            item.disabled = false;
            item.value = '';    
        });
        plusBtnExpenses.disabled = false;
        plusBtnIncome.disabled = false;
        depositCheckbox.disabled = false;       
    }
    resetHTML() {
        plusBtnExpenses.style.display = 'block';
        plusBtnIncome.style.display = 'block';
        if (expensesItems[1]) {
            expensesItems[1].remove();
        }
        if (expensesItems[2]) {
            expensesItems[2].remove();            
        }
        if (incomeItems[1]) {
            incomeItems[1].remove();            
        }
        if (incomeItems[2]) {
            incomeItems[2].remove();            
        }      
    }
    showCancelBtn() {
        calcBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
    }
    showStartBtn() {
        calcBtn.style.display = 'block';
        cancelBtn.style.display = 'none';
        calcBtn.disabled = true;
    }
    getStatusIncome() {
        if (this.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
            console.log('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0 && this.budgetDay <= 600) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так');
        }
    }
    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?');
            } while (!isNumber(this.percentDeposit));
            this.percentDeposit = Number(this.percentDeposit);
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?');
            } while (!isNumber(this.moneyDeposit));
            this.moneyDeposit = Number(this.moneyDeposit);            
        }
    }
    eventListeners() {
        calcBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        plusBtnExpenses.addEventListener('click', this.addExpensesBlock);
        plusBtnIncome.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.changePeriod.bind(this));
        salaryAmount.addEventListener('input', () => {
            salaryAmount.value === '' ? calcBtn.disabled = true : calcBtn.disabled = false;
        });
    }
}

const appData = new AppData();
appData.eventListeners();

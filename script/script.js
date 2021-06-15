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
        this.getExpInc();
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
    addBlock() {
        const startStr = this.className.split(' ')[1].split('_')[0];
        const items = document.querySelectorAll(`.${startStr}-items`);
        const clonedItem = items[0].cloneNode(true);
        clonedItem.querySelector(`.${startStr}-title`).value = '';
        clonedItem.querySelector(`.${startStr}-amount`).value = '';
        items[0].parentNode.insertBefore(clonedItem, this);
        validate();
        if (items.length === 2) {
            this.style.display = 'none';
        }
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems = document.querySelectorAll('.income-items');  
    }
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            this[startStr][itemTitle] = Number(itemAmount);
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += this.income[key];
        }
        for (const key in this.expenses) {
            this.expensesMonth += this.expenses[key];
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
            elem = elem.value.toLowerCase().trim();
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

        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
        }

        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
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
        plusBtnExpenses.addEventListener('click', this.addBlock);
        plusBtnIncome.addEventListener('click', this.addBlock);
        periodSelect.addEventListener('input', this.changePeriod.bind(this));
        salaryAmount.addEventListener('input', () => {
            salaryAmount.value === '' ? calcBtn.disabled = true : calcBtn.disabled = false;
        });
    }
}

const appData = new AppData();
appData.eventListeners();
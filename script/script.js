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
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
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
        depositPercent.addEventListener('input', () => {
            depositPercent.value = depositPercent.value.replace(/[^0-9]/g, "");
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
        this.getAddExpInc();
        this.getInfoDeposit();
        this.getBudget();
        this.getTargetMonth();
        this.showResults();
        this.blockInputs();
        this.getStatusIncome();
        this.showCancelBtn();
        this.saveToStorage();
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
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.resetInputs();
        this.resetHTML();
        this.showStartBtn();
        localStorage.clear();
        this.deleteCookies();
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
    getAddExpInc() {
        const foo = (arr) => {
            let someArr = [];
            arr.forEach(elem => {
                elem = elem.trim();
                if (elem !== '') {
                    someArr.push(elem);
                }
            });
            return capitalizeFirstLetter(someArr);
        };
        let addExpenses = addExpensesItems.value.toLowerCase().split(',');
        let addIncome = [];
        addIncomeItems.forEach(element => {
            addIncome.push(element.value);            
        });
        this.addIncome = foo(addIncome);
        this.addExpenses = foo(addExpenses);
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
        const depositMonth = Math.ceil(this.moneyDeposit * (this.percentDeposit / 100));
        this.budgetMonth = this.budget + this.incomeMonth + depositMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        this.targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    getPercent() {
        const percent = this.value;
        if (percent === 'other') {
            depositPercent.disabled = false;            
        } else {
            depositPercent.disabled = true; 
            depositPercent.value = percent;
        }
    }
    checkDeposit() {
        if (depositCheckbox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            depositPercent.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.getPercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.getPercent);
        }
        this.checkCalcStatus();
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.moneyDeposit = depositAmount.value;
            this.percentDeposit = depositPercent.value;
        }
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
        depositBank.disabled = true;
    }
    resetInputs() {
        textFields.forEach(item => {
            item.disabled = false;
            item.value = '';    
        });
        plusBtnExpenses.disabled = false;
        plusBtnIncome.disabled = false;
        depositCheckbox.disabled = false;
        depositBank.disabled = false;
        depositBank.value = '';
        depositPercent.disabled = true;
    }
    resetHTML() {
        plusBtnExpenses.style.display = 'block';
        plusBtnIncome.style.display = 'block';
        depositCheckbox.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';

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
    checkCalcStatus() {
        if (salaryAmount.value === '') {
            calcBtn.disabled = true;
        } else if (this.deposit && (depositAmount.value === '' || depositPercent.value === '' || depositPercent.value < 1 || depositPercent.value > 100)) {
            calcBtn.disabled = true;
        } else {
            calcBtn.disabled = false;
        }
    }
    eventListeners() {
        calcBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        plusBtnExpenses.addEventListener('click', this.addBlock);
        plusBtnIncome.addEventListener('click', this.addBlock);
        periodSelect.addEventListener('input', this.changePeriod.bind(this));
        salaryAmount.addEventListener('input', this.checkCalcStatus.bind(this));
        depositAmount.addEventListener('input', this.checkCalcStatus.bind(this));
        depositBank.addEventListener('change', this.checkCalcStatus.bind(this));
        depositPercent.addEventListener('input', this.checkCalcStatus.bind(this));
        depositPercent.addEventListener('input', () => {if (depositPercent.value > 100) {
            alert('Процент депозита не может быть больше 100');
            depositPercent.value = '';         
        }});
        depositCheckbox.addEventListener('change', this.checkDeposit.bind(this));
    }
    saveToStorage() {
        document.cookie = `budgetMonth=${budgetMonth.value}; max-age=3600`;
        document.cookie = `budgetDay=${budgetDay.value}; max-age=3600`;
        document.cookie = `expensesMonth=${expensesMonth.value}; max-age=3600`;
        document.cookie = `addExpensesValue=${addExpensesValue.value}; max-age=3600`;
        document.cookie = `addIncomeValue=${addIncomeValue.value}; max-age=3600`;
        document.cookie = `targetMonth=${targetMonth.value}; max-age=3600`;
        document.cookie = `incomePeriodValue=${incomePeriodValue.value}; max-age=3600`;
        localStorage.budgetMonth = budgetMonth.value;
        localStorage.budgetDay = budgetDay.value;
        localStorage.expensesMonth = expensesMonth.value;
        localStorage.addExpensesValue = addExpensesValue.value;
        localStorage.addIncomeValue = addIncomeValue.value;
        localStorage.targetMonth = targetMonth.value;
        localStorage.incomePeriodValue = incomePeriodValue.value;
    }
    loadFromStorage() {
        budgetMonth.value = localStorage.budgetMonth;
        budgetDay.value = localStorage.budgetDay;
        expensesMonth.value = localStorage.expensesMonth;
        addExpensesValue.value = localStorage.addExpensesValue;
        addIncomeValue.value = localStorage.addIncomeValue;
        targetMonth.value = localStorage.targetMonth;
        incomePeriodValue.value = localStorage.incomePeriodValue;
        this.budgetMonth = localStorage.budgetMonth;
    }
    deleteCookies() {
        document.cookie = `budgetMonth=${budgetMonth.value}; max-age=0`;
        document.cookie = `budgetDay=${budgetDay.value}; max-age=0`;
        document.cookie = `expensesMonth=${expensesMonth.value}; max-age=0`;
        document.cookie = `addExpensesValue=${addExpensesValue.value}; max-age=0`;
        document.cookie = `addIncomeValue=${addIncomeValue.value}; max-age=0`;
        document.cookie = `targetMonth=${targetMonth.value}; max-age=0`;
        document.cookie = `incomePeriodValue=${incomePeriodValue.value}; max-age=0`;
    }
    checkCookies() {
        const cookies = document.cookie.split('; ');
        let cookieNames = [];
        let storageNames = [];
        cookies.forEach(cookie => {
            const cookieName = cookie.replace(/=(.+)?/, '');
            cookieNames.push(cookieName);
        });
        for (const key in localStorage) {
            if (Object.hasOwnProperty.call(localStorage, key)) {
                storageNames.push(key);                
            }
        }
        const cookiesSet = new Set(cookieNames);
        console.log(cookiesSet);
        storageNames.forEach(item => {
            if (!cookiesSet.has(item)) {
                console.log(item);
                this.reset();
            }
        });
    }
    init() {
        this.eventListeners();
        if (localStorage.length) {
            this.loadFromStorage();
            this.blockInputs();
            this.showCancelBtn();
            this.checkCookies();     
        }
    }
}

const appData = new AppData();
appData.init();
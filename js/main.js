'use strict';

let startButton = document.getElementById('start');
let resetButton = document.getElementById('cancel');
let incomeAdd = document.querySelector('.income_add');
let expensesAdd = document.querySelector('.expenses_add');
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let budgetMonthValue = document.querySelector('.budget_month-value');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();        
    this.getExprensesMonth();
    this.getIncomeMonth();
    // this.getInfoDeposit();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
};
AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    targetMonthValue.value = this.incomeMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if (expensesItems.length === 3){
        expensesAdd.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (cashExpenses !== '' && itemExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    
    if (incomeItems.length === 3){
        incomeAdd.style.display = 'none';
    }
};
AppData.prototype.getIncome = function() {
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (cashIncome !== '' && itemIncome !== ''){
            this.income[itemIncome] = cashIncome;
        }
    });
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== ''){
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExprensesMonth = function() {
    for (let key in this.expenses){
        this.expensesMonth += parseFloat(this.expenses[key]);
    }
};
AppData.prototype.getIncomeMonth = function() {
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth/30);
};
AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
        return('У Вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
        return('У Вас средний уровень дохода');
    } else if (this.budgetDay >=0) {
        return('К сожалению у Вас уровень дохода ниже среднего');
    } else {
        return('Что то пошло не так');
    }
};
// AppData.prototype.getInfoDeposit = function() {
//     if(this.deposit){
//         do {
//             this.percentDeposit = prompt('Какой у вас годовой процент?', '10');
//         } while (!this.isNumber(this.percentDeposit));
//         do {
//             this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
//         } while (!this.isNumber(this.moneyDeposit));
//     }
// };
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function() {
    this.disabledData();
    let typeTextListAll = document.querySelectorAll('[type="text"]');
    typeTextListAll.forEach((item) => {
        item.value = '';
    });
    
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    
    incomeItems.forEach((item, index) => {
        if (index !== 0) {
            item.parentNode.removeChild(item);
        }
    });

    expensesItems.forEach((item, index) => {
        if (index !== 0) {
            item.parentNode.removeChild(item);
        }
    });
};
AppData.prototype.disabledData = function() {
    let data = document.querySelector('.data');
    let typeTextList = data.querySelectorAll('[type="text"]');
    typeTextList.forEach((item) => {
        item.disabled ? item.disabled = false : item.disabled = true;
    });
    if (!periodSelect.disabled) {
        periodSelect.disabled = true;
        expensesAdd.style.display = 'none';
        incomeAdd.style.display = 'none';
    } else {
        periodSelect.disabled = false;
        expensesAdd.style.display = 'inline-block';
        incomeAdd.style.display = 'inline-block';
    }
};
AppData.prototype.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
AppData.prototype.eventsListeners = function() {
    startButton.addEventListener('click', () => {
        if (salaryAmount.value !== ''){
            this.start();
            this.disabledData();
            startButton.style.display = 'none';
            resetButton.style.display = 'inline-block';
        }
    });

    resetButton.addEventListener('click', () => {
        this.reset();
        startButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });

    expensesAdd.addEventListener('click', this.addExpensesBlock);
    incomeAdd.addEventListener('click', this.addIncomeBlock);

    periodSelect.addEventListener('input', () => {
        periodAmount.textContent = periodSelect.value;
        if (incomePeriodValue.value !== ''){
            this.showResult();
        }
    });
};

let appData = new AppData();
appData.eventsListeners();
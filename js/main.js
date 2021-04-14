'use strict';

let startButton = document.getElementById('start');
let incomeAdd = document.querySelector('.income_add');
let expensesAdd = document.querySelector('.expenses_add');
let depositCheck = document.querySelector('#deposit-check')
let additionalIncomeItem = document.querySelectorAll('.additional_income-item')
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

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: () => {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();        
        appData.getExprensesMonth();
        appData.getIncomeMonth();
        appData.getInfoDeposit();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: () => {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        targetMonthValue.value = appData.incomeMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    addExpensesBlock: () => {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if (expensesItems.length === 3){
            expensesAdd.style.display = 'none';
        }
    },
    getExpenses: () => {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (cashExpenses !== '' && itemExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: () => {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        
        if (incomeItems.length === 3){
            incomeAdd.style.display = 'none';
        }
    },
    getIncome: () => {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (cashIncome !== '' && itemIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });
    },
    getAddExpenses: () => {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: () => {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExprensesMonth: function(){
        for (let key in appData.expenses){
            appData.expensesMonth += parseFloat(appData.expenses[key]);
        }
    },
    getIncomeMonth: function(){
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return('У Вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600) {
            return('У Вас средний уровень дохода');
        } else if (appData.budgetDay >=0) {
            return('К сожалению у Вас уровень дохода ниже среднего');
        } else {
            return('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do {
                appData.percentDeposit = prompt('Какой у вас годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * periodSelect.value;
    }
};

startButton.addEventListener('click', () => {
    if (salaryAmount.value !== ''){
        appData.start();
    }
});
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
    appData.showResult();
});
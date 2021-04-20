'use strict';

const startButton = document.getElementById('start');
const resetButton = document.getElementById('cancel');
const incomeAdd = document.querySelector('.income_add');
const expensesAdd = document.querySelector('.expenses_add');
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const budgetMonthValue = document.querySelector('.budget_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
    constructor() {
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
    }
    start() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();        
        this.getExprensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        targetMonthValue.value = this.incomeMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    }
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if (expensesItems.length === 3){
            expensesAdd.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (cashExpenses !== '' && itemExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        
        if (incomeItems.length === 3){
            incomeAdd.style.display = 'none';
        }
    }
    getIncome() {
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (cashIncome !== '' && itemIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
        });
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== ''){
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
    getExprensesMonth() {
        for (let key in this.expenses){
            this.expensesMonth += parseFloat(this.expenses[key]);
        }
    }
    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    reset() {
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
    }
    disabledData() {
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
    }
    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    eventsListeners() {
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
    }
}

let appData = new AppData();
appData.eventsListeners();
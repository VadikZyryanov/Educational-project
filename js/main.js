'use strict';

const startButton = document.getElementById('start');
const incomeAdd = document.querySelector('.income_add');
const expensesAdd = document.querySelector('.expenses_add');
const depositCheck = document.querySelector('#deposit-check')
const additionalIncomeItem = document.querySelectorAll('.additional_income-item')
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const budgetMonthValue = document.querySelector('.budget_month-value');
const salaryTitle = document.querySelector('.salary-title');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');


let money = 100000;

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let start = () => {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};
start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function(){
        let itemIncome, cashIncome, month, expenses;
        if(confirm('Есть ли у Вас дополнительный заработок?')){
            do {
                itemIncome = prompt('Какой у Вас есть дополнительный заработок?', 'Таксую');
            } while (isNumber(itemIncome));
            do {
                cashIncome = prompt('Сколько в месяц зарабатываете на этом?', '10000');
                this.income[itemIncome] = cashIncome;
            } while (!isNumber(cashIncome));
        }

        
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, бензин, клубы');
        addExpenses = addExpenses.split(', ');
        addExpenses.forEach((item, i) => {
            item = item.charAt(0).toUpperCase() +  item.slice(1);
            addExpenses[i] = item;
        });
        this.addExpenses = addExpenses.join(', ');
        
        for (let i = 0; i < 2; i++) {
            do {
                expenses = prompt('Введите обязательную статью расходов?');
            } while (isNumber(expenses));
            do {
                month = prompt('Во сколько это обойдется?');
            } while (!isNumber(month));
            this.expenses[expenses] = month;
        }

        this.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExprensesMonth: function(){
        for (let key in this.expenses){
            this.expensesMonth += parseFloat(this.expenses[key]);
        }
    },
    getBudget: function(){
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    },
    getTargetMonth: function(){
        return Math.ceil(this.mission / this.budgetMonth);
    },
    getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
            return('У Вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return('У Вас средний уровень дохода');
        } else if (this.budgetDay >=0) {
            return('К сожалению у Вас уровень дохода ниже среднего');
        } else {
            return('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do {
                this.percentDeposit = prompt('Какой у вас годовой процент?', '10');
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            } while (!isNumber(this.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return this.budgetMonth * this.period;
    }
};

appData.asking();
appData.getExprensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log('Возможные расходы:', appData.addExpenses);
console.log('Расходы за месяц:', appData.expensesMonth);
appData.getTargetMonth() > 0 
    ? console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)')
    : console.log('Цель не будет достигнута');
console.log(appData.getStatusIncome());

// console.log('Наша программа включает в себя данные: ');
// for (let key in appData){
//     console.log('Свойство: ' + key + ' Значение: ', appData[key]);
// }
'use strict';

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
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Бензин, Клубы');
        let month;
        this.addExpenses = addExpenses.toLowerCase().split(', ');
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let expenses = prompt('Введите обязательную статью расходов?');
            do {
                month = prompt('Во сколько это обойдется?');
            } while (!isNumber(month));
            this.expenses[expenses] = month;
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
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
};

appData.asking();
appData.getExprensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);
appData.getTargetMonth() > 0 
    ? console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)')
    : console.log('Цель не будет достигнута');
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let key in appData){
    console.log('Свойство: ' + key + ' Значение: ', appData[key]);
}
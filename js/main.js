'use strict';

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let money = 100000;
let income = 'Вклад в банке';
let addExpenses = 'Еда, Зал, Интернет, Заправка';
let deposit = true;
let mission = 123456789;
let period = 8;

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Бензин, Клубы');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses = [];

let start = () => {
    // money = prompt('Ваш месячный доход?');
    // while (!isNumber(money)) {
    //     money = prompt('Ваш месячный доход?', '45000');
    // }
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
}
start();

function getExprensesMonth(){
    let sum = 0;
    let amount;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        do {
            amount = prompt('Во сколько это обойдется?');
        } while (!isNumber(amount));
        sum += parseFloat(amount);
    }
    return sum;
};
let expensesAmount = getExprensesMonth();


function getAccumulatedMonth(a, b){
    return a - b;
};
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

function getTargetMonth(a, b){
    return Math.ceil(a / b);
};
let missionCompleted = getTargetMonth(mission, accumulatedMonth);
let budgetDay = Math.floor(accumulatedMonth/30);

function showTypeOf(data){
    console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(expensesAmount);
console.log(addExpenses.split(', '));
missionCompleted > 0 
    ? console.log('Цель будет достигнута за ' + missionCompleted + ' месяцев(-а)')
    : console.log('Цель не будет достигнута');
console.log('Бюджет на день: ' + budgetDay + ' рублей');

function getStatusIncome(){
    if (budgetDay >= 1200) {
        return('У Вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return('У Вас средний уровень дохода');
    } else if (budgetDay >=0) {
        return('К сожалению у Вас уровень дохода ниже среднего');
    } else {
        return('Что то пошло не так');
    }
};
console.log(getStatusIncome());
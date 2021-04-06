'use strict';

let money = 100000;
let income = 'Вклад в банке';
let addExpenses = 'Еда, Зал, Интернет, Заправка';
let deposit = true;
let mission = 123456789;
let period = 8;

money = +prompt('Ваш месячный доход?', '45000');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Бензин, Клубы');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?', 'Кварплата');
let amount1 = +prompt('Во сколько это обойдется?', '5000');
let expenses2 = prompt('Введите обязательную статью расходов?', 'Питание');
let amount2 = +prompt('Во сколько это обойдется?', '10000');

function getExprensesMonth(a, b){
    return a + b;
};

function getAccumulatedMonth(a, b){
    return a - b;
};
let accumulatedMonth = getAccumulatedMonth(money, getExprensesMonth(amount1, amount2));

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

console.log(getExprensesMonth(amount1, amount2));
console.log(addExpenses.split(', '));
console.log('Цель будет достигнута за ' + missionCompleted + ' месяцев(-а)');
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
'use strict';

let money = 100000;
let income = 'Вклад в банке';
let addExpenses = 'Еда, Зал, Интернет, Заправка';
let deposit = true;
let mission = 123456789;
let period = 8;

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// Еда, кварплата, бильярд, спортзал
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - (amount1 + amount2);
let missionCompleted = Math.ceil(mission/budgetMonth);
let budgetDay = Math.floor(budgetMonth/30);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses);
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ' + budgetMonth + ' рублей');
console.log('Цель будет достигнута за ' + missionCompleted + ' месяцев(-а)')
console.log('Бюджет на день: ' + budgetDay + ' рублей');

if (budgetDay >= 1200) {
    console.log('У Вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У Вас средний уровень дохода');
} else if (budgetDay >=0) {
    console.log('К сожалению у Вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}
const money = 100000;
const income = 'Вклад в банке';
const addExpenses = 'Еда, Зал, Интернет, Заправка';
const deposit = true;
const mission = 123456789;
const period = 8;
let budgetDay;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period +  ' месяцев');
console.log('Цель заработать ' + mission +  ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay = money/30);
'use strict';

const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');

books.prepend(book[2]);
books.prepend(book[5]);
books.prepend(book[3]);
books.prepend(book[4]);
books.prepend(book[0]);
books.prepend(book[1]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

const link = book[4].getElementsByTagName('a')[0];
link.textContent = 'Книга 3. this и Прототипы Объектов';

const adv = document.querySelector('.adv');
adv.remove('adv');

const blank0 = book[0].getElementsByTagName('ul')[0];
const blanks0 = book[0].getElementsByTagName('li');
blank0.prepend(blanks0[10]);
blank0.prepend(blanks0[3]);
blank0.prepend(blanks0[10]);
blank0.prepend(blanks0[9]);
blank0.prepend(blanks0[8]);
blank0.prepend(blanks0[8]);
blank0.prepend(blanks0[10]);
blank0.prepend(blanks0[10]);
blank0.prepend(blanks0[10]);
blank0.prepend(blanks0[10]);
blank0.prepend(blanks0[10]);

const blank5 = book[5].getElementsByTagName('ul')[0];
const blanks5 = book[5].getElementsByTagName('li');
blank5.prepend(blanks5[10]);
blank5.prepend(blanks5[9]);
blank5.prepend(blanks5[7]);
blank5.prepend(blanks5[9]);
blank5.prepend(blanks5[9]);
blank5.prepend(blanks5[7]);
blank5.prepend(blanks5[9]);
blank5.prepend(blanks5[9]);
blank5.prepend(blanks5[10]);
blank5.prepend(blanks5[10]);
blank5.prepend(blanks5[10]);

const blanks2 = book[2].getElementsByTagName('li');
const newBlanks = document.createElement('li');
newBlanks.textContent = 'Глава 8: За пределами ES6';
blanks2[8].after(newBlanks);

'use strict';

const 
    container = document.querySelector('.books'),
    books = document.querySelectorAll('.book'),
    thirdBookTitle = books[4].querySelector('h2 a'),
    adv = document.querySelector('.adv'),
    secondBookElems = books[0].querySelectorAll('li'),
    fifthBookElems = books[5].querySelectorAll('li'),
    sixthBookElems = books[2].querySelectorAll('li');

container.prepend(books[1]);
container.append(books[2]);
books[4].after(books[3]);

document.body.style.backgroundImage = 'url("image/you-dont-know-js.jpg")';

thirdBookTitle.textContent = 'Книга 3. this и Прототипы Объектов';

adv.remove();

secondBookElems[3].after(secondBookElems[6]);
secondBookElems[6].after(secondBookElems[8]);
secondBookElems[9].after(secondBookElems[2]);

fifthBookElems[4].after(fifthBookElems[2]);
fifthBookElems[7].after(fifthBookElems[5]);
fifthBookElems[1].after(fifthBookElems[9]);

const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';
sixthBookElems[8].after(newChapter);
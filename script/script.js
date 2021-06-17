window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // Timer

    const
        timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        addZero = str => (str < 10 ? `0${str}` : str),
        setTimer = deadline => {
            const
                dateNow = new Date().getTime(),
                dateStop = new Date(deadline).getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);
            return { seconds, minutes, hours, timeRemaining };

        },
        updateTimer = () => {
            const timer = setTimer('18 june 2021');

            if (timer.timeRemaining > 0) {
                timerHours.textContent = addZero(timer.hours);
                timerMinutes.textContent = addZero(timer.minutes);
                timerSeconds.textContent = addZero(timer.seconds);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(int);
            }
        };

    updateTimer();
    const int = setInterval(updateTimer, 1000);

    // Menu

    const
        menu = document.querySelector('menu'),
        menuBtn = document.querySelector('.menu'),
        menuClose = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('li'),
        toggleMenu = () => {
            if (menu.style.transform === 'translate(-100%)' || !menu.style.transform) {
                menu.style.transform = 'translate(0)';
            } else {
                menu.style.transform = 'translate(-100%)';
            }
        };

    menuBtn.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);
    menuItems.forEach(item => item.addEventListener('click', toggleMenu));

    // Popup

    const
        popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        showPopup = () => {
            popupContent.style.top = (parseInt(popupContent.style.top) - 1 + '%');
        };

    popupBtn.forEach(item => item.addEventListener('click', () => {
        popup.style.display = 'block';
        popupContent.style.top = '100%';
        const animate = setInterval(showPopup, 10);
        setTimeout(() => clearInterval(animate), 900);
    }));
    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});

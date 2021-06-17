window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let deadline = ('18 june 2021');

    const
        timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        timerDate = document.querySelector('#timer-date'),
        timerBtn = document.querySelector('#timer-btn'),
        addZero = (str) => {
            if (String(str).length === 1) {
                return '0' + str;
            } else {
                return str;
            }
        },
        setTimer = (deadline) => {
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
            const timer = setTimer(deadline);

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

    timerBtn.addEventListener('click', () => {
        deadline = new Date(timerDate.value);
    });

    updateTimer();
    const int = setInterval(updateTimer, 1000);

});

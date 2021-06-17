window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let deadline = ('18 june 2021');
    
    const
        timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        timerDate = document.querySelector('#timer-date'),
        timerBtn = document.querySelector('#timer-btn'),
        setTimer = (deadline) => {
            const
                dateNow = new Date().getTime(),
                dateStop = new Date(deadline).getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);
            return {seconds, minutes, hours, timeRemaining};
    
        },
        updateTimer = () => {
            const timer = setTimer(deadline);

            if (timer.timeRemaining > 0 ) {
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;             
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
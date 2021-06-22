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
            const timer = setTimer('24 june 2021');

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

    const showMenu = () => {
        const
            menu = document.querySelector('menu'),
            toggleMenu = () => {
                if (menu.style.transform === 'translate(-100%)' || !menu.style.transform) {
                    menu.style.transform = 'translate(0)';
                } else {
                    menu.style.transform = 'translate(-100%)';
                }
            };
        
        window.addEventListener('click', (event) => {
            const menuTarget = event.target.closest('menu');
            const menuBtn = event.target.closest('.menu');
            const menuItem = event.target.closest('menu a');
            const closeBtn = event.target.closest('.close-btn');
            if (menuBtn || closeBtn || menuItem) {
                toggleMenu();
            } else if (menu.style.transform === 'translate(0px)' && !menuTarget) {
                toggleMenu();
            }
        });
    };

    showMenu();

    // Popup

    const showPopup = () => {
        const
            popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            animatePopup = () => {
                popupContent.style.top = (parseInt(popupContent.style.top) - 1 + '%');
            };

        popupBtn.forEach(item => item.addEventListener('click', () => {
            popup.style.display = 'block';
            if (screen.availWidth >= 768) {
                popupContent.style.top = '100%';
                const animate = setInterval(animatePopup, 10);
                setTimeout(() => clearInterval(animate), 900);
            }
        }));
        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';                    
                }
            }
        });
    };

    showPopup();

    //scroll

    const scroll = () => {
        const
            anchors = document.querySelectorAll('a[href*="#"]'),
            scrollToAnchor = item => {
                item.addEventListener('click', event => {
                    event.preventDefault();
                    const blockID = item.getAttribute('href').substr(1);
                    document.getElementById(blockID).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            };

        anchors.forEach(item => scrollToAnchor(item));
    };

    scroll();
    
    //tabs
    
    const tabs = () => {
        const
            tabHeader = document.querySelector('.service-header'),
            tabs = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab'),
            toggleTabContent = (index) => {
                tabContent.forEach( (item, i) => {
                    if (index === i) {
                        item.classList.remove('d-none');
                        tabs[i].classList.add('active');
                    } else {
                        item.classList.add('d-none');
                        tabs[i].classList.remove('active');
                    }
                });
            };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target.closest('.service-header-tab');
            if (target) {            
                tabs.forEach( (item, i) => {
                    if (target === item) {
                        toggleTabContent(i);                   
                    }
                });
                
            }
        });
    };
    
    tabs();    

});

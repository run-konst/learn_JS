window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // Timer

    let timeRemaining = 0;

    const
        timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        addZero = str => (str < 10 ? `0${str}` : str),
        setTimer = deadline => {
            const
                dateNow = new Date().getTime(),
                dateStop = new Date(deadline).getTime(),
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);

            timeRemaining = (dateStop - dateNow) / 1000;
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
            }
        };

    updateTimer();
    const int = setInterval(updateTimer, 1000);
    if (timeRemaining < 0) {
        clearInterval(int);
    }

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

        window.addEventListener('click', event => {
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
        popup.addEventListener('click', event => {
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
                if (item.getAttribute('href') === '#') {
                    return;
                }
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
            toggleTabContent = index => {
                tabContent.forEach((item, i) => {
                    if (index === i) {
                        item.classList.remove('d-none');
                        tabs[i].classList.add('active');
                    } else {
                        item.classList.add('d-none');
                        tabs[i].classList.remove('active');
                    }
                });
            };

        tabHeader.addEventListener('click', event => {
            const target = event.target.closest('.service-header-tab');
            if (target) {
                tabs.forEach((item, i) => {
                    if (target === item) {
                        toggleTabContent(i);
                    }
                });

            }
        });
    };

    tabs();

    //slider

    const slider = () => {
        const
            wrapper = document.querySelector('.portfolio-content'),
            slides = document.querySelectorAll('.portfolio-item'),
            dotsContainer = document.querySelector('.portfolio-dots'),
            createDots = () => {
                for (let i = 0; i < slides.length; i++) {
                    const dot = document.createElement('li');
                    dot.classList.add('dot');
                    dotsContainer.append(dot);
                }
            };

        createDots();

        const dots = document.querySelectorAll('.dot');
        dots[0].classList.add('dot-active');

        let currentSlide = 0;
        let interval;

        const
            hideSlide = () => {
                slides[currentSlide].classList.remove('portfolio-item-active');
                dots[currentSlide].classList.remove('dot-active');
            },
            showSlide = () => {
                if (currentSlide >= slides.length) {
                    currentSlide = 0;
                }
                if (currentSlide < 0) {
                    currentSlide = slides.length - 1;
                }
                slides[currentSlide].classList.add('portfolio-item-active');
                dots[currentSlide].classList.add('dot-active');
            },
            autoplay = () => {
                hideSlide();
                currentSlide++;
                showSlide();
            },
            startAutoplay = (time = 3000) => {
                interval = setInterval(autoplay, time);
            },
            stopAutoplay = () => {
                clearInterval(interval);
            };

        wrapper.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            hideSlide();
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dots.forEach((item, i) => {
                    if (item === target) {
                        currentSlide = i;
                    }
                });
            }
            showSlide();
        });

        wrapper.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                stopAutoplay();
            }
        });

        wrapper.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                startAutoplay(2000);
            }
        });

        startAutoplay(2000);
    };

    slider();

    //images

    const changeCommandImages = () => {
        const
            commandImages = document.querySelectorAll('.command__photo'),
            changeImage = image => {
                image.dataset.oldImg = image.src;
                image.src = image.dataset.img;
            },
            returnImage = image => {
                image.src = image.dataset.oldImg;
            };

        commandImages.forEach(image =>  {
            image.addEventListener('mouseenter', () => changeImage(image));
        });
        commandImages.forEach(image =>  {
            image.addEventListener('mouseleave', () => returnImage(image));
        });

    };

    changeCommandImages();

    //validate

    const validate = () => {
        const
            allFields = document.querySelectorAll('input'),
            squareField = document.querySelector('.calc-square'),
            countField = document.querySelector('.calc-count'),
            dayField = document.querySelector('.calc-day'),
            nameFields = document.querySelectorAll('[placeholder="Ваше имя"]'),
            mailFields = document.querySelectorAll('.form-email'),
            phoneFields = document.querySelectorAll('.form-phone'),
            messageField = document.getElementById('form2-message'),
            validateOnlyNums = function() {
                this.value = this.value.replace(/[^\d]/g, "");
            },
            validateCyr = function() {
                this.value = this.value.replace(/[^а-яА-ЯёЁ\s-]/g, "");
            },
            validateMail = function() {
                this.value = this.value.replace(/[^a-zA-Z@_!~.'*-]/g, "");
            },
            validatePhone = function() {
                this.value = this.value.replace(/[^\d()-]/g, "");
            },
            replaceRules = function() {
                let str = this.value = this.value.replace(/\s+/g, " ");
                str = str.replace(/-+/g, "-");
                while (str.match(/^ /) || str.match(/^-/)) {
                    str = str.replace(/^ /, "");
                    str = str.replace(/^-/, "");
                }
                while (str.match(/ $/) || str.match(/-$/)) {
                    str = str.replace(/ $/, "");
                    str = str.replace(/-$/, "");
                }
                this.value = str;
            },
            capitalizeFirstLetters = function() {
                const str = this.value = this.value.replace(/./g, match => match.toLowerCase());
                const arr = str.split(' ');
                const newArr = [];
                arr.forEach(item => {
                    item = item.replace(/./, match => match.toUpperCase());
                    newArr.push(item);
                });
                this.value = newArr.join(' ');
            };

        squareField.addEventListener('input', validateOnlyNums);
        countField.addEventListener('input', validateOnlyNums);
        dayField.addEventListener('input', validateOnlyNums);
        nameFields.forEach(item => item.addEventListener('input', validateCyr));
        mailFields.forEach(item => item.addEventListener('input', validateMail));
        phoneFields.forEach(item => item.addEventListener('input', validatePhone));
        messageField.addEventListener('input', validateCyr);
        allFields.forEach(item => item.addEventListener('blur', replaceRules));
        nameFields.forEach(item => item.addEventListener('blur', capitalizeFirstLetters));
    };

    validate();

    //calc

    const calc = price => {
        let
            intID,
            timeoutID;
        const
            calcItems = document.querySelectorAll('.calc-item'),
            selectType = document.querySelector('.calc-type'),
            square = document.querySelector('.calc-square'),
            count = document.querySelector('.calc-count'),
            days = document.querySelector('.calc-day'),
            total = document.getElementById('total'),
            countSum = () => {
                clearInterval(intID);
                clearTimeout(timeoutID);
                let
                    sum = 0,
                    countValue = 1,
                    daysValue = 1;
                const
                    selectValue = selectType.options[selectType.selectedIndex].value,
                    squareValue = square.value,
                    animateNumbers = (number, elem, time = 1000, speed = 10) => {
                        elem.textContent = 0;
                        if (time % speed !== 0) {
                            speed = 20;
                        }
                        const
                            iterations = time / speed,
                            numberPart = number / iterations;
                        let i = numberPart;
                        intID = setInterval(() => {
                            elem.textContent = Math.round(i);
                            i += numberPart;
                        }, speed);
                        timeoutID = setTimeout(() => {
                            clearInterval(intID);
                        }, time);
                    };

                if (count.value) {
                    countValue += (count.value - 1) / 10;
                }

                if (days.value && days.value <= 5) {
                    daysValue *= 2;
                } else if (days.value && days.value <= 10) {
                    daysValue *= 1.5;
                }

                if (selectValue && squareValue) {
                    sum = Math.round(price * selectValue * squareValue * countValue * daysValue);
                    animateNumbers(sum, total, 3000);
                } else {
                    total.textContent = 0;
                }
            };

        calcItems.forEach(item => item.addEventListener('change', countSum));
    };

    calc(1.4);

});

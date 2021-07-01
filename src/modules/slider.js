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

export default slider;

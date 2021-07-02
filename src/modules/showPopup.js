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
        if (document.body.offsetWidth >= 768) {
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

export default showPopup;

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

export default showMenu;

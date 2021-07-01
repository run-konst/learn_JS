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

export default tabs;

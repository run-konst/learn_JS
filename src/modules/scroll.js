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

export default scroll;

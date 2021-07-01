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

export default changeCommandImages;

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
                animateNumbers(sum, total, 500);
            } else {
                total.textContent = 0;
            }
        };

    calcItems.forEach(item => item.addEventListener('change', countSum));
};

export default calc;

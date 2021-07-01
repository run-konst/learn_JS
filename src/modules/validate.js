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
        validateName = function() {
            this.value = this.value.replace(/[^а-яА-ЯёЁ\s]/g, "");
        },
        validateMessage = function() {
            this.value = this.value.replace(/[^а-яА-ЯёЁ\d\s-.,!?]/g, "");
        },
        validateMail = function() {
            this.value = this.value.replace(/[^a-zA-Z@_!~.'*-]/g, "");
        },
        validatePhone = function() {
            this.value = this.value.replace(/[^\d+]/g, "");
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
    nameFields.forEach(item => item.addEventListener('input', validateName));
    mailFields.forEach(item => item.addEventListener('input', validateMail));
    phoneFields.forEach(item => item.addEventListener('input', validatePhone));
    messageField.addEventListener('input', validateMessage);
    allFields.forEach(item => item.addEventListener('blur', replaceRules));
    nameFields.forEach(item => item.addEventListener('blur', capitalizeFirstLetters));
};

export default validate;

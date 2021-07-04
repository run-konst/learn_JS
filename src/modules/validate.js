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
            const
                message = document.createElement('div'),
                formID = this.id.substr(0, 5),
                form = document.getElementById(formID),
                btn = form.querySelector('.form-btn');
            message.classList.add('error-message');
            if (this.value.match(/^7|^8/) && this.value.length <= 11) {
                btn.disabled = true;
                message.textContent = 'Не менее 11 символов';
                if (!this.nextElementSibling) {
                    this.insertAdjacentElement('afterend', message);
                } else {
                    this.nextElementSibling.textContent = 'Не менее 11 символов';
                }
            } else if (this.value.match(/^\+/) && this.value.length <= 12) {
                btn.disabled = true;
                message.textContent = 'Не менее 12 символов';
                if (!this.nextElementSibling) {
                    this.insertAdjacentElement('afterend', message);
                } else {
                    this.nextElementSibling.textContent = 'Не менее 12 символов';
                }
            } else {
                if (this.nextElementSibling) {
                    this.nextElementSibling.remove();
                    btn.disabled = false;
                }
            }
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

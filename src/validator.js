class Validator {
    constructor({ selector, pattern, method }) {
        this.form = document.querySelector(selector);
        this.submitBtn = this.form.querySelector('[type="submit"]');
        this.pattern = pattern;
        this.method = method;
        this.formElements = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();
        this.formElements.forEach(elem => elem.addEventListener('input', this.checkIt.bind(this)));
    }

    isValid(elem) {
        const validatorMethods = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };

        const method = this.method[elem.type];
        if (method) {
            return method.every(item => validatorMethods[item[0]](elem, this.pattern[item[1]]));
        }

        return true;
    }

    checkIt(event) {
        const target = event.target;

        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
        if (this.error.size) {
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.disabled = false;
        }
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
            input.success {
                border: 2px solid green !important;
            }
            input.error {
                border: 2px solid red !important;
            }
            .validator-error {
                font-size: 12px;
                color: red;
            }
        `;
        document.head.append(style);
    }

    setPattern() {
        if (!this.pattern.tel) {
            this.pattern.tel = /^\+?[78][-()]*\d{10}$/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        if (!this.pattern.text) {
            this.pattern.text = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
        }
    }
}

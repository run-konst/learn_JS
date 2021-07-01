const sendForm = () => {
    const
        statusMessage = document.createElement('div'),
        successMessage = 'Ваша заявка отправлена',
        errorMessage = 'Что-то пошло не так',
        removeMessage = () => { statusMessage.textContent = ''; },
        postData = (data) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        },
        sendData = (data) => {
            if (data.status !== 200) {
                throw new Error('Network status is not 200');
            }
            statusMessage.classList.remove('sk-wave');
            statusMessage.textContent = successMessage;
            setTimeout(removeMessage, 3000);
        },
        errorData = (error) => {
            statusMessage.classList.remove('sk-wave');
            statusMessage.textContent = errorMessage;
            console.error(error);
            setTimeout(removeMessage, 3000);
        },
        clearInputs = (inputs) => {
            inputs.forEach(input => input.value = '');
        };

    document.addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target;
        form.appendChild(statusMessage);
        statusMessage.classList.add('sk-wave', 'status-message');
        statusMessage.innerHTML = `
            <div class="sk-rect sk-rect-1"></div>
            <div class="sk-rect sk-rect-2"></div>
            <div class="sk-rect sk-rect-3"></div>
            <div class="sk-rect sk-rect-4"></div>
            <div class="sk-rect sk-rect-5"></div>`;

        const
            formData = new FormData(form),
            data = {},
            inputs = form.querySelectorAll('input');
        formData.forEach((value, key) => {
            data[key] = value;
        });
        postData(data)
            .then(sendData)
            .catch(errorData)
            .finally(() => clearInputs(inputs));
    });
};

export default sendForm;

ready(function() {

    const form = document.forms["contact-form"];
    const alertWrapper = document.getElementsByClassName("dan-emailjs-alerts")[0];
    const msgFailure = alertWrapper.getElementsByClassName("dan-msg-failure")[0];
    const btnSend = form.getElementsByClassName("dan-btn-send")[0];

    form.addEventListener("submit", e => {

        e.preventDefault();
        e.stopPropagation();

        form.classList.add("was-validated");
        if (!form.checkValidity())
            return;

        btnSend.disabled = true;
        btnSend.classList.add("dan-sending");

        emailjs
            .sendForm(form.dataset.emailjsServiceId, form.dataset.emailjsTemplateId, form, form.dataset.emailjsUserId)
            .then(
                function(response) {
                    alertWrapper.classList.add("dan-emailjs-succeeded");
                    alertWrapper.classList.remove("dan-emailjs-failed");
                },
                function(error) {
                    msgFailure.innerText = `Status ${error.status}: ${error.text}`;
                    alertWrapper.classList.add("dan-emailjs-failed");
                    alertWrapper.classList.remove("dan-emailjs-succeeded");
                }
            )
            .then(() => {
                btnSend.classList.remove("dan-sending");
                btnSend.disabled = false;
            })

    }, false);

})

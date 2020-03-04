ready(function() {

    const form = document.forms["contact-form"];
    const alertWrapper = document.getElementsByClassName("dan-emailjs-alerts")[0];
    const origFailureTxt = alertWrapper.getElementsByClassName("alert-danger")[0].innerText;

    form.addEventListener('submit', function(e) {

        e.preventDefault();
        e.stopPropagation();

        form.classList.add("was-validated");

        if (form.checkValidity()) {
            emailjs
            .sendForm(form.dataset.emailjsServiceId, form.dataset.emailjsTemplateId, form, form.dataset.emailjsUserId)
            .then(
                function(response) {
                    alertWrapper.classList.add("dan-emailjs-success");
                    alertWrapper.classList.remove("dan-emailjs-failure");
                },
                function(error) {
                    msgFailure.innerText = `${origFailureTxt}\nStatus ${error.status}: ${error.text}`;
                    alertWrapper.classList.add("dan-emailjs-failure");
                    alertWrapper.classList.remove("dan-emailjs-success");
                }
            )
        }

    }, false);

})

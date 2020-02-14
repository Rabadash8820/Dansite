ready(() => {

    const form = document.getElementsByClassName("contact-form")[0];
    const msgSuccess = form.getElementsByClassName("msg-success")[0];

    form.addEventListener("submit", e => {
        if (form.checkValidity() === false) {
            // TODO: Securely send an email
            e.preventDefault();
            e.stopPropagation();
        }
        else
            msgSuccess.hidden = false
        form.classList.add("was-validated");
    }, false);

})

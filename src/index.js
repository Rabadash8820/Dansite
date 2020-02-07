function ready(fn) {
    if (document.readyState !== "loading")
        fn();
    else
        document.addEventListener("DOMContentLoaded", fn);
}

ready(() => {

    const path = window.location.pathname;
    updateNavbar(path.replace("/", ""));


    // const _nav = document.getElementById("navbarNav");
    let _prevLink;
    function updateNavbar(path) {
        console.log(path);
        const link = document.getElementById(path + "-navbar-link");
        link.textContent = link.innerHTML = "<span class=\"sr-only\"> (current)</span>";
        if (_prevLink)
            _prevLink.innerHTML = "";
        _prevLink = link;
    }

});
if (document.readyState != 'loading')
    onReady();
else
    document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
    // Show selected Bootstrap nav tab with ID matching the URL anchor
    // Inspired by https://github.com/twbs/bootstrap/issues/25220
    // May not actually need to run after the doc has been parsed but whatever...
    try {
        const bsTab = new bootstrap.Tab(window.location.hash);
        if (bsTab)
            bsTab.show();
    } catch (err) { /* Squash */ }
}

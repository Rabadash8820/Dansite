// Inspired by this SO answer: https://stackoverflow.com/questions/7862233/twitter-bootstrap-tabs-go-to-specific-tab-on-page-reload-or-hyperlink
// and the Bootstrap nav tab JS docs: https://getbootstrap.com/docs/5.3/components/navs-tabs/#methods

// Javascript to enable link to tab
try {
    var bsTab = new bootstrap.Tab(location.hash)
    if (bsTab)
        bsTab.show();
} catch { }

// Change hash for page-reload
var tabBtns = document.querySelectorAll('button[data-bs-toggle="tab"]')
tabBtns.forEach(function (tabBtn) {
    tabBtn.addEventListener('shown.bs.tab', function (e) {
        if (history.replaceState)
            history.replaceState(null, null, '#' + e.target.id)
        else
            location.hash = '#' + e.target.id
    });
});

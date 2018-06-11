/* bind event for pages */
document.addEventListener('init', function (event) {
    var page = event.target;
    // bind page load detail
    if (page.id === 'student') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    } 
});

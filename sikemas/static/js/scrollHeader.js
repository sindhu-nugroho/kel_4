// script.js
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});
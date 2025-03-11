document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    /**
     * Show or hide the scroll-to-top button based on scroll position.
     */
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            scrollToTopButton.classList.remove('hidden');
        } else {
            scrollToTopButton.classList.add('hidden');
        }
    });

    /**
     * Scroll to top smoothly when the button is clicked.
     */
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Toggle the mobile menu when clicking the menu toggle button.
     */
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });
    }

    /**
     * Close the mobile menu when a navigation link is clicked.
     */
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
        });
    });
});

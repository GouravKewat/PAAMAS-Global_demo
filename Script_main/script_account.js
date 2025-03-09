document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logout-btn');

    // Logout Functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            // Clear user session or local storage (if applicable)
            localStorage.removeItem('user'); // Example: Remove user data from localStorage
            alert('You have been logged out.');
            localStorage.removeItem('users');

            // Redirect to the login or home page
            window.location.href = './login.html'; // Replace with your login or home page URL
        });
    }

    // Optional: Fetch and display user data dynamically
    function fetchUserData() {
        // Example: Fetch user data from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users) {
            // Populate the form fields with user data if elements exist
            const nameElement = document.getElementById('name');
            const emailElement = document.getElementById('email');
            const contactElement = document.getElementById('contact');
            // console.table[user.name, user.email];
                users.forEach(user => {
                    if (nameElement) nameElement.value = user.fullname || 'N/A';
                    if (emailElement) emailElement.value = user.email || 'N/A';
                    if (contactElement) contactElement.value = `+91-9876-54321` || 'N/A';
                    
                });
        } else {
            console.log('No user data found in localStorage.');
        }
    }

    // Initial fetch of user data
    fetchUserData();
});
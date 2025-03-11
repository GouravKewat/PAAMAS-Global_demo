document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logout-btn');

    // Retrieve user data from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    /** 
     * Handles user logout functionality.
     * Clears the user session and redirects to the login page.
     */
    function handleLogout() {
        localStorage.removeItem('users'); // Ensure removing the correct key
        alert('You have been logged out.');
        window.location.href = './login.html'; // Adjust the path if needed
    }

    // Attach logout event listener if button exists
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    /** 
     * Fetches and displays user data from localStorage.
     */
    function fetchUserData() {
        if (users.length > 0) { // Ensure users is an array
            const user = users[0]; // First user object
            const user_r = users[1] || {}; // Second user object (fallback to empty object)

            // Get form field elements
            const nameElement = document.getElementById('name');
            const emailElement = document.getElementById('email');
            const contactElement = document.getElementById('contact');
            const uniqueIdElement = document.getElementById('unique_id');
            const uniqueNameElement = document.getElementById('unique_name');
            const studentsNoElement = document.getElementById('students_no');

            // Populate form fields with user data
            if (nameElement) nameElement.value = user.fullname || 'NA';
            if (emailElement) emailElement.value = user.email || 'NA';
            if (contactElement) contactElement.value = user_r.contact || 'NA';
            if (uniqueIdElement) uniqueIdElement.value = user_r.unique_id || 'NA';
            if (uniqueNameElement) uniqueNameElement.value = user_r.unique_name || 'NA';
            if (studentsNoElement) studentsNoElement.value = user_r.students_no || 'NA';
        } else {
            console.warn('No user data found in localStorage.');
        }
    }

    // Fetch user data when the page loads
    fetchUserData();
});
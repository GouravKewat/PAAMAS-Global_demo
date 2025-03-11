document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profile-form');

    // Function to generate a unique code
    const unique_code = (length) => {
        let res = '';
        const codechar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < length; i++) {
            const ID = Math.floor(Math.random() * codechar.length);
            res += codechar.charAt(ID);
        }
        return res;
    };

    // Fetch users from localStorage or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    profileForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        // Collect input values
        const newUser = {
            fullname: document.getElementById('name').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value,
            address: document.getElementById('address').value,
            unique_id: unique_code(10), // Generate and store unique ID
            unique_name: document.getElementById('unique_name').value,
            unique_address: document.getElementById('unique_address').value,
            students_no: document.getElementById('students_no').value,
            agree: document.getElementById('agree').checked // Fix for checkbox input
        };

        // Add the new user to the users array
        users.push(newUser);

        // Save updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Notify the user
        alert('Registration successful!');

        // Reset the form after submission
        profileForm.reset();

        // Redirect to home page
        window.location.href = './index.html';
    });

    // Fetch and display the latest user data
    function fetchUserData() {
        if (users.length > 0) {
            // Get the last registered user
            const user = users[users.length - 1];

            // Populate form fields
            document.getElementById('name').value = user.fullname || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('contact').value = user.contact || '';
            document.getElementById('address').value = user.address || '';
            document.getElementById('unique_id').value = user.unique_id || '';
            document.getElementById('unique_name').value = user.unique_name || '';
            document.getElementById('unique_address').value = user.unique_address || '';
            document.getElementById('students_no').value = user.students_no || '';
            document.getElementById('agree').checked = user.agree || false;
        } else {
            console.warn('No user data found in localStorage.');
        }
    }

    // Initial fetch of user data
    fetchUserData();
});

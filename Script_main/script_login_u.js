document.addEventListener('DOMContentLoaded', function () {
    const authForm = document.getElementById('auth-form');
    const fullnameField = document.getElementById('fullname-field');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-btn');
    const toggleText = document.getElementById('toggle-text');
    let isLoginMode = true;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    /**
     * Toggle between Login and Signup modes.
     */
    toggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isLoginMode = !isLoginMode;

        if (isLoginMode) {
            formTitle.textContent = 'Login';
            submitBtn.textContent = 'Login';
            toggleText.textContent = "Don't have an account? ";
            toggleBtn.textContent = 'Sign Up';
            fullnameField.classList.add('hidden');
        } else {
            formTitle.textContent = 'Sign Up';
            submitBtn.textContent = 'Sign Up';
            toggleText.textContent = 'Already have an account? ';
            toggleBtn.textContent = 'Login';
            fullnameField.classList.remove('hidden');
        }
    });

    /**
     * Handle form submission for login and signup.
     */
    authForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const fullname = isLoginMode ? null : document.getElementById('fullname').value;

        if (isLoginMode) {
            // Handle Login
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                alert('Login successful!');
                window.location.href = './index.html'; // Redirect to home page
            } else {
                alert('Invalid email or password.');
            }
        } else {
            // Handle Signup
            if (!fullname) {
                alert('Please enter your full name.');
                return;
            }

            // Check if user already exists
            const userExists = users.some(u => u.email === email);
            if (userExists) {
                alert('User with this email already exists.');
                return;
            }

            // Add new user
            users.push({ email, password, fullname });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful!');
            window.location.href = './admission.html'; // Redirect to home page
        }
    });
});

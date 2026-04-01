/**
 * Login Page JavaScript (index.html)
 * Handles form submission and session management
 */

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  // Validation
  if (!username || !password) {
    errorMessage.textContent = 'Username and password are required.';
    errorMessage.classList.remove('hidden');
    return;
  }

  // Hide error
  errorMessage.classList.add('hidden');

  // Store demo login state
  sessionStorage.setItem('demoLoggedIn', 'true');
  sessionStorage.setItem('demoUsername', username);

  // Redirect to OTP page after a short delay
  setTimeout(() => {
    window.location.href = 'verify.html';
  }, 800);
});

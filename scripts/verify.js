/**
 * OTP Verification Page JavaScript (verify.html)
 * Handles session checking, code validation, and resend logic
 */

// Check if user is logged in
if (!sessionStorage.getItem('demoLoggedIn')) {
  window.location.href = 'index.html';
}

const codeInput = document.getElementById('codeInput');
const verifyForm = document.getElementById('verifyForm');
const resendBtn = document.getElementById('resendBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const resendText = document.getElementById('resendText');
const cooldownText = document.getElementById('cooldownText');
const cooldownTimer = document.getElementById('cooldownTimer');

let cooldownSeconds = 0;
let cooldownInterval = null;

// Form submission
verifyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const code = codeInput.value.trim();
  
  if (!code) {
    errorMessage.textContent = 'Enter the verification code.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  if (code.length !== 6 || !/^\d{6}$/.test(code)) {
    errorMessage.textContent = 'Code must be 6 digits.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';

  // Simulate verification delay
  setTimeout(() => {
    sessionStorage.setItem('demoLoggedIn', 'true');
    window.location.href = 'pages/payment/dashboard.html';
  }, 800);
});

// Resend OTP
resendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Reset input
  codeInput.value = '';
  errorMessage.style.display = 'none';
  successMessage.textContent = 'Code resent. Check your email.';
  successMessage.style.display = 'block';

  // Start cooldown
  cooldownSeconds = 60;
  updateCooldownDisplay();
  
  if (cooldownInterval) {
    clearInterval(cooldownInterval);
  }

  cooldownInterval = setInterval(() => {
    cooldownSeconds--;
    updateCooldownDisplay();
    
    if (cooldownSeconds <= 0) {
      clearInterval(cooldownInterval);
      resendBtn.disabled = false;
    }
  }, 1000);

  resendBtn.disabled = true;
  codeInput.focus();
});

function updateCooldownDisplay() {
  if (cooldownSeconds > 0) {
    resendText.style.display = 'none';
    cooldownText.style.display = 'inline';
    cooldownTimer.textContent = String(cooldownSeconds).padStart(2, '0');
  } else {
    resendText.style.display = 'inline';
    cooldownText.style.display = 'none';
  }
}

// Only numeric input
codeInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^\d]/g, '');
});

// Auto-focus first input
codeInput.focus();

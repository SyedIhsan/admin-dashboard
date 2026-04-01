/**
 * Main JavaScript (main.js)
 * Shared utilities and common functionality for all pages
 * - Session management helpers
 * - Navigation utilities
 * - Common event handlers
 */

// Session Management Helpers
const Session = {
  set: (key, value) => {
    sessionStorage.setItem(key, value);
  },
  
  get: (key) => {
    return sessionStorage.getItem(key);
  },
  
  remove: (key) => {
    sessionStorage.removeItem(key);
  },
  
  clear: () => {
    sessionStorage.clear();
  },
  
  isLoggedIn: () => {
    return !!sessionStorage.getItem('demoLoggedIn');
  },
  
  getUsername: () => {
    return sessionStorage.getItem('demoUsername');
  }
};

// Navigation Helpers
const Navigation = {
  goToLogin: () => {
    window.location.href = '/index.html';
  },
  
  goToVerify: () => {
    window.location.href = '/verify.html';
  },
  
  goToDashboard: () => {
    window.location.href = '/pages/dashboard.html';
  },
  
  goToPage: (pageName) => {
    window.location.href = `/pages/${pageName}.html`;
  },
  
  logout: () => {
    Session.clear();
    Navigation.goToLogin();
  }
};

// Utility Functions
const Utils = {
  /**
   * Show/hide elements with optional animation
   * @param {Element} el - DOM element
   * @param {boolean} visible - true to show, false to hide
   */
  toggle: (el, visible) => {
    if (el) {
      el.style.display = visible ? 'block' : 'none';
    }
  },
  
  /**
   * Add/remove CSS class
   * @param {Element} el - DOM element
   * @param {string} className - CSS class name
   * @param {boolean} add - true to add, false to remove
   */
  toggleClass: (el, className, add) => {
    if (el) {
      if (add) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  }
};

// Page Load Handler
document.addEventListener('DOMContentLoaded', () => {
  // Any global initialization can go here
  console.log('DEMO Admin loaded');
});

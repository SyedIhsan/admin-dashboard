/**
 * Mobile Menu JavaScript
 * Handles mobile menu toggle and keyboard events (for all pages)
 */

(function () {
  const menuBtn = document.getElementById('mobileMenuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      // Mobile menu toggle functionality (prepared for dashboard pages)
      console.log('Mobile menu toggled');
    });
  }
  
  // Close mobile menu on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      console.log('Menu closed via Escape');
    }
  });
})();

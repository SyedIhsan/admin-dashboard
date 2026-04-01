/**
 * Load Partials Utility
 * Dynamically loads nav.html and footer.html into dashboard pages
 * Must be called after page load to ensure DOM is ready
 */

async function loadPartials() {
  try {
    // Determine the correct relative path based on current page location
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const depth = pathSegments.indexOf('DEMO') !== -1 
      ? pathSegments.length - pathSegments.indexOf('DEMO') - 1 
      : 2;
    
    const relativePath = '../'.repeat(depth);
    
    // Load nav.html
    const navResponse = await fetch(relativePath + 'partials/nav.html');
    if (navResponse.ok) {
      const navContent = await navResponse.text();
      const navContainer = document.getElementById('nav-container');
      if (navContainer) {
        navContainer.innerHTML = navContent;
      }
    }
    
    // Load footer.html
    const footerResponse = await fetch(relativePath + 'partials/footer.html');
    if (footerResponse.ok) {
      const footerContent = await footerResponse.text();
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) {
        footerContainer.innerHTML = footerContent;
      }
    }
    
    // Re-initialize scripts that depend on loaded DOM elements
    if (window.initMobileMenu) {
      window.initMobileMenu();
    }
  } catch (error) {
    console.warn('Failed to load partials:', error);
  }
}

// Load partials when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPartials);
} else {
  loadPartials();
}

// Vercel Speed Insights initialization
// This script initializes Speed Insights for the static HTML portfolio site
(function() {
  'use strict';
  
  // Initialize the Speed Insights queue
  if (!window.si) {
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }
  
  // Configuration
  const config = {
    debug: false,
    // The script source will be automatically determined based on environment
    // In production on Vercel, it will use /_vercel/speed-insights/script.js
    // In development, it will use the debug version
  };
  
  // Detect environment
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '';
  
  // Determine script source
  const scriptSrc = isDev 
    ? 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js'
    : '/_vercel/speed-insights/script.js';
  
  // Check if script already loaded
  if (document.querySelector(`script[src*="speed-insights"]`)) {
    return;
  }
  
  // Create and inject the Speed Insights script
  const script = document.createElement('script');
  script.src = scriptSrc;
  script.defer = true;
  script.dataset.sdkn = '@vercel/speed-insights';
  script.dataset.sdkv = '1.3.1';
  
  if (isDev && config.debug === false) {
    script.dataset.debug = 'false';
  }
  
  script.onerror = function() {
    console.log(
      '[Vercel Speed Insights] Failed to load script from ' + scriptSrc + 
      '. Please check if any content blockers are enabled and try again.'
    );
  };
  
  // Append script to head
  document.head.appendChild(script);
})();

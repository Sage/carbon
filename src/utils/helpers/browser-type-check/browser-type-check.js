/**
 * Check for Chrome or Firefox.
 */
function browserTypeCheck(_window) {
  return Boolean(_window.chrome || _window.sidebar);
}

export function isSafari(navigator) {
  return navigator.vendor === 'Apple Computer, Inc.';
}

export default browserTypeCheck;

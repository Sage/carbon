/**
 * Check for Chrome or Firefox.
 */
function browserTypeCheck(_window) {
  return Boolean(_window.chrome || _window.sidebar);
}

export function isSafari(navigator) {
  return navigator.vendor.includes('Apple');
}

export function isEdge(navigator) {
  return navigator.userAgent.includes('Edge');
}
export default browserTypeCheck;

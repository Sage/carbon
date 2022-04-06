export default function isNavigationKey(key) {
  const navigationKeys = ["ArrowDown", "ArrowUp", "Home", "End"];
  return navigationKeys.includes(key);
}

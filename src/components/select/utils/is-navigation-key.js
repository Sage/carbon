export default function isNavigationKey(key) {
  const navigationKeys = [
    "ArrowDown",
    "ArrowUp",
    "Home",
    "End",
    "PageUp",
    "PageDown",
  ];
  return navigationKeys.includes(key);
}

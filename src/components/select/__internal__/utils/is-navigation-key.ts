export default function isNavigationKey(key: string) {
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

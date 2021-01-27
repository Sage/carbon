export default function isExpectedValue(currentValue, expectedValue) {
  if (
    typeof currentValue === "object" &&
    currentValue.id !== null &&
    currentValue.id !== undefined
  ) {
    return currentValue.id === expectedValue.id;
  }

  return currentValue === expectedValue;
}

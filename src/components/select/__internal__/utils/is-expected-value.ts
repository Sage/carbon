export default function isExpectedValue(
  currentValue: string | Record<string, unknown>,
  expectedValue: string | Record<string, unknown>,
) {
  if (
    typeof currentValue === "object" &&
    currentValue.id !== null &&
    currentValue.id !== undefined &&
    typeof expectedValue === "object"
  ) {
    return currentValue.id === expectedValue.id;
  }

  return currentValue === expectedValue;
}

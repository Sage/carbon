/** Index the same string, object ID and object identity matches as isExpectedValue. */
export default function createSelectedValueMatcher(
  values: (string | Record<string, unknown>)[],
) {
  const identities = new Set(values);
  const objectIds = new Set(
    values.flatMap((value) => (typeof value === "object" ? [value.id] : [])),
  );

  return (value: string | Record<string, unknown>) => {
    if (
      typeof value === "object" &&
      value.id !== null &&
      value.id !== undefined
    ) {
      // isExpectedValue uses strict equality; NaN IDs must never match.
      return value.id === value.id && objectIds.has(value.id);
    }

    return identities.has(value);
  };
}

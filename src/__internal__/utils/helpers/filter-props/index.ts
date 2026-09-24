/**
 * Returns a shallow copy of props excluding keys present in blockedPropNames.
 */
const filterPropsByName = (
  props: Record<string, unknown>,
  blockedPropNames: ReadonlySet<string>,
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !blockedPropNames.has(key)),
  );
};

export default filterPropsByName;

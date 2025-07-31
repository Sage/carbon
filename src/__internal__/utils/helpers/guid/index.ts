/**
 * Generates a random guid, useful for creating unique IDs.
 */
export default (): string => {
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

/**
 * Checks if a string is a valid GUID/UUID
 * Validates against the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * where x is a hexadecimal character (0-9, a-f)
 *
 * @param id - The string to check
 * @returns boolean - True if the string is a valid GUID, false otherwise
 */
export const isGuid = (id: string): boolean => {
  if (!id || typeof id !== "string") {
    return false;
  }

  const guidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  return guidRegex.test(id);
};

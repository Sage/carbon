export default function areObjectsEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
) {
  // Check if both arguments are objects
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // If the number of keys is different, objects aren't equal
  if (keys1.length !== keys2.length) {
    return false;
  } // Compare keys and values
  for (const key of keys1) {
    // Check if obj2 has the key and values are strictly equal
    if (
      !Object.prototype.hasOwnProperty.call(obj2, key) ||
      obj1[key] !== obj2[key]
    ) {
      return false;
    }
  }

  return true;
}

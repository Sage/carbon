/**
 * Move an array element from one position to another, without mutating the original array.
 *
 * ```ts
 * const array = ["a", "b", "c", "d"];
 * const result = arrayMove({ array, startIndex: 1, endIndex: 3 });
 * // result is ["a", "c", "d", "b"]
 * ```
 * */
function arrayMove<T>({
  array,
  startIndex,
  endIndex,
}: {
  array: T[];
  startIndex: number;
  endIndex: number;
}): T[] {
  if (
    startIndex === endIndex ||
    startIndex < 0 ||
    endIndex < 0 ||
    startIndex >= array.length ||
    endIndex >= array.length
  ) {
    return array;
  }

  const newArray = Array.from(array);
  const [removed] = newArray.splice(startIndex, 1);
  newArray.splice(endIndex, 0, removed);
  return newArray;
}

export default arrayMove;

export default function filterObjectProperties<T extends object>(
  originalObject: T,
  keyList: string[],
) {
  return (
    Object.keys(originalObject).filter((key) =>
      keyList.includes(key),
    ) as (keyof T)[]
  ).reduce((acc: Partial<T>, key) => {
    acc[key] = originalObject[key];
    return acc;
  }, {});
}

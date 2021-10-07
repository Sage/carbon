export default function filterObjectProperties(originalObject, keyList) {
  return Object.keys(originalObject)
    .filter((key) => keyList.includes(key))
    .reduce((acc, key) => {
      acc[key] = originalObject[key];
      return acc;
    }, {});
}

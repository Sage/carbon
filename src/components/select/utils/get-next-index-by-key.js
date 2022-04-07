export default function getNextIndexByKey(
  key,
  currentIndex,
  lastIndex,
  isLoading
) {
  const isNoOptionSelected = currentIndex === -1;
  let newIndex = currentIndex;

  switch (key) {
    case "Home":
      newIndex = 0;
      break;
    case "End":
      newIndex = lastIndex;
      break;
    case "ArrowDown":
      if (isLoading && currentIndex === lastIndex) {
        return lastIndex;
      }

      if (currentIndex === lastIndex || isNoOptionSelected) {
        newIndex = 0;
      } else {
        newIndex = currentIndex + 1;
      }
      break;
    case "ArrowUp":
      if (currentIndex === 0 || isNoOptionSelected) {
        newIndex = lastIndex;
      } else {
        newIndex = currentIndex - 1;
      }
      break;
    default:
      break;
  }

  return newIndex;
}

export default function getNextIndexByKey(
  key: string,
  currentIndex: number,
  lastIndex: number,
  isLoading?: boolean,
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
    case "PageDown":
      newIndex = lastIndex;
      break;
    case "PageUp":
      newIndex = 0;
      break;
    default:
      break;
  }

  return newIndex;
}

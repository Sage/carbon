export default function getNextIndexByKey(
  key,
  currentIndex,
  lastIndex,
  isLoading
) {
  const isNoOptionSelected = currentIndex === -1;
  let newIndex = currentIndex;

  if (key === "Home") {
    newIndex = 0;
  } else if (key === "End") {
    newIndex = lastIndex;
  } else if (key === "ArrowDown") {
    if (isLoading && currentIndex === lastIndex) {
      return lastIndex;
    }

    if (currentIndex === lastIndex || isNoOptionSelected) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
  } else if (key === "ArrowUp") {
    if (currentIndex === 0 || isNoOptionSelected) {
      newIndex = lastIndex;
    } else {
      newIndex = currentIndex - 1;
    }
  }

  return newIndex;
}

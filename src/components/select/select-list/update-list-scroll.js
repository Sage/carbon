export default function updateListScrollTop(indexOfCurrent, list, options) {
  if (
    !list ||
    !options[indexOfCurrent] ||
    options[indexOfCurrent].current === null
  ) {
    list.scrollTop = 0;

    return;
  }

  let newPosition = 0;
  const { offsetHeight: listHeight } = list;
  const { offsetTop: itemTop, offsetHeight: currentItemHeight } =
    options[indexOfCurrent].current;

  if (itemTop + currentItemHeight > listHeight) {
    newPosition = itemTop + currentItemHeight - listHeight;
  }

  list.scrollTop = newPosition;
}

export default function updateListScrollTop(indexOfCurrent, list) {
  if (!list || !list.children[indexOfCurrent]) {
    list.scrollTop = 0;

    return;
  }

  let newPosition = 0;
  const { offsetHeight: listHeight, children: listChildren } = list;
  const { offsetTop: itemTop, offsetHeight: currentItemHeight } = listChildren[
    indexOfCurrent
  ];

  if (itemTop + currentItemHeight > listHeight) {
    newPosition = itemTop + currentItemHeight - listHeight;
  }

  list.scrollTop = newPosition;
}

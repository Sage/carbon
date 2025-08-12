export default function reorder<T>(
  items: T[],
  source: { index: number },
  target: { index: number },
): T[] {
  if (
    source.index === target.index ||
    source.index < 0 ||
    source.index >= items.length ||
    target.index < 0 ||
    target.index >= items.length
  ) {
    return items;
  }

  const arrayClone = Array.from(items);
  const [removed] = arrayClone.splice(source.index, 1);
  arrayClone.splice(target.index, 0, removed);
  return arrayClone;
}

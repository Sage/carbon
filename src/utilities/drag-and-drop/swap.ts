import reorder from "./reorder";

export default function swap<T extends Record<string, unknown[]>>(
  items: T,
  source: { index: number; list: string },
  target: { index: number; list: string },
): T {
  if (
    source.index < 0 ||
    source.index > items[source.list].length ||
    target.index < 0 ||
    target.index > items[target.list].length
  ) {
    return items;
  }

  if (source.list === target.list) {
    /* Moving within the same container */

    if (source.index === target.index) {
      return items;
    }

    return {
      ...items,
      [source.list]: reorder(items[source.list], source, target),
    };
  }

  /*  Moving between different containers */
  const movedItem = items[source.list][source.index];

  return {
    ...items,
    [source.list]: [
      ...items[source.list].slice(0, source.index),
      ...items[source.list].slice(source.index + 1),
    ],
    [target.list]: [
      ...items[target.list].slice(0, target.index),
      movedItem,
      ...items[target.list].slice(target.index),
    ],
  };
}

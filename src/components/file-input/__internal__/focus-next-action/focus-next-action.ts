/**
 * Moves focus away from `element` (typically a status item's action button
 * that is about to be removed from the DOM, e.g. after "Delete" or
 * "Cancel") so focus doesn't get lost.
 *
 * Prefers the next actionable element within the same status list, falls
 * back to the previous one, and finally falls back to `fallback` (the
 * file-input's own "Select files" button) when `element` was the only
 * action in the list.
 */
export default function focusNextAction(
  element: HTMLElement,
  getFallback: () => HTMLElement | null,
): void {
  const actions = Array.from(
    element
      .closest('[role="list"], ul')
      ?.querySelectorAll<HTMLElement>("button, a[href]") || [],
  );
  const currentIndex = actions.indexOf(element);
  requestAnimationFrame(() => {
    if (document.contains(element)) return;

    const next = actions
      .slice(currentIndex + 1)
      .find((action) => document.contains(action));
    const previous = actions
      .slice(0, currentIndex)
      .reverse()
      .find((action) => document.contains(action));

    if (next) {
      next.focus();
      return;
    }

    if (previous) {
      previous.focus();
      return;
    }

    // The picker can only remount after the action callback removes the last
    // status card, so wait one frame after the action's own focus transfer.
    requestAnimationFrame(() => getFallback()?.focus());
  });
}

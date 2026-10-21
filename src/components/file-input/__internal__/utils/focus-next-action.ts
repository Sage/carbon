/** Selector for the actionable controls inside a file status card. */
const STATUS_ACTION_SELECTOR = "button, a[href]";

/**
 * Picks where focus should land inside the status lists: the first status
 * action, else the first status list, else `fallback` (the Select file
 * button).
 */
export const getStatusFocusTarget = (
  container: HTMLElement | null,
  fallback: HTMLElement | null,
): HTMLElement | null =>
  container?.querySelector<HTMLElement>(STATUS_ACTION_SELECTOR) ??
  container?.querySelector<HTMLElement>(
    '[data-role="file-upload-status-list"]',
  ) ??
  fallback;

/**
 * Keeps focus in the field when a status action removes its own card.
 *
 * Call it from the action's click handler. On the next frame, if `element`
 * has been removed, focus moves to the nearest action still in the same
 * list: the next one, else the previous one, else whatever `getFallback`
 * returns. If `element` is still in the DOM, nothing happens.
 *
 * `onRemoved` receives the target before focus moves, so the caller can add
 * the removal announcement to the target's description first.
 */
export default function focusNextAction(
  element: HTMLElement,
  getFallback: () => HTMLElement | null,
  onRemoved?: (focusTarget: HTMLElement | null) => void,
): void {
  const actions = Array.from(
    element
      .closest('[role="list"], ul')
      ?.querySelectorAll<HTMLElement>(STATUS_ACTION_SELECTOR) || [],
  );
  const currentIndex = actions.indexOf(element);
  const moveFocus = (target: HTMLElement | null) => {
    if (!onRemoved) {
      target?.focus();
      return;
    }

    onRemoved(target);
    requestAnimationFrame(() => target?.focus());
  };

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
      moveFocus(next);
      return;
    }

    if (previous) {
      moveFocus(previous);
      return;
    }

    // The drop zone can only remount after the action callback removes the
    // last status card, so resolve it after the action's render.
    requestAnimationFrame(() => moveFocus(getFallback()));
  });
}

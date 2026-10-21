import { useCallback, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import focusNextAction, {
  getStatusFocusTarget,
} from "../utils/focus-next-action";

interface UseMoveFocusAfterFileRemovalProps {
  statusListRef: RefObject<HTMLElement>;
  fallbackRef: RefObject<HTMLElement | null>;
  /** Runs just before the removal announcement is shown, e.g. to clear the live region. */
  onRemovalAnnouncement: () => void;
}

/**
 * Keeps focus in the field when a status action (such as Delete) removes its
 * card. Call `moveFocusAfterAction` from the action. When it is given an
 * announcement, that text is exposed as `removalAnnouncement` for the caller
 * to add to the newly focused element's accessible description.
 */
export default function useMoveFocusAfterFileRemoval({
  statusListRef,
  fallbackRef,
  onRemovalAnnouncement,
}: UseMoveFocusAfterFileRemovalProps): {
  removalAnnouncement: string;
  clearRemovalAnnouncement: () => void;
  moveFocusAfterAction: (element: HTMLElement, announcement?: string) => void;
} {
  const [removalAnnouncement, setRemovalAnnouncement] = useState("");
  const clearRemovalAnnouncement = useCallback(
    () => setRemovalAnnouncement(""),
    [],
  );

  const showRemovalAnnouncement =
    (announcement: string) => (focusTarget: HTMLElement | null) => {
      // No target means the field has unmounted, so there is nothing to
      // describe.
      if (!focusTarget) return;
      // The announcement must be present in the destination's accessible
      // description when focus moves, otherwise a screen reader may
      // announce only the control and miss the completed action.
      flushSync(() => {
        onRemovalAnnouncement();
        setRemovalAnnouncement(announcement);
      });
    };

  const moveFocusAfterAction = (element: HTMLElement, announcement?: string) =>
    focusNextAction(
      element,
      () => getStatusFocusTarget(statusListRef.current, fallbackRef.current),
      announcement ? showRemovalAnnouncement(announcement) : undefined,
    );

  return {
    removalAnnouncement,
    clearRemovalAnnouncement,
    moveFocusAfterAction,
  };
}

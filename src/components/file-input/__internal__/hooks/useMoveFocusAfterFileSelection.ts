import { useEffect, useRef, useState, type RefObject } from "react";
import { getStatusFocusTarget } from "../utils/focus-next-action";

interface UseMoveFocusAfterFileSelectionProps {
  multiple?: boolean;
  hasFiles: boolean;
  fallbackRef: RefObject<HTMLButtonElement | null>;
}

/**
 * In single-file mode, moves focus to the file's status card after a file is
 * selected: its first action, else the status list. Until the consumer
 * renders the status, focus is kept on the Select file button, and the move
 * is canceled if focus leaves that button. Does nothing in multiple-file
 * mode.
 */
export default function useMoveFocusAfterFileSelection({
  multiple,
  hasFiles,
  fallbackRef,
}: UseMoveFocusAfterFileSelectionProps): {
  statusListRef: RefObject<HTMLDivElement>;
  requestFileStatusFocus: () => void;
  cancelFileStatusFocus: () => void;
} {
  const statusListRef = useRef<HTMLDivElement>(null);
  const focusStatusAfterSelection = useRef(false);
  const [focusRequest, setFocusRequest] = useState(0);

  useEffect(() => {
    if (multiple) {
      focusStatusAfterSelection.current = false;
      return;
    }
    if (!focusStatusAfterSelection.current) return;

    if (!hasFiles) {
      requestAnimationFrame(() => fallbackRef.current?.focus());
      return;
    }

    focusStatusAfterSelection.current = false;
    requestAnimationFrame(() => {
      getStatusFocusTarget(statusListRef.current, fallbackRef.current)?.focus();
    });
  }, [fallbackRef, focusRequest, hasFiles, multiple]);

  return {
    statusListRef,
    cancelFileStatusFocus: () => {
      focusStatusAfterSelection.current = false;
    },
    requestFileStatusFocus: () => {
      focusStatusAfterSelection.current = true;
      setFocusRequest((request) => request + 1);
    },
  };
}

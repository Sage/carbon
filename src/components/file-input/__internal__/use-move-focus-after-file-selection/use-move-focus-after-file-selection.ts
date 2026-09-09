import { useEffect, useRef, useState, type RefObject } from "react";

interface UseFocusSingleFileStatusProps {
  multiple?: boolean;
  hasFiles: boolean;
  fallbackRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Moves focus to a newly rendered single-file status action after selection.
 * If the consumer does not render a status, focus returns to the picker.
 */
export default function useMoveFocusAfterFileSelection({
  multiple,
  hasFiles,
  fallbackRef,
}: UseFocusSingleFileStatusProps): {
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
      const statusAction =
        statusListRef.current?.querySelector<HTMLElement>("button, a[href]");
      const statusList = statusListRef.current?.querySelector<HTMLElement>(
        '[data-role="file-upload-status-list"]',
      );
      (statusAction ?? statusList ?? fallbackRef.current)?.focus();
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

import React, { useCallback, useRef } from "react";

import Events from "../../../../../../__internal__/utils/helpers/events";

type ChangedSelector = "month" | "year";

interface UseDatePickerKeyboardNavigationProps {
  ref: React.RefObject<HTMLDivElement>;
  open?: boolean;
  monthSelectId: string;
  yearSelectId: string;
  onEscape: () => void;
}

const useDatePickerKeyboardNavigation = ({
  ref,
  open,
  monthSelectId,
  yearSelectId,
  onEscape,
}: UseDatePickerKeyboardNavigationProps) => {
  const changedSelectorRef = useRef<ChangedSelector | null>(null);

  const getPickerDayFocusTarget = useCallback(
    () =>
      (ref.current?.querySelector(
        '.rdp-day_button:focus, .rdp-selected .rdp-day_button, .rdp-day_selected .rdp-day_button, .rdp-day_button[aria-selected="true"]',
      ) as HTMLElement | null) ||
      (ref.current?.querySelector(
        ".rdp-today .rdp-day_button, .rdp-day_today .rdp-day_button",
      ) as HTMLElement | null) ||
      (ref.current?.querySelector(
        ".rdp-day_button:not(:disabled)",
      ) as HTMLElement | null),
    [ref],
  );

  const getPickerSelectorControl = useCallback(
    (id: string) =>
      ref.current?.querySelector(`[id="${id}"]`) as HTMLElement | null,
    [ref],
  );

  const getPickerCloseControl = useCallback(
    () =>
      ref.current?.querySelector(
        '[data-role="date-picker-close"]',
      ) as HTMLElement | null,
    [ref],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (open && Events.isEscKey(event)) {
        onEscape();
        event.stopPropagation();
      }
    },
    [onEscape, open],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!Events.isTabKey(event)) return;

      const activeElement = document.activeElement as HTMLElement | null;
      const dateTarget =
        activeElement?.classList.contains("rdp-day_button") ||
        activeElement?.closest(".rdp-day_button");
      const monthSelector = getPickerSelectorControl(monthSelectId);
      const yearSelector = getPickerSelectorControl(yearSelectId);
      const closeControl = getPickerCloseControl();

      if (Events.isShiftKey(event)) {
        if (dateTarget) {
          event.preventDefault();
          yearSelector?.focus();
        } else if (activeElement === yearSelector) {
          event.preventDefault();
          monthSelector?.focus();
        } else if (activeElement === monthSelector) {
          event.preventDefault();
          closeControl?.focus();
        } else if (activeElement === closeControl) {
          event.preventDefault();
          getPickerDayFocusTarget()?.focus();
        }
        return;
      }

      if (
        (changedSelectorRef.current === "month" &&
          activeElement === monthSelector) ||
        (changedSelectorRef.current === "year" &&
          activeElement === yearSelector)
      ) {
        event.preventDefault();
        changedSelectorRef.current = null;
        (
          ref.current?.querySelector(
            ".rdp-day_button:not(:disabled)",
          ) as HTMLElement | null
        )?.focus();
      } else if (dateTarget) {
        event.preventDefault();
        closeControl?.focus();
      } else if (activeElement === closeControl) {
        event.preventDefault();
        monthSelector?.focus();
      } else if (activeElement === monthSelector) {
        event.preventDefault();
        yearSelector?.focus();
      } else if (activeElement === yearSelector) {
        event.preventDefault();
        getPickerDayFocusTarget()?.focus();
      }
    },
    [
      getPickerCloseControl,
      getPickerDayFocusTarget,
      getPickerSelectorControl,
      monthSelectId,
      ref,
      yearSelectId,
    ],
  );

  const markSelectorChanged = useCallback((selector: ChangedSelector) => {
    changedSelectorRef.current = selector;
  }, []);

  const resetChangedSelector = useCallback(() => {
    changedSelectorRef.current = null;
  }, []);

  return {
    getPickerDayFocusTarget,
    handleKeyDown,
    handleKeyUp,
    markSelectorChanged,
    resetChangedSelector,
  };
};

export default useDatePickerKeyboardNavigation;

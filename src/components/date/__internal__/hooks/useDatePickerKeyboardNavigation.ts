import React, { useCallback, useRef } from "react";

import Events from "../../../../__internal__/utils/helpers/events";

type ChangedSelector = "month" | "year";

const focusedDaySelector = ".rdp-day_button:focus";
const preferredDaySelectors = [
  focusedDaySelector,
  ".rdp-selected .rdp-day_button",
  '.rdp-day_button[aria-selected="true"]',
];
const todayDaySelectors = [".rdp-today .rdp-day_button"];
// Range mode focuses the start date. Without this, the day picker can focus today instead when
// today is before the start date.
const rangeDaySelectors = [
  focusedDaySelector,
  ".rdp-selected:not(.rdp-outside) .rdp-day_button",
];
const allDaySelector = ".rdp-day_button";
const currentMonthDaySelector = ".rdp-day:not(.rdp-outside) .rdp-day_button";
const additionalFocusableSelector =
  'button, [href], input:not([type="hidden"]), select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]';
const internalTabGuardSelector = '[data-role="date-picker-tab-guard"]';

const isRenderedControl = (control: HTMLElement) => {
  if (control.closest("[hidden], [inert]")) return false;

  let element: HTMLElement | null = control;
  while (element) {
    const { display, visibility } = window.getComputedStyle(element);
    if (display === "none" || visibility === "hidden") return false;
    element = element.parentElement;
  }

  return true;
};

const isEnabledFocusableControl = (
  control: HTMLElement | null,
): control is HTMLElement =>
  Boolean(
    control &&
      !control.matches(":disabled") &&
      control.getAttribute("aria-disabled") !== "true" &&
      control.tabIndex !== -1 &&
      isRenderedControl(control),
  );

// A day that is enabled and visible. Unlike isEnabledFocusableControl, it ignores tabindex, because
// the day picker sets tabindex="-1" on every day except one.
const isAvailableDay = (day: HTMLElement) =>
  !day.matches(":disabled") && isRenderedControl(day);

// Footer actions in their DOM order: Close in single mode, Clear and Apply in range mode.
const footerControlSelector = [
  '[data-role="date-picker-close"]',
  '[data-role="date-picker-clear"]',
  '[data-role="date-picker-apply"]',
].join(", ");

const findFirstControl = (
  container: HTMLElement | null,
  selectors: string[],
  isMatch: (control: HTMLElement) => boolean = isEnabledFocusableControl,
) => {
  if (!container) return null;

  return (
    selectors
      .flatMap((selector) =>
        Array.from(container.querySelectorAll<HTMLElement>(selector)),
      )
      .find(isMatch) || null
  );
};

const getAdditionalFocusableControls = (
  container: HTMLElement | null,
  managedControls: HTMLElement[],
) =>
  Array.from(
    container?.querySelectorAll<HTMLElement>(additionalFocusableSelector) || [],
  ).filter(
    (control) =>
      isEnabledFocusableControl(control) &&
      !managedControls.includes(control) &&
      !control.matches(allDaySelector) &&
      !control.matches(internalTabGuardSelector),
  );

interface UseDatePickerKeyboardNavigationProps {
  ref: React.RefObject<HTMLDivElement>;
  open?: boolean;
  mode?: "single" | "range";
  monthSelectId: string;
  yearSelectId: string;
  onEscape: () => void;
}

/** Cycles Tab focus within the picker, moves focus from changed selectors to the calendar, and closes on Escape. */
const useDatePickerKeyboardNavigation = ({
  ref,
  open,
  mode = "single",
  monthSelectId,
  yearSelectId,
  onEscape,
}: UseDatePickerKeyboardNavigationProps) => {
  const changedSelectorRef = useRef<ChangedSelector | null>(null);

  const getPickerDayFocusTarget = useCallback(
    () =>
      (mode === "range" &&
        findFirstControl(ref.current, rangeDaySelectors, isAvailableDay)) ||
      findFirstControl(ref.current, preferredDaySelectors) ||
      findFirstControl(ref.current, todayDaySelectors) ||
      findFirstControl(ref.current, [allDaySelector]),
    [mode, ref],
  );

  const getPickerSelectorControl = useCallback(
    (id: string) =>
      ref.current?.querySelector(`[id="${id}"]`) as HTMLElement | null,
    [ref],
  );

  const getPickerFooterControls = useCallback(
    () =>
      Array.from(
        ref.current?.querySelectorAll<HTMLElement>(footerControlSelector) || [],
      ).filter(isEnabledFocusableControl),
    [ref],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (open && Events.isEscKey(event)) {
        event.stopPropagation();
        onEscape();
      }
    },
    [onEscape, open],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!Events.isTabKey(event)) return;

      const activeElement = document.activeElement as HTMLElement | null;
      if (!activeElement) return;

      const isDayTarget = Boolean(
        activeElement.classList.contains("rdp-day_button") ||
          activeElement.closest(".rdp-day_button"),
      );
      const monthSelector = getPickerSelectorControl(monthSelectId);
      const yearSelector = getPickerSelectorControl(yearSelectId);
      const footerControls = getPickerFooterControls();
      const dayFocusTarget = getPickerDayFocusTarget();
      // Preserve the established built-in cycle: day -> footer actions (close,
      // or clear and apply) -> month -> year.
      // Append custom controls in their relative DOM order so adding picker
      // content does not reorder the existing controls.
      const managedControls = [
        ...(dayFocusTarget ? [dayFocusTarget] : []),
        ...footerControls,
        ...[monthSelector, yearSelector].filter(isEnabledFocusableControl),
      ];
      const focusableControls = [
        ...managedControls,
        ...getAdditionalFocusableControls(ref.current, managedControls),
      ];
      const activeControl = isDayTarget ? dayFocusTarget : activeElement;

      const moveFocus = (offset: number) => {
        if (!activeControl) return;

        const activeIndex = focusableControls.indexOf(activeControl);
        if (activeIndex === -1) return;

        event.preventDefault();
        const targetIndex =
          (activeIndex + offset + focusableControls.length) %
          focusableControls.length;
        focusableControls[targetIndex].focus();
      };

      if (Events.isShiftKey(event)) {
        changedSelectorRef.current = null;
        moveFocus(-1);
        return;
      }

      if (
        (changedSelectorRef.current === "month" &&
          activeElement === monthSelector) ||
        (changedSelectorRef.current === "year" &&
          activeElement === yearSelector)
      ) {
        changedSelectorRef.current = null;
        const currentMonthDay = findFirstControl(ref.current, [
          currentMonthDaySelector,
        ]);
        const nextDay = currentMonthDay || getPickerDayFocusTarget();
        if (nextDay) {
          event.preventDefault();
          nextDay.focus();
        } else moveFocus(1);
      } else moveFocus(1);
    },
    [
      getPickerDayFocusTarget,
      getPickerFooterControls,
      getPickerSelectorControl,
      monthSelectId,
      ref,
      yearSelectId,
    ],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const changedSelector = changedSelectorRef.current;
      if (!changedSelector) return;

      const changedSelectorId =
        changedSelector === "month" ? monthSelectId : yearSelectId;
      if (event.target === getPickerSelectorControl(changedSelectorId)) {
        changedSelectorRef.current = null;
      }
    },
    [getPickerSelectorControl, monthSelectId, yearSelectId],
  );

  const markSelectorChanged = useCallback((selector: ChangedSelector) => {
    changedSelectorRef.current = selector;
  }, []);

  const resetChangedSelector = useCallback(() => {
    changedSelectorRef.current = null;
  }, []);

  return {
    getPickerDayFocusTarget,
    handleBlur,
    handleKeyDown,
    handleKeyUp,
    markSelectorChanged,
    resetChangedSelector,
  };
};

export default useDatePickerKeyboardNavigation;

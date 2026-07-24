import React, { useCallback, useRef } from "react";

import Events from "../../../../__internal__/utils/helpers/events";

type ChangedSelector = "month" | "year";

const preferredDaySelectors = [
  ".rdp-day_button:focus",
  ".rdp-selected .rdp-day_button",
  '.rdp-day_button[aria-selected="true"]',
];
const todayDaySelectors = [".rdp-today .rdp-day_button"];
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

const findFirstEnabledFocusableControl = (
  container: HTMLElement | null,
  selectors: string[],
) => {
  if (!container) return null;

  return (
    selectors
      .flatMap((selector) =>
        Array.from(container.querySelectorAll<HTMLElement>(selector)),
      )
      .find(isEnabledFocusableControl) || null
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
      findFirstEnabledFocusableControl(ref.current, preferredDaySelectors) ||
      findFirstEnabledFocusableControl(ref.current, todayDaySelectors) ||
      findFirstEnabledFocusableControl(ref.current, [allDaySelector]),
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
      if (!activeElement) return;

      const isDayTarget = Boolean(
        activeElement.classList.contains("rdp-day_button") ||
          activeElement.closest(".rdp-day_button"),
      );
      const monthSelector = getPickerSelectorControl(monthSelectId);
      const yearSelector = getPickerSelectorControl(yearSelectId);
      const closeControl = getPickerCloseControl();
      const dayFocusTarget = getPickerDayFocusTarget();
      // Preserve the established built-in cycle: day -> close -> month -> year.
      // Append custom controls in their relative DOM order so adding picker
      // content does not reorder the existing controls.
      const managedControls = [
        dayFocusTarget,
        closeControl,
        monthSelector,
        yearSelector,
      ].filter(isEnabledFocusableControl);
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
        const currentMonthDay = findFirstEnabledFocusableControl(ref.current, [
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
      getPickerCloseControl,
      getPickerDayFocusTarget,
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

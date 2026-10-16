import { useEffect } from "react";

import focusDayWithPickerDescription from "./focusDayWithPickerDescription";

interface UseDatePickerFocusProps {
  open?: boolean;
  pickerDescriptionId: string;
  getPickerDayFocusTarget: () => HTMLElement | null | undefined;
  resetChangedSelector: () => void;
}

/** Moves focus to the preferred day when the picker opens. */
const useDatePickerFocus = ({
  open,
  pickerDescriptionId,
  getPickerDayFocusTarget,
  resetChangedSelector,
}: UseDatePickerFocusProps) => {
  // Focus the selected date, today, or first available day when opening the picker.
  useEffect(() => {
    if (!open) {
      resetChangedSelector();
      return undefined;
    }

    // Wait for the popover content and DayPicker focus effects to finish mounting.
    let removePickerDescriptionFromDay: (() => void) | undefined;
    const timeout = setTimeout(() => {
      const target = getPickerDayFocusTarget();
      if (target) {
        removePickerDescriptionFromDay = focusDayWithPickerDescription(
          target,
          pickerDescriptionId,
        );
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      removePickerDescriptionFromDay?.();
    };
  }, [
    getPickerDayFocusTarget,
    open,
    pickerDescriptionId,
    resetChangedSelector,
  ]);
};

export default useDatePickerFocus;

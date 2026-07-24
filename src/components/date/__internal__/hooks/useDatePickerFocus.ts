import { useEffect } from "react";

interface UseDatePickerFocusProps {
  open?: boolean;
  getPickerDayFocusTarget: () => HTMLElement | null | undefined;
  resetChangedSelector: () => void;
}

const useDatePickerFocus = ({
  open,
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
    const timeout = setTimeout(() => getPickerDayFocusTarget()?.focus(), 0);
    return () => clearTimeout(timeout);
  }, [getPickerDayFocusTarget, open, resetChangedSelector]);
};

export default useDatePickerFocus;

import React, { useEffect } from "react";

interface UseDatePickerAccessibilityProps {
  ref: React.RefObject<HTMLDivElement>;
  open?: boolean;
  focusedMonth?: Date;
  labelledBy: string;
}

const useDatePickerAccessibility = ({
  ref,
  open,
  focusedMonth,
  labelledBy,
}: UseDatePickerAccessibilityProps) => {
  // Associate the picker grid with its month and year controls.
  useEffect(() => {
    if (!open) return;

    ref.current
      ?.querySelector('.rdp-month_grid, table[role="grid"]')
      ?.setAttribute("aria-labelledby", labelledBy);
  }, [focusedMonth, labelledBy, open, ref]);
};

export default useDatePickerAccessibility;

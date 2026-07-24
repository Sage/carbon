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
  useEffect(() => {
    if (!open) return;

    ref.current
      ?.querySelectorAll('.rdp-month_grid, table[role="grid"]')
      .forEach((grid) => grid.setAttribute("aria-labelledby", labelledBy));
  }, [focusedMonth, labelledBy, open, ref]);
};

export default useDatePickerAccessibility;

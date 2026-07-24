import React, { useEffect, useRef } from "react";
import type { DayPickerProps } from "react-day-picker";

import Typography from "../../../typography";

type CalendarDayButtonProps = Parameters<
  NonNullable<NonNullable<DayPickerProps["components"]>["DayButton"]>
>[0];

const CalendarDayButton = ({
  modifiers,
  children,
  "aria-label": ariaLabel,
  ...buttonProps
}: CalendarDayButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button ref={ref} {...buttonProps}>
      {ariaLabel ? (
        <>
          <span aria-hidden="true">{children}</span>
          <Typography as="span" variant="span" screenReaderOnly>
            {ariaLabel}
          </Typography>
        </>
      ) : (
        children
      )}
      {modifiers.today && (
        <span data-role="date-picker-today-indicator" aria-hidden="true" />
      )}
    </button>
  );
};

export default CalendarDayButton;

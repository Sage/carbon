import React from "react";

import {
  CalendarTriggerButton,
  CalendarTriggerControls,
  CalendarTriggerDivider,
  CalendarTriggerDividerWrapper,
} from "./date-input-field.style";

interface DateInputCalendarTriggerProps {
  disabled?: boolean;
  open?: boolean;
  pickerId: string;
  readOnly?: boolean;
  size: "small" | "medium" | "large";
  onClick: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const DateInputCalendarTrigger = ({
  disabled,
  open,
  pickerId,
  readOnly,
  size,
  onClick,
}: DateInputCalendarTriggerProps) => (
  <CalendarTriggerControls>
    <CalendarTriggerDividerWrapper>
      <CalendarTriggerDivider
        type="vertical"
        p={0}
        $disabled={disabled}
        $readOnly={readOnly}
      />
    </CalendarTriggerDividerWrapper>
    <CalendarTriggerButton
      onClick={onClick}
      disabled={disabled || readOnly}
      aria-label="calendar"
      aria-haspopup="dialog"
      aria-controls={pickerId}
      aria-expanded={open}
      $size={size}
      $readOnly={readOnly}
      size={size}
      variant="default"
      variantType="subtle"
      iconType="calendar_today"
      m={0}
    />
  </CalendarTriggerControls>
);

export default DateInputCalendarTrigger;

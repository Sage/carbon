import React from "react";

import {
  DatePickerTriggerButton,
  DatePickerTriggerContainer,
  DatePickerTriggerDivider,
  DatePickerTriggerDividerWrapper,
} from "./date-picker-trigger.style";

interface DatePickerTriggerProps {
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
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
}

const DatePickerTrigger = ({
  disabled,
  open,
  pickerId,
  readOnly,
  size,
  onClick,
  onMouseDown,
}: DatePickerTriggerProps) => (
  <DatePickerTriggerContainer onMouseDown={onMouseDown}>
    <DatePickerTriggerDividerWrapper>
      <DatePickerTriggerDivider
        type="vertical"
        p={0}
        $disabled={disabled}
        $readOnly={readOnly}
      />
    </DatePickerTriggerDividerWrapper>
    <DatePickerTriggerButton
      data-element="calendar"
      data-role="input-icon-toggle"
      onClick={onClick}
      disabled={disabled || readOnly}
      aria-label="calendar"
      aria-haspopup="dialog"
      aria-controls={open ? pickerId : undefined}
      aria-expanded={open}
      $size={size}
      $readOnly={readOnly}
      size={size}
      variant="default"
      variantType="subtle"
      iconType="calendar_today"
      m={0}
    />
  </DatePickerTriggerContainer>
);

export default DatePickerTrigger;

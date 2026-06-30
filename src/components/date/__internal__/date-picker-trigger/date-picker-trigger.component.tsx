import React from "react";

import Icon from "../../../icon";
import StyledDatePickerTriggerButton from "./date-picker-trigger.style";

export interface DatePickerTriggerProps {
  disabled?: boolean;
  onClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onMouseDown: () => void;
  open?: boolean;
  readOnly?: boolean;
}

export const TypicalDatePickerTrigger = ({
  disabled,
  onClick,
  onMouseDown,
  open,
  readOnly,
}: DatePickerTriggerProps) => {
  const isDisabled = disabled || readOnly;

  return (
    <StyledDatePickerTriggerButton
      aria-controls={open ? "styled-day-picker" : undefined}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-label={open ? "Close calendar" : "Open calendar"}
      data-element="date-picker-trigger"
      disabled={isDisabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      type="button"
    >
      <Icon disabled={isDisabled} type="calendar" />
    </StyledDatePickerTriggerButton>
  );
};

export default TypicalDatePickerTrigger;

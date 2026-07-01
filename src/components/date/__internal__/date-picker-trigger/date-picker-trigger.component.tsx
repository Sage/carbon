import React from "react";

import Icon from "../../../icon";
import StyledDatePickerTriggerButton from "./date-picker-trigger.style";

export interface DatePickerTriggerProps {
  disabled?: boolean;
  onClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onMouseDown: () => void;
  open?: boolean;
  pickerId: string;
  readOnly?: boolean;
}

export const TypicalDatePickerTrigger = React.forwardRef<
  HTMLButtonElement,
  DatePickerTriggerProps
>(
  (
    {
      disabled,
      onClick,
      onMouseDown,
      open,
      pickerId,
      readOnly,
    }: DatePickerTriggerProps,
    ref,
  ) => {
    const isDisabled = disabled || readOnly;

    return (
      <StyledDatePickerTriggerButton
        aria-controls={pickerId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close calendar" : "Open calendar"}
        data-element="date-picker-trigger"
        disabled={isDisabled}
        onClick={onClick}
        onMouseDown={onMouseDown}
        ref={ref}
        type="button"
      >
        <Icon disabled={isDisabled} type="calendar" />
      </StyledDatePickerTriggerButton>
    );
  },
);

TypicalDatePickerTrigger.displayName = "TypicalDatePickerTrigger";

export default TypicalDatePickerTrigger;

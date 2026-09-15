import React, { useState } from "react";

import {
  DatePickerTriggerButton,
  DatePickerTriggerContainer,
  DatePickerTriggerDivider,
  DatePickerTriggerDividerWrapper,
  LegacyDatePickerTrigger,
  DatePickerTriggerDescription,
} from "./date-picker-trigger.style";
import Icon from "../../../icon";
import useLocale from "../../../../hooks/__internal__/useLocale";
import guid from "../../../../__internal__/utils/helpers/guid";

interface DatePickerTriggerProps {
  disabled?: boolean;
  open?: boolean;
  pickerId: string;
  readOnly?: boolean;
  size: "small" | "medium" | "large";
  variant: "legacy" | "typical";
  onClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
}

const DatePickerTrigger = ({
  disabled,
  open,
  pickerId,
  readOnly,
  size,
  variant,
  onClick,
  onMouseDown,
}: DatePickerTriggerProps) => {
  const locale = useLocale();
  const [triggerDescriptionId] = useState(
    () => `date-picker-trigger-description-${guid()}`,
  );

  if (variant === "legacy") {
    return (
      <LegacyDatePickerTrigger
        data-element="calendar"
        data-role="input-icon-toggle"
        aria-hidden="true"
        $disabled={disabled}
        $readOnly={readOnly}
        $size={size}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >
        <Icon type="calendar_today" />
      </LegacyDatePickerTrigger>
    );
  }

  return (
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
        aria-label={locale.date.ariaLabels.openCalendarButton?.()}
        aria-describedby={triggerDescriptionId}
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
      <DatePickerTriggerDescription id={triggerDescriptionId}>
        {locale.date.ariaLabels.openCalendarDescription?.()}
      </DatePickerTriggerDescription>
    </DatePickerTriggerContainer>
  );
};

export default DatePickerTrigger;

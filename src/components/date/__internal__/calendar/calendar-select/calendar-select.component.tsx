import React, { forwardRef } from "react";

import tagComponent, {
  TagProps,
} from "../../../../../__internal__/utils/helpers/tags/tags";
import Icon from "../../../../icon";

import {
  StyledIcon,
  StyledSelect,
  StyledWrapper,
} from "./calendar-select.style";
import { CalendarSelectSize } from "./calendar-select.config";
import useCustomizableSelectMarkup from "./useCustomizableSelectMarkup";

export interface CalendarSelectOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface CalendarSelectProps
  extends Omit<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      "children" | "multiple" | "size"
    >,
    TagProps {
  options?: CalendarSelectOption[];
  size?: CalendarSelectSize;
}

export const CalendarSelect = forwardRef<
  HTMLSelectElement,
  CalendarSelectProps
>(
  (
    {
      className,
      options,
      size = "medium",
      value,
      "data-element": dataElement,
      "data-role": dataRole,
      ...rest
    },
    ref,
  ) => {
    const valueProps =
      value === undefined ? {} : { value: String(value ?? "") };
    const selectRef = useCustomizableSelectMarkup(ref);

    return (
      <StyledWrapper
        className={className}
        {...tagComponent("calendar-select", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
      >
        <StyledSelect ref={selectRef} $size={size} {...valueProps} {...rest}>
          {options?.map((option) => (
            <option
              key={String(option.value)}
              value={String(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </StyledSelect>
        <StyledIcon aria-hidden $size={size}>
          <Icon type="caret_down" />
        </StyledIcon>
      </StyledWrapper>
    );
  },
);

CalendarSelect.displayName = "CalendarSelect";

export default CalendarSelect;

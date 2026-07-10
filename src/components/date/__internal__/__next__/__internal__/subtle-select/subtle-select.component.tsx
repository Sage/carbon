import React, { forwardRef } from "react";

import tagComponent, {
  TagProps,
} from "../../../../../../__internal__/utils/helpers/tags/tags";
import Icon from "../../../../../icon";

import { StyledIcon, StyledSelect, StyledWrapper } from "./subtle-select.style";
import { SubtleSelectSize } from "./subtle-select.config";
import useCustomizableSelectMarkup from "./use-customizable-select-markup";

export interface SubtleSelectOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SubtleSelectProps
  extends Omit<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      "children" | "multiple" | "size"
    >,
    TagProps {
  options?: SubtleSelectOption[];
  size?: SubtleSelectSize;
}

export const SubtleSelect = forwardRef<HTMLSelectElement, SubtleSelectProps>(
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
        {...tagComponent("subtle-select", {
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
        <StyledIcon aria-hidden>
          <Icon type="caret_down" />
        </StyledIcon>
      </StyledWrapper>
    );
  },
);

SubtleSelect.displayName = "SubtleSelect";

export default SubtleSelect;

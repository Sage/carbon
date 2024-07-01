import React from "react";
import {
  StyledSelectText,
  StyledSelectTextChildrenWrapper,
} from "./select-text.style";

export interface SelectTextProps {
  /** If true the Component will be disabled */
  disabled?: boolean;
  /** Value to be displayed */
  formattedValue?: string;
  /** Callback function for when the component is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Callback function for when the key is pressed when focused on Select Text. */
  /** Callback function for when the left mouse key is pressed when focused on Select Text. */
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Placeholder string to be displayed when formattedValue is empty */
  placeholder?: string;
  /** If true the Component will be read-only */
  readOnly?: boolean;
  /** If true the component has no border and a transparent background */
  transparent?: boolean;
  /** Component size */
  size?: "small" | "medium" | "large";
}

const SelectText = ({
  disabled,
  formattedValue = "",
  onClick,
  onMouseDown,
  placeholder,
  readOnly,
  transparent,
  size = "medium",
}: SelectTextProps) => {
  const hasPlaceholder = !disabled && !readOnly && !formattedValue;

  return (
    <StyledSelectText
      aria-hidden
      data-element="select-text"
      disabled={disabled}
      hasPlaceholder={hasPlaceholder}
      onClick={onClick}
      onMouseDown={onMouseDown}
      readOnly={readOnly}
      transparent={transparent}
      size={size}
    >
      <StyledSelectTextChildrenWrapper>
        {hasPlaceholder ? placeholder : formattedValue}
      </StyledSelectTextChildrenWrapper>
    </StyledSelectText>
  );
};

export default SelectText;

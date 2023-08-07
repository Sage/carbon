import React from "react";
import StyledSelectText from "./select-text.style";

export interface SelectTextProps {
  /** If true the Component will be disabled */
  disabled?: boolean;
  /** Value to be displayed */
  formattedValue?: string;
  /** Label id passed from Select component  */
  labelId?: string;
  /** If true, the list is displayed */
  isOpen?: boolean;
  /** Callback function for when the Select Textbox loses it's focus. */
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** Callback function for when the component is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Callback function for when the Select Textbox is focused. */
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** Callback function for when the key is pressed when focused on Select Text. */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLElement>) => void;
  /** Callback function for when the left mouse key is pressed when focused on Select Text. */
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Placeholder string to be displayed when formattedValue is empty */
  placeholder?: string;
  /** If true the Component will be read-only */
  readOnly?: boolean;
  /** If true the component has no border and a transparent background */
  transparent?: boolean;
  /** Id of the Select Text element */
  textId?: string;
  /** Component size */
  size?: "small" | "medium" | "large";
}

const SelectText = ({
  disabled,
  formattedValue = "",
  onClick,
  onKeyDown,
  onMouseDown,
  placeholder,
  readOnly,
  textId,
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
      id={textId}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      readOnly={readOnly}
      role="button"
      tabIndex={-1}
      transparent={transparent}
      size={size}
    >
      {hasPlaceholder ? placeholder : formattedValue}
    </StyledSelectText>
  );
};

export default SelectText;

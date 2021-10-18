import React, { useContext } from "react";
import PropTypes from "prop-types";
import StyledSelectText from "./select-text.style";
import useLocale from "../../../../hooks/__internal__/useLocale";
import { InputContext } from "../../../../__internal__/input-behaviour";

const SelectText = ({
  disabled,
  formattedValue,
  labelId,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
  onMouseDown,
  placeholder,
  readOnly,
  textId,
  transparent,
}) => {
  const l = useLocale();
  const inputContext = useContext(InputContext);
  const hasPlaceholder = !disabled && !readOnly && !formattedValue;
  const placeholderText = hasPlaceholder
    ? placeholder || l.select.placeholder()
    : "";

  function handleFocus(event) {
    inputContext.onFocus(event);

    if (onFocus) {
      onFocus(event);
    }
  }

  function handleBlur(event) {
    inputContext.onBlur(event);

    if (onBlur) {
      onBlur(event);
    }
  }

  return (
    <StyledSelectText
      aria-haspopup="listbox"
      aria-labelledby={labelId}
      data-element="select-text"
      disabled={disabled}
      hasPlaceholder={hasPlaceholder}
      id={textId}
      onBlur={handleBlur}
      onClick={onClick}
      onFocus={handleFocus}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      readOnly={readOnly}
      role="combobox"
      tabIndex="0"
      transparent={transparent}
    >
      {formattedValue || placeholderText}
    </StyledSelectText>
  );
};

SelectText.propTypes = {
  /** If true the Component will be disabled */
  disabled: PropTypes.bool,
  /** Value to be displayed */
  formattedValue: PropTypes.string,
  /** Label id passed from Select component  */
  labelId: PropTypes.string,
  /** Callback function for when the Select Textbox loses it's focus. */
  onBlur: PropTypes.func,
  /** Callback function for when the component is clicked. */
  onClick: PropTypes.func,
  /** Callback function for when the Select Textbox is focused. */
  onFocus: PropTypes.func,
  /** Callback function for when the key is pressed when focused on Select Text. */
  onKeyDown: PropTypes.func,
  /** Callback function for when the left mouse key is pressed when focused on Select Text. */
  onMouseDown: PropTypes.func,
  /** Placeholder string to be displayed when formattedValue is empty */
  placeholder: PropTypes.string,
  /** If true the Component will be read-only */
  readOnly: PropTypes.bool,
  /** If true the component has no border and a transparent background */
  transparent: PropTypes.bool,
  /** Id of the Select Text element */
  textId: PropTypes.string,
};

export default SelectText;

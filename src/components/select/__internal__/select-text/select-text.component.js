import React from "react";
import PropTypes from "prop-types";
import StyledSelectText from "./select-text.style";

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
}) => {
  const hasPlaceholder = !disabled && !readOnly && !formattedValue;

  function handleClick(event) {
    onClick(event);
  }

  return (
    <StyledSelectText
      aria-hidden
      data-element="select-text"
      disabled={disabled}
      hasPlaceholder={hasPlaceholder}
      id={textId}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      readOnly={readOnly}
      role="button"
      tabIndex="-1"
      transparent={transparent}
      size={size}
    >
      {hasPlaceholder ? placeholder : formattedValue}
    </StyledSelectText>
  );
};

SelectText.propTypes = {
  /** If true the Component will be disabled */
  disabled: PropTypes.bool,
  /** Value to be displayed */
  formattedValue: PropTypes.string,
  /** Callback function for when the component is clicked. */
  onClick: PropTypes.func,
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
  /** Component size */
  size: PropTypes.string,
};

export default SelectText;

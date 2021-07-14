import React, { useContext } from "react";
import PropTypes from "prop-types";
import HiddenCheckableInputStyle from "./hidden-checkable-input.style";
import { InputContext, InputGroupContext } from "../input-behaviour";

const HiddenCheckableInput = ({
  helpId,
  labelId,
  name,
  inputType,
  inputValue,
  tabindex,
  inputRef,
  ...props
}) => {
  const { onBlur, onFocus, onMouseEnter, onMouseLeave } = useContext(
    InputContext
  );
  const {
    onBlur: onBlurGroup,
    onFocus: onFocusGroup,
    onMouseEnter: onMouseEnterGroup,
    onMouseLeave: onMouseLeaveGroup,
  } = useContext(InputGroupContext);

  const handleFocus = (ev) => {
    if (props.onFocus) props.onFocus(ev);
    if (onFocus) onFocus(ev);
    if (onFocusGroup) onFocusGroup(ev);
  };

  const handleBlur = (ev) => {
    if (props.onBlur) props.onBlur(ev);
    if (onBlur) onBlur(ev);
    if (onBlurGroup) onBlurGroup(ev);
  };

  const handleMouseEnter = (ev) => {
    if (onMouseEnter) onMouseEnter(ev);
    if (onMouseEnterGroup) onMouseEnterGroup(ev);
  };

  const handleMouseLeave = (ev) => {
    if (onMouseLeave) onMouseLeave(ev);
    if (onMouseLeaveGroup) onMouseLeaveGroup(ev);
  };

  return (
    <HiddenCheckableInputStyle
      aria-checked={props.checked}
      aria-labelledby={labelId}
      aria-describedby={helpId}
      name={name}
      role={inputType}
      tabIndex={tabindex}
      type={inputType}
      value={inputValue}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={inputRef}
    />
  );
};

HiddenCheckableInput.propTypes = {
  checked: PropTypes.bool,
  labelId: PropTypes.string,
  helpId: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  inputType: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  tabindex: PropTypes.number,
  /** A callback to retrieve the input reference */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default React.memo(HiddenCheckableInput);

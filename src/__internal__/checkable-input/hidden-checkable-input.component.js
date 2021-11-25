import React, { useContext } from "react";
import PropTypes from "prop-types";
import HiddenCheckableInputStyle from "./hidden-checkable-input.style";
import { InputContext, InputGroupContext } from "../input-behaviour";

const HiddenCheckableInput = ({
  helpId,
  fieldHelpId,
  labelId,
  name,
  checked,
  type,
  value,
  inputRef,
  onChange,
  autoFocus,
  ariaLabelledBy,
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
    if (props.onMouseEnter) props.onMouseEnter(ev);
    if (onMouseEnter) onMouseEnter(ev);
    if (onMouseEnterGroup) onMouseEnterGroup(ev);
  };

  const handleMouseLeave = (ev) => {
    if (props.onMouseLeave) props.onMouseLeave(ev);
    if (onMouseLeave) onMouseLeave(ev);
    if (onMouseLeaveGroup) onMouseLeaveGroup(ev);
  };

  const ariaDescribedBy = [fieldHelpId, helpId].filter(Boolean).join(" ");

  return (
    <HiddenCheckableInputStyle
      autoFocus={autoFocus}
      aria-checked={checked}
      checked={checked}
      aria-labelledby={ariaLabelledBy || labelId}
      aria-describedby={ariaDescribedBy}
      name={name}
      role={type}
      type={type}
      value={value}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onChange={onChange}
      ref={inputRef}
    />
  );
};

HiddenCheckableInput.propTypes = {
  /** Allows component to be focused on page load */
  autoFocus: PropTypes.bool,
  /** Checked state of the input */
  checked: PropTypes.bool,
  /** Element id for aria-describedby */
  helpId: PropTypes.string,
  /** Element id for aria-describedby */
  fieldHelpId: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
  /** OnChange event handler */
  onChange: PropTypes.func,
  /** OnFocus event handler */
  onFocus: PropTypes.func,
  /** Blur event handler */
  onBlur: PropTypes.func,
  /** OnMouseLeave event handler */
  onMouseLeave: PropTypes.func,
  /** OnMouseEnter event handler */
  onMouseEnter: PropTypes.func,
  /** Element id for aria-labelledby */
  labelId: PropTypes.string,
  /** HTML type attribute of the input */
  type: PropTypes.string.isRequired,
  /** Value of the input */
  value: PropTypes.string,
  /** A callback to retrieve the input reference */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /** The id of the element that labels the input */
  ariaLabelledBy: PropTypes.string,
};

export default React.memo(HiddenCheckableInput);

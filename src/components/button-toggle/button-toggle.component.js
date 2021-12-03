import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleContentWrapper,
} from "./button-toggle.style";
import guid from "../../__internal__/utils/helpers/guid";
import ButtonToggleIcon from "./button-toggle-icon.component";
import ButtonToggleInput from "./button-toggle-input.component";

import { InputGroupContext } from "../../__internal__/input-behaviour";

const ButtonToggle = (props) => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    buttonIcon,
    buttonIconSize,
    checked,
    children,
    "data-component": dataComponent,
    "data-element": dataElement,
    "data-role": dataRole,
    disabled,
    grouped,
    name,
    onBlur,
    onChange,
    onFocus,
    size,
    value,
  } = props;
  const { onMouseEnter, onMouseLeave } = useContext(InputGroupContext);

  const inputGuid = guid();
  const inputRef = useRef(null);
  let icon;

  if (buttonIcon) {
    icon = (
      <ButtonToggleIcon
        aria-hidden
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
        hasNoContent={!children}
        disabled={disabled}
      />
    );
  }

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <StyledButtonToggle
      data-component={dataComponent || "button-toggle"}
      data-element={dataElement}
      data-role={dataRole}
      grouped={grouped}
      onClick={handleClick}
    >
      <ButtonToggleInput
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-element="button-toggle-input"
        name={name}
        checked={checked}
        disabled={disabled}
        guid={inputGuid}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />
      <StyledButtonToggleLabel
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
        disabled={disabled}
        htmlFor={inputGuid}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        size={size}
      >
        <StyledButtonToggleContentWrapper>
          {icon}
          {children}
        </StyledButtonToggleContentWrapper>
      </StyledButtonToggleLabel>
    </StyledButtonToggle>
  );
};

ButtonToggle.propTypes = {
  /** Prop to specify the aria-label of the component */
  "aria-label": PropTypes.string,
  /** Prop to specify the aria-labelledby property of the component */
  "aria-labelledby": PropTypes.string,
  /** Set the checked value of the radio button */
  checked: PropTypes.bool,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /** Name used on the hidden radio button. */
  name: PropTypes.string,
  /** Callback triggered by change event on the input. */
  onChange: PropTypes.func,
  /** Callback triggered by focus event on the input. */
  onFocus: PropTypes.func,
  /** Callback triggered by blur event on the input. */
  onBlur: PropTypes.func,
  /** ButtonToggle size */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** buttonIcon to render. */
  buttonIcon: PropTypes.string,
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize: PropTypes.oneOf(["small", "large"]),
  /** Remove spacing from between buttons. */
  grouped: PropTypes.bool,
  /** Disable all user interaction. */
  disabled: PropTypes.bool,
  /** A required prop. This is the button text. */
  children: PropTypes.node.isRequired,
  /** Set the default value of the Group if component is meant to be used as uncontrolled. */
  defaultChecked: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /** Value for the input */
  value: PropTypes.string,
};

ButtonToggle.defaultProps = {
  size: "medium",
  buttonIconSize: "small",
};

ButtonToggle.displayName = "ButtonToggle";
export default ButtonToggle;

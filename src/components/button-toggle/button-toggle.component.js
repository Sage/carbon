import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleContentWrapper,
} from "./button-toggle.style";
import guid from "../../utils/helpers/guid";
import ButtonToggleIcon from "./button-toggle-icon.component";
import ButtonToggleInput from "./button-toggle-input.component";
import OptionsHelper from "../../utils/helpers/options-helper";

import { InputGroupContext } from "../../__internal__/input-behaviour";

const ButtonToggle = (props) => {
  const {
    name,
    checked,
    grouped,
    children,
    disabled,
    buttonIcon,
    buttonIconSize,
    onChange,
    onFocus,
    onBlur,
    value,
  } = props;
  const { onMouseEnter, onMouseLeave } = useContext(InputGroupContext);

  const inputGuid = guid();
  const inputRef = useRef(null);
  let icon;

  if (buttonIcon) {
    icon = (
      <ButtonToggleIcon
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
        disabled={disabled}
      />
    );
  }

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <StyledButtonToggle
      data-component="button-toggle"
      grouped={grouped}
      onClick={handleClick}
    >
      <ButtonToggleInput
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
  /** Set the checked value of the radio button */
  checked: PropTypes.bool,
  /** Name used on the hidden radio button. */
  name: PropTypes.string,
  /** Callback triggered by change event on the input. */
  onChange: PropTypes.func,
  /** Callback triggered by focus event on the input. */
  onFocus: PropTypes.func,
  /** Callback triggered by blur event on the input. */
  onBlur: PropTypes.func,
  /** buttonIcon to render. */
  buttonIcon: PropTypes.string,
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize: PropTypes.oneOf(OptionsHelper.sizesBinary),
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
  buttonIconSize: "small",
};

export default ButtonToggle;

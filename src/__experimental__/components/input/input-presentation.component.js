import React, { useContext } from "react";
import PropTypes from "prop-types";

import OptionsHelper from "../../../utils/helpers/options-helper";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "./input-presentation.style";
import extractProps from "../../../utils/helpers/extract-props";
import Logger from "../../../utils/logger/logger";

import {
  InputContext,
  InputGroupContext,
} from "../../../__internal__/input-behaviour";

let deprecatedWarnTriggered = false;

const InputPresentation = (props) => {
  const { hasFocus, onMouseDown, onMouseEnter, onMouseLeave } = useContext(
    InputContext
  );

  const {
    onMouseEnter: onGroupMouseEnter,
    onMouseLeave: onGroupMouseLeave,
  } = useContext(InputGroupContext);

  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate(
      "`styleOverride` that is used in the `InputPresentation` component is deprecated and will soon be removed."
    );
  }
  const {
    children,
    styleOverride,
    positionedChildren,
    inputWidth,
    ...rest
  } = props;
  const styleProps = extractProps(rest, InputPresentationStyle);

  const handleMouseEnter = (e) => {
    if (onMouseEnter) onMouseEnter(e);
    if (onGroupMouseEnter) onGroupMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    if (onMouseLeave) onMouseLeave(e);
    if (onGroupMouseLeave) onGroupMouseLeave(e);
  };

  return (
    <StyledInputPresentationContainer inputWidth={inputWidth}>
      {positionedChildren}
      <InputPresentationStyle
        hasFocus={hasFocus}
        role="presentation"
        onMouseDown={onMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        styleOverride={styleOverride}
        {...styleProps}
      >
        {children}
      </InputPresentationStyle>
    </StyledInputPresentationContainer>
  );
};

InputPresentation.propTypes = {
  children: PropTypes.node,
  /** Allows to override existing component styles */
  align: PropTypes.string,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  inputWidth: PropTypes.number,
  readOnly: PropTypes.bool,
  positionedChildren: PropTypes.node,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default InputPresentation;

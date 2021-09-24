import React, { useContext } from "react";
import PropTypes from "prop-types";

import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "./input-presentation.style";
import { InputContext, InputGroupContext } from "../input-behaviour";

const InputPresentation = ({
  children,
  positionedChildren,
  inputWidth,
  align,
  disabled,
  readOnly,
  size,
  error,
  warning,
  info,
}) => {
  const { hasFocus, onMouseDown, onMouseEnter, onMouseLeave } = useContext(
    InputContext
  );

  const {
    onMouseEnter: onGroupMouseEnter,
    onMouseLeave: onGroupMouseLeave,
  } = useContext(InputGroupContext);

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
        align={align}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        warning={warning}
        error={error}
        info={info}
      >
        {children}
      </InputPresentationStyle>
    </StyledInputPresentationContainer>
  );
};

InputPresentation.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
  disabled: PropTypes.bool,
  inputWidth: PropTypes.number,
  readOnly: PropTypes.bool,
  positionedChildren: PropTypes.node,
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default InputPresentation;

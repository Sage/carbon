import React, { useContext } from "react";
import PropTypes from "prop-types";

import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "./input-presentation.style";
import extractProps from "../../utils/helpers/extract-props";
import { InputContext, InputGroupContext } from "../input-behaviour";

const InputPresentation = ({
  children,
  positionedChildren,
  inputWidth,
  ...rest
}) => {
  const { hasFocus, onMouseDown, onMouseEnter, onMouseLeave } = useContext(
    InputContext
  );

  const {
    onMouseEnter: onGroupMouseEnter,
    onMouseLeave: onGroupMouseLeave,
  } = useContext(InputGroupContext);

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
        {...styleProps}
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
  hasFocus: PropTypes.bool,
  inputWidth: PropTypes.number,
  readOnly: PropTypes.bool,
  positionedChildren: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default InputPresentation;

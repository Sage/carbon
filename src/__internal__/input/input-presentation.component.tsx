import React, { useContext } from "react";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "./input-presentation.style";
import { InputContext, InputGroupContext } from "../input-behaviour";
import { NewValidationContext } from "../../components/carbon-provider/carbon-provider.component";
import { ValidationPropTypes } from "../validations";

export type Sizes = "small" | "medium" | "large";

export interface CommonInputPresentationProps extends ValidationPropTypes {
  children: React.ReactNode;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** The default value alignment on the input */
  align?: string;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Size of an input */
  size?: Sizes;
}

export interface InputPresentationProps extends CommonInputPresentationProps {
  /** Content to be rendered before the input */
  positionedChildren?: React.ReactNode;
}

const InputPresentation = ({
  children,
  positionedChildren,
  inputWidth,
  align,
  disabled,
  readOnly,
  size = "medium",
  error,
  warning,
  info,
}: InputPresentationProps): JSX.Element => {
  const { hasFocus, onMouseDown, onMouseEnter, onMouseLeave } = useContext(
    InputContext
  );
  const { validationRedesignOptIn } = useContext(NewValidationContext);

  const {
    onMouseEnter: onGroupMouseEnter,
    onMouseLeave: onGroupMouseLeave,
  } = useContext(InputGroupContext);

  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter();
    if (onGroupMouseEnter) onGroupMouseEnter();
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) onMouseLeave();
    if (onGroupMouseLeave) onGroupMouseLeave();
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
        validationRedesignOptIn={validationRedesignOptIn}
      >
        {children}
      </InputPresentationStyle>
    </StyledInputPresentationContainer>
  );
};

export default InputPresentation;

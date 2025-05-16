import React, { useContext } from "react";
import { BorderRadiusType } from "../../components/box/box.component";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "./input-presentation.style";
import { InputContext, InputGroupContext } from "../input-behaviour";
import NewValidationContext from "../../components/carbon-provider/__internal__/new-validation.context";
import { ValidationProps } from "../validations";

export type Sizes = "small" | "medium" | "large";

export interface CommonInputPresentationProps extends ValidationProps {
  children: React.ReactNode;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** The default value alignment on the input */
  align?: string;
  /** Emphasized part of the displayed text */
  prefix?: string;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /**
   * Prop for specifying the max-width of the input.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Size of an input */
  size?: Sizes;
  /** If true, the component has an icon rendered inside */
  hasIcon?: boolean;
  /** Specify a custom border radius. Any valid border-radius design token, or an array of border-radius design tokens. */
  borderRadius?: BorderRadiusType | BorderRadiusType[];
  /** Renders with transparent borders. This will not effect focus styling or validation borders  */
  hideBorders?: boolean;
}

export interface InputPresentationProps extends CommonInputPresentationProps {
  /** Content to be rendered before the input */
  positionedChildren?: React.ReactNode;
}

const InputPresentation = ({
  align,
  borderRadius = "borderRadius050",
  children,
  disabled,
  error,
  hasIcon,
  hideBorders = false,
  info,
  inputWidth,
  maxWidth,
  positionedChildren,
  prefix,
  readOnly,
  size = "medium",
  warning,
}: InputPresentationProps): JSX.Element => {
  const { hasFocus, onMouseDown, onMouseEnter, onMouseLeave } =
    useContext(InputContext);
  const { validationRedesignOptIn } = useContext(NewValidationContext);

  const { onMouseEnter: onGroupMouseEnter, onMouseLeave: onGroupMouseLeave } =
    useContext(InputGroupContext);

  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter();
    if (onGroupMouseEnter) onGroupMouseEnter();
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) onMouseLeave();
    if (onGroupMouseLeave) onGroupMouseLeave();
  };

  return (
    <StyledInputPresentationContainer
      inputWidth={inputWidth}
      maxWidth={maxWidth}
      data-role="input-presentation-container"
    >
      {positionedChildren}
      <InputPresentationStyle
        hasFocus={hasFocus}
        role="presentation"
        data-role="input-presentation"
        onMouseDown={onMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        align={align}
        prefix={prefix}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        warning={warning}
        error={error}
        info={info}
        validationRedesignOptIn={validationRedesignOptIn}
        hasIcon={hasIcon}
        borderRadius={borderRadius}
        hideBorders={hideBorders}
      >
        {children}
      </InputPresentationStyle>
    </StyledInputPresentationContainer>
  );
};

export default InputPresentation;

import React, { useState, useContext } from "react";
import { TooltipPositions } from "components/tooltip/tooltip.config";
import Help from "../../components/help";
import StyledLabel, {
  StyledLabelContainer,
  StyledLabelProps,
  StyledLabelContainerProps,
} from "./label.style";
import ValidationIcon from "../validations/validation-icon.component";
import StyledIconWrapper from "./icon-wrapper.style";
import { InputContext, InputGroupContext } from "../input-behaviour";
import { ValidationProps } from "../validations";
import { IconType } from "../../components/icon";

export interface LabelProps
  extends ValidationProps,
    StyledLabelProps,
    StyledLabelContainerProps {
  /** Children elements */
  children?: React.ReactNode;
  /** A message that the Help component will display */
  help?: React.ReactNode;
  /** Icon type */
  helpIcon?: IconType;
  /** A string that represents the ID of another form element */
  htmlFor?: string;
  /** The unique id of the label element */
  labelId?: string;
  /** The unique id of the Help component tooltip, used for accessibility */
  tooltipId?: string;
  /** Whether to show the validation icon */
  useValidationIcon?: boolean;
  /** Id of the validation icon */
  validationIconId?: string;
}

const shouldDisplayValidationIcon = ({
  error,
  warning,
  info,
  disabled,
}: ValidationProps & { disabled?: boolean }) => {
  const validation = error || warning || info;
  return disabled ? false : typeof validation === "string";
};

const tooltipPosition = ({
  error,
  warning,
  info,
  inline,
}: ValidationProps & { inline?: boolean }): TooltipPositions => {
  return (error || warning || info) && inline ? "top" : "right";
};

export const Label = ({
  align = "right",
  children,
  disabled,
  error,
  help,
  helpIcon,
  htmlFor,
  info,
  inline,
  isRequired,
  labelId,
  optional,
  pr,
  pl,
  tooltipId,
  useValidationIcon = true,
  validationIconId,
  warning,
  width = 30,
}: LabelProps) => {
  const [isFocused, setFocus] = useState(false);
  const { onMouseEnter, onMouseLeave } = useContext(InputContext);
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

  const icon = () => {
    const wrapperProps = {
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
    };

    if (
      useValidationIcon &&
      shouldDisplayValidationIcon({
        error,
        warning,
        info,
        disabled,
      })
    ) {
      const tooltipPositionValue = tooltipPosition({
        error,
        warning,
        info,
        inline,
      });
      return (
        <StyledIconWrapper>
          <ValidationIcon
            iconId={validationIconId}
            tooltipId={tooltipId}
            error={error}
            warning={warning}
            info={info}
            tooltipPosition={tooltipPositionValue}
            tooltipFlipOverrides={["top", "bottom"]}
          />
        </StyledIconWrapper>
      );
    }

    return (
      help && (
        <StyledIconWrapper {...wrapperProps}>
          <Help tooltipId={tooltipId} type={helpIcon} isFocused={isFocused}>
            {help}
          </Help>
        </StyledIconWrapper>
      )
    );
  };

  return (
    <StyledLabelContainer
      align={align}
      inline={inline}
      width={width}
      optional={optional}
      pr={pr}
      pl={pl}
    >
      <StyledLabel
        data-element="label"
        disabled={disabled}
        id={labelId}
        htmlFor={htmlFor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isRequired={isRequired}
      >
        {children}
      </StyledLabel>
      {icon()}
    </StyledLabelContainer>
  );
};

export default React.memo(Label);

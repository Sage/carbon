import React, { useState, useContext, useRef } from "react";
import { TooltipPositions } from "../../components/tooltip/tooltip.config";
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
import createGuid from "../../__internal__/utils/helpers/guid";
import HintText from "../hint-text";
import newValidationContext from "../../components/carbon-provider/__internal__/new-validation.context";

export interface LabelProps
  extends ValidationProps,
    StyledLabelProps,
    StyledLabelContainerProps {
  /* To use a different HTML element other than <label> */
  as?: "span" | "label";
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
  /**
   * @private
   * @internal
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** @private @internal @ignore */
  inputHint?: string;
  /** @private @internal @ignore */
  inputHintId?: string;
  /** @private @internal @ignore */
  labelHelp?: React.ReactNode;
  /** @private @internal @ignore */
  marginBttom?: string;
  /** Sets aria-label for label element */
  "aria-label"?: string;
  /** Whether this component is shown against a dark background */
  isDarkBackground?: boolean;
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
  align,
  as = "label",
  children,
  disabled,
  error,
  help,
  helpIcon,
  htmlFor,
  info,
  inline,
  isDarkBackground = false,
  isRequired,
  labelId,
  inputHint,
  inputHintId,
  labelHelp,
  pr,
  pl,
  tooltipId,
  useValidationIcon = true,
  validationIconId,
  marginBttom = "8px",
  warning,
  width = 30,
  className,
  "aria-label": ariaLabel,
  isLarge,
}: LabelProps) => {
  const [isFocused, setFocus] = useState(false);
  const { onMouseEnter, onMouseLeave } = useContext(InputContext);
  const { onMouseEnter: onGroupMouseEnter, onMouseLeave: onGroupMouseLeave } =
    useContext(InputGroupContext);
  const guid = useRef(createGuid());

  const { validationRedesignOptIn } = useContext(newValidationContext);

  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter();
    if (onGroupMouseEnter) onGroupMouseEnter();
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) onMouseLeave();
    if (onGroupMouseLeave) onGroupMouseLeave();
  };

  let alignment: StyledLabelContainerProps["align"];
  if (inline && !align) {
    alignment = "right";
  } else if (!align) {
    alignment = "left";
  } else {
    alignment = align;
  }

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
            tooltipId={validationIconId}
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
      data-role="label-container"
      id={`label-container-${labelId ?? guid.current}`}
      align={alignment}
      inline={inline}
      validationRedesignOptIn={validationRedesignOptIn}
      width={width}
      marginBttom={marginBttom}
      pr={pr}
      pl={pl}
      className={className}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <StyledLabel
          data-element="label"
          disabled={disabled}
          id={labelId}
          {...(as === "label" ? { htmlFor } : {})}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isRequired={isRequired}
          as={as}
          aria-label={ariaLabel}
          isDarkBackground={isDarkBackground}
          isLarge={isLarge}
        >
          {children}
        </StyledLabel>
        {(inputHint || (labelHelp && validationRedesignOptIn)) && (
          <HintText
            align={alignment}
            data-element="input-hint"
            id={inputHintId}
            marginBottom="var(--spacing000)"
            isLarge={isLarge}
            isComponentInline={inline}
          >
            {inputHint || labelHelp}
          </HintText>
        )}
      </div>
      {icon()}
    </StyledLabelContainer>
  );
};

export default React.memo(Label);

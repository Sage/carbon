import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Help from "../../../components/help";
import StyledLabel, { StyledLabelContainer } from "./label.style";
import ValidationIcon from "../../../components/validations/validation-icon.component";
import IconWrapperStyle from "./icon-wrapper.style";
import Logger from "../../../utils/logger/logger";
import {
  InputContext,
  InputGroupContext,
} from "../../../__internal__/input-behaviour";

const shouldDisplayValidationIcon = ({ error, warning, info, disabled }) => {
  const validation = error || warning || info;
  return disabled ? false : typeof validation === "string";
};

const tooltipPosition = ({ error, warning, info, inline }) => {
  return (error || warning || info) && inline === true ? "top" : "right";
};

let deprecatedWarnTriggered = false;

const Label = ({
  disabled,
  inline,
  align = "right",
  inputSize,
  width,
  childOfForm,
  optional,
  labelId,
  helpId,
  children,
  error,
  warning,
  info,
  help,
  helpIcon,
  helpTag,
  helpTabIndex,
  useValidationIcon = true,
  htmlFor,
  pr,
  pl,
  isRequired,
  styleOverride = {},
}) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      "`styleOverride` that is used in the `Label` component is deprecated and will soon be removed."
    );
  }
  const [isFocused, setFocus] = useState(false);
  const { onMouseEnter, onMouseLeave } = useContext(InputContext);
  const {
    onMouseEnter: onGroupMouseEnter,
    onMouseLeave: onGroupMouseLeave,
  } = useContext(InputGroupContext);

  const handleMouseEnter = (ev) => {
    if (onMouseEnter) onMouseEnter(ev);
    if (onGroupMouseEnter) onGroupMouseEnter(ev);
  };

  const handleMouseLeave = (ev) => {
    if (onMouseLeave) onMouseLeave(ev);
    if (onGroupMouseLeave) onGroupMouseLeave(ev);
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
        <IconWrapperStyle>
          <ValidationIcon
            iconId={helpId}
            error={error}
            warning={warning}
            info={info}
            tooltipPosition={tooltipPositionValue}
          />
        </IconWrapperStyle>
      );
    }

    return (
      help && (
        <IconWrapperStyle {...wrapperProps}>
          <Help
            helpId={helpId}
            as={helpTag}
            tabIndex={helpTabIndex}
            type={helpIcon}
            isFocused={isFocused}
          >
            {help}
          </Help>
        </IconWrapperStyle>
      )
    );
  };

  return (
    <StyledLabelContainer
      align={align}
      inline={inline}
      inputSize={inputSize}
      width={width}
      optional={optional}
      childOfForm={childOfForm}
      pr={pr}
      pl={pl}
      styleOverride={styleOverride}
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

Label.propTypes = {
  /** Label width */
  width: PropTypes.number,
  /** Label alignment */
  align: PropTypes.oneOf(["left", "right"]),
  /** Size of an input Label is used in */
  inputSize: PropTypes.oneOf(["small", "medium", "large"]),
  /** Flag to indicate that component is used in a Form */
  childOfForm: PropTypes.bool,
  /** When true, label is placed in line an input */
  inline: PropTypes.bool,
  /** If true, the component will be disabled */
  disabled: PropTypes.bool,
  /** Flag to configure component as optional in Form */
  optional: PropTypes.bool,
  /** The unique id of the label element */
  labelId: PropTypes.string,
  /** The unique id of the Help component */
  helpId: PropTypes.string,
  /** Children elements */
  children: PropTypes.node,
  /** Status of error validations */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of warnings */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of info */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** A message that the Help component will display */
  help: PropTypes.string,
  /** Icon type */
  helpIcon: PropTypes.string,
  /** Overrides the default 'as' attribute of the Help component */
  helpTag: PropTypes.string,
  /** Overrides the default tabindex of the Help component */
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Whether to show the validation icon */
  useValidationIcon: PropTypes.bool,
  /** A string that represents the ID of another form element */
  htmlFor: PropTypes.string,
  /** Padding right, integer multiplied by base spacing constant (8) */
  pr: PropTypes.oneOf([1, 2]),
  /** Padding left, integer multiplied by base spacing constant (8) */
  pl: PropTypes.oneOf([1, 2]),
  /** Allows to override existing component styles */
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** Flag to configure component as mandatory */
  isRequired: PropTypes.bool,
};

export default React.memo(Label);

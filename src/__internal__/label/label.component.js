import React, { useContext } from "react";
import PropTypes from "prop-types";
import Help from "../../components/help";
import StyledLabel, { StyledLabelContainer } from "./label.style";
import ValidationIcon from "../validations/validation-icon.component";
import IconWrapperStyle from "./icon-wrapper.style";
import { InputContext, InputGroupContext } from "../input-behaviour";

const shouldDisplayValidationIcon = ({ error, warning, info, disabled }) => {
  const validation = error || warning || info;
  return disabled ? false : typeof validation === "string";
};

const tooltipPosition = ({ error, warning, info, inline }) => {
  return (error || warning || info) && inline === true ? "top" : "right";
};

const Label = ({
  disabled,
  inline,
  align = "right",
  width,
  optional,
  labelId,
  tooltipId,
  children,
  error,
  warning,
  info,
  help,
  helpIcon,
  helpTabIndex,
  useValidationIcon = true,
  htmlFor,
  pr,
  pl,
  isRequired,
}) => {
  const { hasFocus, hasMouseOver, onMouseEnter, onMouseLeave } = useContext(
    InputContext
  );
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
            tooltipId={tooltipId}
            error={error}
            warning={warning}
            info={info}
            tooltipPosition={tooltipPositionValue}
            tooltipFlipOverrides={["top", "bottom"]}
          />
        </IconWrapperStyle>
      );
    }

    return (
      help && (
        <IconWrapperStyle>
          <Help
            tooltipId={tooltipId}
            tabIndex={helpTabIndex}
            type={helpIcon}
            isFocused={hasFocus || hasMouseOver}
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

Label.propTypes = {
  /** Label width */
  width: PropTypes.number,
  /** Label alignment */
  align: PropTypes.oneOf(["left", "right"]),
  /** When true, label is placed in line an input */
  inline: PropTypes.bool,
  /** If true, the component will be disabled */
  disabled: PropTypes.bool,
  /** Flag to configure component as optional in Form */
  optional: PropTypes.bool,
  /** The unique id of the label element */
  labelId: PropTypes.string,
  /** The unique id of the Help component tooltip, used for accessibility */
  tooltipId: PropTypes.string,
  /** Children elements */
  children: PropTypes.node,
  /** Status of error validations */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of warnings */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of info */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** A message that the Help component will display */
  help: PropTypes.node,
  /** Icon type */
  helpIcon: PropTypes.string,
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
  /** Flag to configure component as mandatory */
  isRequired: PropTypes.bool,
};

export default React.memo(Label);

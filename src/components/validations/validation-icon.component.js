import React, { useContext } from "react";
import PropTypes from "prop-types";

import Icon from "../icon";
import ValidationIconStyle from "./validation-icon.style";
import {
  InputContext,
  InputGroupContext,
} from "../../__internal__/input-behaviour";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";

const getValidationType = ({ error, warning, info }) => {
  if (error) return "error";
  if (warning) return "warning";
  if (info) return "info";
  return "";
};

const ValidationIcon = ({
  error,
  warning,
  info,
  size,
  iconId,
  isPartOfInput,
  tabIndex,
  onClick,
  tooltipPosition,
}) => {
  const { hasFocus, hasMouseOver } = useContext(InputContext);
  const {
    hasFocus: groupHasFocus,
    hasMouseOver: groupHasMouseOver,
  } = useContext(InputGroupContext);
  const [triggeredByIcon, setTriggeredByIcon] = React.useState(false);

  const validationType = getValidationType({ error, warning, info });

  const validationMessage = error || warning || info;

  if (typeof validationMessage !== "string") {
    return null;
  }

  return (
    <ValidationIconStyle
      id={iconId}
      validationType={validationType}
      role="tooltip"
      aria-label={validationMessage}
      onClick={onClick}
      onMouseOver={() => setTriggeredByIcon(true)}
      onMouseLeave={() => setTriggeredByIcon(false)}
      onFocus={() => setTriggeredByIcon(true)}
      onBlur={() => setTriggeredByIcon(false)}
    >
      <Icon
        key={`${validationType}-icon`}
        type={validationType}
        tabIndex={tabIndex}
        tooltipMessage={validationMessage}
        tooltipPosition={tooltipPosition}
        tooltipVisible={
          hasFocus ||
          hasMouseOver ||
          groupHasFocus ||
          groupHasMouseOver ||
          triggeredByIcon
        }
        isPartOfInput={isPartOfInput}
        inputSize={size}
      />
    </ValidationIconStyle>
  );
};

ValidationIcon.propTypes = {
  /** A small string to indicate the size of the icon */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** The unique id of the component (used with aria-describedby for accessibility) */
  iconId: PropTypes.string,
  /** Define position of the tooltip */
  tooltipPosition: PropTypes.string,
  /** An onClick handler */
  onClick: PropTypes.func,
  /** A boolean to indicate if the icon is part of an input */
  isPartOfInput: PropTypes.bool,
  /** Overrides the default tabindex of the component */
  tabIndex: PropTypes.number,
  /** Status of error validations */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of warnings */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Status of info */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

ValidationIcon.defaultProps = {
  tooltipPosition: "right",
  tabIndex: -1,
};

export default ValidationIcon;

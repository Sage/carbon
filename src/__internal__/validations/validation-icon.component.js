import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import Icon from "../../components/icon";
import ValidationIconStyle from "./validation-icon.style";
import { InputContext, InputGroupContext } from "../input-behaviour";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

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
  onFocus,
  onBlur,
  iconId,
  isPartOfInput,
  tabIndex,
  onClick,
  tooltipPosition,
  tooltipFlipOverrides,
  ...rest
}) => {
  const { hasFocus, hasMouseOver } = useContext(InputContext);
  const {
    hasFocus: groupHasFocus,
    hasMouseOver: groupHasMouseOver,
  } = useContext(InputGroupContext);
  const [triggeredByIcon, setTriggeredByIcon] = useState(false);

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
      onFocus={(e) => {
        setTriggeredByIcon(true);
        if (onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        setTriggeredByIcon(false);
        if (onBlur) onBlur(e);
      }}
      {...filterStyledSystemMarginProps(rest)}
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
        tooltipFlipOverrides={
          isPartOfInput && !tooltipFlipOverrides
            ? ["top", "bottom"]
            : tooltipFlipOverrides
        }
        isPartOfInput={isPartOfInput}
        inputSize={size}
        aria-hidden="true"
        focusable={false}
      />
    </ValidationIconStyle>
  );
};

ValidationIcon.propTypes = {
  ...marginPropTypes,
  /** A small string to indicate the size of the icon */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** The unique id of the component (used with aria-describedby for accessibility) */
  iconId: PropTypes.string,
  /** Define position of the tooltip */
  tooltipPosition: PropTypes.string,
  /** Overrides the default flip behaviour of the Tooltip, must be an array containing some or all of ["top", "bottom", "left", "right"] (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) */
  tooltipFlipOverrides: (props, propName, componentName) => {
    const prop = props[propName];
    const isValid =
      prop &&
      Array.isArray(prop) &&
      prop.every((placement) =>
        ["bottom", "left", "right", "top"].includes(placement)
      );

    if (!prop || isValid) {
      return null;
    }
    return new Error(
      // eslint-disable-next-line max-len
      `The \`${propName}\` prop supplied to \`${componentName}\` must be an array containing some or all of ["top", "bottom", "left", "right"].`
    );
  },
  /** An onClick handler */
  onClick: PropTypes.func,
  /** An onFocus handler */
  onFocus: PropTypes.func,
  /** An onBlur handler */
  onBlur: PropTypes.func,
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

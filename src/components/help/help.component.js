import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Icon from "../icon";
import tagComponent from "../../utils/helpers/tags";
import StyledHelp from "./help.style";
import Events from "../../utils/helpers/events/events";
import OptionsHelper from "../../utils/helpers/options-helper";

const Help = (props) => {
  const helpElement = useRef(null);
  const [isTooltipVisible, updateTooltipVisible] = useState(false);

  const {
    className,
    href,
    helpId,
    children,
    tabIndex,
    as,
    tooltipPosition,
    isFocused,
    type,
    tooltipBgColor,
    tooltipFontColor,
    tooltipFlipOverrides,
  } = props;

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const tagType = as || (href && "a");

  function handleKeyPress(ev) {
    if (Events.isEscKey(ev)) {
      helpElement.current.blur();
      updateTooltipVisible(false);
    }
  }

  function handleFocusBlur(bool) {
    return () => {
      updateTooltipVisible(bool);
    };
  }

  return (
    <StyledHelp
      role="tooltip"
      className={className}
      as={tagType}
      href={href}
      id={helpId}
      target="_blank"
      rel="noopener noreferrer"
      ref={helpElement}
      onClick={() => {
        helpElement.current.focus();
      }}
      onFocus={handleFocusBlur(true)}
      onBlur={handleFocusBlur(false)}
      onMouseOver={handleFocusBlur(true)}
      onMouseLeave={handleFocusBlur(false)}
      {...tagComponent("help", props)}
      tabIndex={tabIndex}
      value={children}
      aria-label={children}
    >
      <Icon
        type={type}
        tooltipMessage={children}
        tooltipPosition={tooltipPosition}
        tooltipVisible={isFocused || isTooltipVisible}
        tooltipBgColor={tooltipBgColor}
        tooltipFontColor={tooltipFontColor}
        tooltipFlipOverrides={tooltipFlipOverrides}
      />
    </StyledHelp>
  );
};

Help.propTypes = {
  /** [Legacy] A custom class name for the component. */
  className: PropTypes.string,
  /** Message to display in tooltip */
  children: PropTypes.string,
  /** The unique id of the component (used with aria-describedby for accessibility) */
  helpId: PropTypes.string,
  /** Overrides the default tabindex of the component */
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Overrides the default 'as' attribute of the Help component */
  as: PropTypes.string,
  /** Position of tooltip relative to target */
  tooltipPosition: PropTypes.oneOf(OptionsHelper.positions),
  /** A path for the anchor */
  href: PropTypes.string,
  /** A boolean received from IconWrapper */
  isFocused: PropTypes.bool,
  /** Icon to display, can be received from label component */
  type: PropTypes.oneOf(OptionsHelper.icons),
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor: PropTypes.string,
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor: PropTypes.string,
  /** Overrides the default flip behaviour of the Tooltip, must be an array containing some or all of ["top", "bottom", "left", "right"] (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) */
  tooltipFlipOverrides: (props, propName, componentName) => {
    const prop = props[propName];
    const isValid =
      prop &&
      Array.isArray(prop) &&
      prop.every((placement) => OptionsHelper.positions.includes(placement));

    if (!prop || isValid) {
      return null;
    }
    return new Error(
      // eslint-disable-next-line max-len
      `The \`${propName}\` prop supplied to \`${componentName}\` must be an array containing some or all of ["top", "bottom", "left", "right"].`
    );
  },
};

Help.defaultProps = {
  tooltipPosition: "top",
  tabIndex: 0,
  type: "help",
};

export default Help;

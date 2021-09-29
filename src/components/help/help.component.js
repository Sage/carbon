import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import Icon from "../icon";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledHelp from "./help.style";
import Events from "../../__internal__/utils/helpers/events";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { HELP_POSITIONS } from "./help.config";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Help = ({
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
  ...rest
}) => {
  const helpElement = useRef(null);
  const [isTooltipVisible, updateTooltipVisible] = useState(false);

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
      {...tagComponent("help", rest)}
      tabIndex={tabIndex}
      {...filterStyledSystemMarginProps(rest)}
      {...rest}
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
  ...marginPropTypes,
  /** [Legacy] A custom class name for the component. */
  className: PropTypes.string,
  /** Message to display in tooltip */
  children: PropTypes.node,
  /** The unique id of the component (used with aria-describedby for accessibility) */
  helpId: PropTypes.string,
  /** Overrides the default tabindex of the component */
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Overrides the default 'as' attribute of the Help component */
  as: PropTypes.string,
  /** Position of tooltip relative to target */
  tooltipPosition: PropTypes.oneOf(["bottom", "left", "right", "top"]),
  /** A path for the anchor */
  href: PropTypes.string,
  /** A boolean received from IconWrapper */
  isFocused: PropTypes.bool,
  /** <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Icon to display, can be received from label component
   *
   */
  type: PropTypes.string,
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
      prop.every((placement) => HELP_POSITIONS.includes(placement));

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

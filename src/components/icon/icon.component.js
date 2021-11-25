import React, { useContext } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledIcon from "./icon.style";
import Tooltip from "../tooltip";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { ICON_TOOLTIP_POSITIONS } from "./icon-config";
import { TooltipContext } from "../../__internal__/tooltip-provider";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Icon = React.forwardRef(
  (
    {
      bg,
      bgShape,
      bgSize,
      className,
      color,
      disabled,
      fontSize,
      type,
      tooltipMessage,
      tooltipPosition,
      tooltipVisible,
      tooltipBgColor,
      tooltipFontColor,
      tooltipFlipOverrides,
      tabIndex,
      isPartOfInput,
      inputSize,
      role,
      ariaLabel,
      focusable = true,
      ...rest
    },
    ref
  ) => {
    const isInteractive = !!tooltipMessage && !disabled;

    /** Return Icon type with overrides */
    const iconType = () => {
      // switch tweaks icon names for actual icons in the set
      switch (type) {
        case "help":
          return "question";
        case "maintenance":
          return "settings";
        case "new":
          return "gift";
        case "success":
          return "tick";
        case "messages":
        case "email":
          return "message";
        default:
          return type;
      }
    };

    const hasTooltip = !disabled && tooltipMessage && focusable;

    const styleProps = {
      bg,
      bgSize,
      bgShape,
      color,
      disabled,
      fontSize,
      isInteractive,
      type: iconType(),
      tabIndex: hasTooltip && tabIndex === undefined ? 0 : tabIndex,
      ...filterStyledSystemMarginProps(rest),
    };

    const icon = (
      <StyledIcon
        ref={ref}
        key="icon"
        className={className || null}
        data-element={iconType()}
        {...tagComponent("icon", rest)}
        {...styleProps}
        hasTooltip={hasTooltip}
        aria-label={ariaLabel}
        role={hasTooltip && role === undefined ? "tooltip" : role}
      />
    );

    const { tooltipPosition: tooltipPositionFromContext } = useContext(
      TooltipContext
    );

    if (tooltipMessage) {
      const visible = disabled ? false : tooltipVisible;

      return (
        <Tooltip
          message={tooltipMessage}
          position={tooltipPositionFromContext || tooltipPosition}
          type={type}
          isVisible={visible}
          isPartOfInput={isPartOfInput}
          inputSize={inputSize}
          bgColor={tooltipBgColor}
          fontColor={tooltipFontColor}
          flipOverrides={tooltipFlipOverrides}
        >
          {icon}
        </Tooltip>
      );
    }

    return icon;
  }
);

Icon.propTypes = {
  ...marginPropTypes,
  /**
   * @private
   * @ignore
   * Add classes to this component
   * */
  className: PropTypes.string,
  /**
   * Icon type.
   *
   * The full list of types can be seen [here](https://github.com/Sage/carbon/blob/master/src/components/icon/icon-config.js).
   * */
  type: PropTypes.string.isRequired,
  /** Background size */
  bgSize: PropTypes.oneOf([
    "extra-small",
    "small",
    "medium",
    "large",
    "extra-large",
  ]),
  /** Background shape */
  bgShape: PropTypes.oneOf(["circle", "rounded-rect", "square"]),
  /** Icon font size */
  fontSize: PropTypes.oneOf(["small", "medium", "large", "extra-large"]),
  /** Icon colour, provide any color from palette or any valid css color value. */
  color: PropTypes.string,
  /** Background colour, provide any color from palette or any valid css color value. */
  bg: PropTypes.string,
  /** Sets the icon in the disabled state */
  disabled: PropTypes.bool,
  /** Aria label for accessibility purposes */
  ariaLabel: PropTypes.string,
  /** The message to be displayed within the tooltip */
  tooltipMessage: PropTypes.node,
  /** The position to display the tooltip */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Control whether the tooltip is visible */
  tooltipVisible: PropTypes.bool,
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor: PropTypes.string,
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor: PropTypes.string,
  /** Overrides the default flip behaviour of the Tooltip, must be an array containing some or all of ["top", "bottom", "left", "right"].
   *
   *  See the Popper [documentation](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) for more information
   * */
  tooltipFlipOverrides: (props, propName) => {
    const prop = props[propName];
    const isValid =
      prop &&
      Array.isArray(prop) &&
      prop.every((placement) => ICON_TOOLTIP_POSITIONS.includes(placement));

    if (!prop || isValid) {
      return null;
    }
    return new Error(
      // eslint-disable-next-line max-len
      `The \`${propName}\` prop supplied to \`Icon\` must be an array containing some or all of ["top", "bottom", "left", "right"].`
    );
  },
  /** @ignore @private */
  isPartOfInput: PropTypes.bool,
  /** @ignore @private */
  inputSize: PropTypes.oneOf(["small", "medium", "large"]),
  /** @ignore @private */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** @ignore @private */
  focusable: PropTypes.bool,
};

Icon.defaultProps = {
  bgSize: "small",
  fontSize: "small",
  disabled: false,
};

export default Icon;

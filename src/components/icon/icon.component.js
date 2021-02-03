import React from "react";
import PropTypes from "prop-types";
import tagComponent from "../../utils/helpers/tags";
import StyledIcon from "./icon.style";
import Tooltip from "../tooltip";

const Icon = React.forwardRef(
  (
    {
      bg,
      bgShape,
      bgSize,
      bgTheme,
      className,
      color,
      disabled,
      fontSize,
      iconColor,
      type,
      ml,
      mr,
      tooltipMessage,
      tooltipPosition,
      tooltipVisible,
      tabIndex,
      isPartOfInput,
      inputSize,
      ...rest
    },
    ref
  ) => {
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

    const icon = (
      <StyledIcon
        ref={ref}
        bgSize={bgSize}
        bgShape={bgShape}
        bgTheme={bgTheme}
        fontSize={fontSize}
        iconColor={iconColor}
        disabled={disabled}
        color={color}
        bg={bg}
        type={iconType()}
        key="icon"
        className={className || null}
        {...tagComponent("icon", rest)}
        data-element={iconType()}
        mr={mr}
        ml={ml}
        tabIndex={tabIndex}
        {...rest}
      />
    );

    if (tooltipMessage) {
      const visible = disabled ? false : tooltipVisible;

      return (
        <Tooltip
          message={tooltipMessage}
          position={tooltipPosition}
          type={type}
          isVisible={visible}
          isPartOfInput={isPartOfInput}
          inputSize={inputSize}
        >
          {icon}
        </Tooltip>
      );
    }

    return icon;
  }
);

Icon.propTypes = {
  /** Add classes to this component */
  className: PropTypes.string,
  /** Icon type */
  type: PropTypes.string.isRequired,
  /** Background size */
  bgSize: PropTypes.oneOf(["small", "medium", "large"]),
  /** Background shape */
  bgShape: PropTypes.oneOf(["circle", "rounded-rect", "square"]),
  /** Background color theme */
  bgTheme: PropTypes.oneOf([
    "info",
    "error",
    "success",
    "warning",
    "business",
    "none",
  ]),
  /** Icon font size */
  fontSize: PropTypes.oneOf(["small", "large"]),
  /** Icon color */
  iconColor: PropTypes.oneOf([
    "default",
    "on-light-background",
    "on-dark-background",
    "business-color",
  ]),
  /** Override iconColor, provide any color from palette or any valid css color value. */
  color: PropTypes.string,
  /** Override bgTheme, provide any color from palette or any valid css color value. */
  bg: PropTypes.string,
  /** Sets the icon in the disabled state */
  disabled: PropTypes.bool,
  /** Margin right, given number will be multiplied by base spacing unit (8) */
  mr: PropTypes.number,
  /** Margin left, given number will be multiplied by base spacing unit (8) */
  ml: PropTypes.number,
  /** Aria label for accessibility purposes */
  ariaLabel: PropTypes.string,
  /** The message string to be displayed in the tooltip */
  tooltipMessage: PropTypes.string,
  /** The position to display the tooltip */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Control whether the tooltip is visible */
  tooltipVisible: PropTypes.bool,
  /** @ignore @private */
  isPartOfInput: PropTypes.bool,
  /** @ignore @private */
  inputSize: PropTypes.oneOf(["small", "medium", "large"]),
  /** @ignore @private */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.number]),
};

Icon.defaultProps = {
  bgSize: "small",
  fontSize: "small",
  disabled: false,
};

export default Icon;

import React from "react";
import PropTypes from "prop-types";
import TooltipDecorator from "../../utils/decorators/tooltip-decorator";
import { validProps } from "../../utils/ether";
import tagComponent from "../../utils/helpers/tags";
import StyledIcon from "./icon.style";

class Icon extends React.Component {
  /** Return component props */
  get componentProps() {
    return validProps(this);
  }

  /** Return Icon type with overrides */
  get type() {
    // switch tweaks icon names for actual icons in the set
    switch (this.props.type) {
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
        return this.props.type;
    }
  }

  /** Renders the component. */
  render() {
    return [
      <StyledIcon
        bgSize={this.props.bgSize}
        bgShape={this.props.bgShape}
        bgTheme={this.props.bgTheme}
        fontSize={this.props.fontSize}
        iconColor={this.props.iconColor}
        disabled={this.props.disabled}
        color={this.props.color}
        bg={this.props.bg}
        type={this.type}
        key="icon"
        className={this.props.className || null}
        {...this.componentProps}
        {...tagComponent("icon", this.props)}
        ref={(comp) => {
          this._target = comp;
        }}
        data-element={this.type}
        mr={this.props.mr}
        ml={this.props.ml}
        aria-label={this.props.ariaLabel}
      />,
      this.tooltipHTML,
    ];
  }
}

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
};

Icon.defaultProps = {
  bgSize: "small",
  fontSize: "small",
  disabled: false,
};

export default TooltipDecorator(Icon);

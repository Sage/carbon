import React, { useRef } from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import Icon from "../icon";
import StyledButton, { StyledButtonSubtext } from "./button.style";
import tagComponent from "../../utils/helpers/tags";
import OptionsHelper from "../../utils/helpers/options-helper";

function renderChildren({
  // eslint-disable-next-line react/prop-types
  iconType,
  iconPosition,
  size,
  subtext,
  children,
  disabled,
  buttonType,
  iconTooltipMessage,
  iconTooltipPosition,
}) {
  const iconColorMap = {
    primary: "on-dark-background",
    secondary: "business-color",
    tertiary: "business-color",
    darkBackground: "business-color",
  };

  const iconProps = {
    type: iconType,
    disabled,
    bgTheme: "none",
    iconColor: iconColorMap[buttonType],
  };

  return (
    <>
      {iconType && iconPosition === "before" && children && (
        <Icon {...iconProps} />
      )}
      <span>
        <span data-element="main-text">{children}</span>
        {size === "large" && (
          <StyledButtonSubtext data-element="subtext">
            {subtext}
          </StyledButtonSubtext>
        )}
      </span>
      {iconType && !children && (
        <Icon
          {...iconProps}
          tooltipMessage={iconTooltipMessage}
          tooltipPosition={iconTooltipPosition}
        />
      )}
      {iconType && iconPosition === "after" && children && (
        <Icon {...iconProps} />
      )}
    </>
  );
}

const renderStyledButton = (buttonProps) => {
  const {
    "aria-label": ariaLabel,
    disabled,
    buttonType,
    iconType,
    theme,
    href,
    ref,
    px,
    size,
    noWrap,
    tooltipMessage,
    ...rest
  } = buttonProps;

  let paddingX;

  const handleLinkKeyDown = (event) => {
    // If space key click link
    if (event.key === " ") {
      event.preventDefault();
      ref.current.click();
    }
  };

  if (href) {
    rest.href = href;
  }
  switch (size) {
    case "small":
      paddingX = 2;
      break;
    case "large":
      paddingX = 4;
      break;
    default:
      paddingX = 3;
  }

  return (
    <StyledButton
      aria-label={
        !rest.children && iconType ? ariaLabel || iconType : undefined
      }
      as={!disabled && href ? "a" : "button"}
      onKeyDown={href && handleLinkKeyDown}
      draggable={false}
      buttonType={buttonType}
      disabled={disabled}
      role="button"
      type={href ? undefined : "button"}
      iconType={iconType}
      size={size}
      px={px || paddingX}
      noWrap={noWrap}
      iconOnly={!rest.children && iconType}
      {...tagComponent("button", buttonProps)}
      {...rest}
      ref={ref}
    >
      {renderChildren(buttonProps)}
    </StyledButton>
  );
};

const Button = (props) => {
  const { size, subtext } = props;
  const linkRef = useRef(null);
  const { as, buttonType, forwardRef, ...rest } = props;
  const propsWithoutAs = {
    ...rest,
    buttonType: buttonType || as,
    ref: forwardRef || linkRef,
  };

  if (subtext.length > 0 && size !== "large") {
    throw new Error("subtext prop has no effect unless the button is large");
  }
  return renderStyledButton(propsWithoutAs);
};

Button.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Prop to specify the aria-label text. Only to be used in Button when only an icon is rendered. This is required to comply with WCAG 4.1.2 - Buttons must have discernible text  */
  "aria-label": PropTypes.string,
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  buttonType: PropTypes.oneOf(OptionsHelper.buttonTypes),
  /** The text the button displays */
  children: (props, propName, ...rest) => {
    if (!props.iconType && !props.children) {
      return new Error(
        "Either prop `iconType` must be defined or this node must have children."
      );
    }
    return PropTypes.node(props, propName, ...rest);
  },
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Apply destructive style to the button */
  destructive: PropTypes.bool,
  /** Defines an Icon position related to the children: "before" | "after" */
  iconPosition: PropTypes.oneOf([...OptionsHelper.buttonIconPositions]),
  /** Defines an Icon type within the button (see Icon for options) */
  iconType: (props, propName, ...rest) => {
    if (!props.iconType && !props.children) {
      return new Error(
        "Either prop `iconType` must be defined or this node must have children."
      );
    }
    return PropTypes.node(props, propName, ...rest);
  },
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** Second text child, renders under main text, only when size is "large" */
  subtext: PropTypes.string,
  /** Ref to be forwarded */
  forwardRef: PropTypes.object,
  /** [Legacy] Button types for legacy theme: "primary" | "secondary" */
  as: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** Used to transform button into anchor */
  href: PropTypes.string,
  /** Apply fullWidth style to the button */
  fullWidth: PropTypes.bool,
  /** If provided, the text inside a button will not wrap */
  noWrap: PropTypes.bool,
  /** Provides a tooltip message when the icon is hovered. */
  iconTooltipMessage: PropTypes.string,
  /** Provides positioning when the tooltip is displayed. */
  iconTooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

Button.defaultProps = {
  as: "secondary",
  size: "medium",
  fullWidth: false,
  disabled: false,
  destructive: false,
  iconPosition: "before",
  subtext: "",
};

const ButtonWithForwardRef = React.forwardRef((props, ref) => (
  <Button forwardRef={ref} {...props} />
));

ButtonWithForwardRef.displayName = "Button";
ButtonWithForwardRef.defaultProps = Button.defaultProps;
Button.displayName = "Button";

export { ButtonWithForwardRef };
export default Button;

import React, { useContext, useRef } from "react";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import Icon from "../icon";
import StyledButton, { StyledButtonSubtext } from "./button.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import baseTheme from "../../style/themes/base";

function renderChildren({
  /* eslint-disable react/prop-types */
  iconType,
  iconPosition,
  size,
  subtext,
  children,
  disabled,
  buttonType,
  iconTooltipMessage,
  iconTooltipPosition,
  theme,
  /* eslint-enable */
}) {
  const iconColorMap = {
    primary: theme.colors.white,
    secondary: theme.colors.primary,
    tertiary: theme.colors.primary,
    darkBackground: theme.colors.primary,
  };

  const iconProps = {
    type: iconType,
    disabled,
    bgSize: "extra-small",
    color: iconColorMap[buttonType],
    bg: "transparent",
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
    m = 0,
    px,
    size,
    noWrap,
    tooltipMessage,
    target,
    rel,
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
      px={px ?? paddingX}
      m={m}
      noWrap={noWrap}
      iconOnly={!rest.children && iconType}
      target={target}
      rel={rel}
      {...tagComponent("button", buttonProps)}
      {...rest}
      ref={ref}
    >
      {renderChildren(buttonProps)}
    </StyledButton>
  );
};

const Button = (props) => {
  const theme = useContext(ThemeContext) || baseTheme;
  const { size, subtext } = props;
  const linkRef = useRef(null);
  const { as, buttonType, forwardRef, ...rest } = props;
  const propsWithoutAs = {
    ...rest,
    buttonType: buttonType || as,
    ref: forwardRef || linkRef,
    theme,
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
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  buttonType: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "dashed",
    "darkBackground",
  ]),
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
  iconPosition: PropTypes.oneOf(["before", "after"]),
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Defines an Icon type within the button (see Icon for options)
   * */
  iconType: (props, propName, ...rest) => {
    if (!props.iconType && !props.children) {
      return new Error(
        "Either prop `iconType` must be defined or this node must have children."
      );
    }
    return PropTypes.node(props, propName, ...rest);
  },
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Second text child, renders under main text, only when size is "large" */
  subtext: PropTypes.string,
  /** Ref to be forwarded */
  forwardRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** Button types for legacy theme: "primary" | "secondary" */
  as: PropTypes.oneOf(["primary", "secondary"]),
  /** Used to transform button into anchor */
  href: PropTypes.string,
  /** Apply fullWidth style to the button */
  fullWidth: PropTypes.bool,
  /** If provided, the text inside a button will not wrap */
  noWrap: PropTypes.bool,
  /** Specify a callback triggered on blur */
  onBlur: PropTypes.func,
  /** Specify a callback triggered on change */
  onChange: PropTypes.func,
  /** Specify a callback triggered on click */
  onClick: PropTypes.func,
  /** Specify a callback triggered on focus */
  onFocus: PropTypes.func,
  /** Specify a callback triggered on keyDown */
  onKeyDown: PropTypes.func,
  /** Provides a tooltip message when the icon is hovered. */
  iconTooltipMessage: PropTypes.string,
  /** Provides positioning when the tooltip is displayed. */
  iconTooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** HTML button type property */
  type: PropTypes.string,
  /** HTML target attribute */
  target: PropTypes.string,
  /** HTML rel attribute */
  rel: PropTypes.string,
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

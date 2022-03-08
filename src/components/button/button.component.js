import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import Icon from "../icon";
import StyledButton, { StyledButtonSubtext } from "./button.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

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
  tooltipTarget,
  /* eslint-enable */
}) {
  const iconColorMap = {
    primary: "--colorsActionMajorYang100",
    secondary: "--colorsActionMajor500",
    tertiary: "--colorsActionMajor500",
    darkBackground: "--colorsActionMajor500",
  };

  const iconProps = {
    "aria-hidden": true,
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
        <TooltipProvider
          disabled={disabled}
          focusable={false}
          target={tooltipTarget}
        >
          <Icon
            {...iconProps}
            tooltipMessage={iconTooltipMessage}
            tooltipPosition={iconTooltipPosition}
          />
        </TooltipProvider>
      )}
      {iconType && iconPosition === "after" && children && (
        <Icon {...iconProps} />
      )}
    </>
  );
}

const Button = ({
  size,
  subtext,
  as,
  children,
  forwardRef,
  "aria-label": ariaLabel,
  disabled,
  buttonType: buttonTypeProp,
  iconType,
  iconPosition,
  href,
  m = 0,
  px,
  noWrap,
  target,
  rel,
  iconTooltipMessage,
  iconTooltipPosition,
  ...rest
}) => {
  const [internalRef, setInternalRef] = useState(null);

  const buttonType = buttonTypeProp || as;

  if (subtext.length > 0 && size !== "large") {
    throw new Error("subtext prop has no effect unless the button is large");
  }

  let paddingX;

  const handleLinkKeyDown = (event) => {
    // If space key click link
    if (event.key === " ") {
      event.preventDefault();
      internalRef.click();
    }
  };

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

  const setRefs = useCallback(
    (reference) => {
      setInternalRef(reference);
      if (!forwardRef) return;
      if (typeof forwardRef === "object") forwardRef.current = reference;
      if (typeof forwardRef === "function") forwardRef(reference);
    },
    [forwardRef]
  );

  return (
    <StyledButton
      aria-label={!children && iconType ? ariaLabel || iconType : undefined}
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
      iconOnly={!children && iconType}
      iconPosition={iconPosition}
      target={target}
      rel={rel}
      {...tagComponent("button", rest)}
      {...rest}
      {...(href && { href })}
      ref={setRefs}
    >
      {renderChildren({
        iconType,
        iconPosition,
        size,
        subtext,
        children,
        disabled,
        buttonType,
        iconTooltipMessage,
        iconTooltipPosition,
        tooltipTarget: internalRef,
      })}
    </StyledButton>
  );
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

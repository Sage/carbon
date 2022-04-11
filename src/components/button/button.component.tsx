import React, { useCallback, useState } from "react";
import { SpaceProps } from "styled-system";
import invariant from "invariant";

import Icon, { IconType, IconProps, TooltipPositions } from "../icon";
import StyledButton, { StyledButtonSubtext } from "./button.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import Logger from "../../__internal__/utils/logger";

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "tertiary"
  | "dashed"
  | "darkBackground";

export type SizeOptions = "small" | "medium" | "large";
export type ButtonIconPosition = "before" | "after";

export interface ButtonProps extends SpaceProps {
  /** Prop to specify the aria-label text.
   *  Only to be used in Button when only an icon is rendered.
   * This is required to comply with WCAG 4.1.2 - Buttons must have discernible text
   */
  "aria-label"?: string;
  /** [Legacy] Button types for legacy theme: "primary" | "secondary" */
  as?: ButtonTypes;
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  buttonType?: ButtonTypes;
  /** The text the button displays */
  children?: React.ReactNode;
  /** Name attribute */
  name?: string;
  /** Apply disabled state to the button */
  disabled?: boolean;
  /** Apply destructive style to the button */
  destructive?: boolean;
  /** Ref to be forwarded */
  forwardRef?:
    | React.RefCallback<HTMLButtonElement>
    | React.MutableRefObject<HTMLButtonElement | null>
    | null;
  /** Apply fullWidth style to the button */
  fullWidth?: boolean;
  /** Used to transform button into anchor */
  href?: string;
  /** Defines an Icon position related to the children: "before" | "after" */
  iconPosition?: ButtonIconPosition;
  /** Provides a tooltip message when the icon is hovered. */
  iconTooltipMessage?: string;
  /** Provides positioning when the tooltip is displayed. */
  iconTooltipPosition?: TooltipPositions;
  /** Defines an Icon type within the button */
  iconType?: IconType;
  /** If provided, the text inside a button will not wrap */
  noWrap?: boolean;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLButtonElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Specify a callback triggered on keyDown */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** onClick handler */
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size?: SizeOptions;
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
  /** HTML button type property */
  type?: string;
  /** HTML target attribute */
  target?: string;
  /** HTML rel attribute */
  rel?: string;
}

interface RenderChildrenProps
  extends Pick<
    ButtonProps,
    | "iconType"
    | "iconPosition"
    | "size"
    | "subtext"
    | "children"
    | "disabled"
    | "buttonType"
    | "iconTooltipMessage"
    | "iconTooltipPosition"
  > {
  buttonType: ButtonTypes;
  tooltipTarget?: Element;
}

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
}: /* eslint-enable */
RenderChildrenProps) {
  const iconColorMap = {
    primary: "--colorsActionMajorYang100",
    secondary: "--colorsActionMajor500",
    tertiary: "--colorsActionMajor500",
    darkBackground: "--colorsActionMajor500",
    dashed: "--colorsActionMajor500",
  };

  const iconProps: Pick<
    IconProps,
    "aria-hidden" | "disabled" | "color" | "bg" | "bgSize"
  > = {
    "aria-hidden": true,
    disabled,
    color: iconColorMap[buttonType],
    bg: "transparent",
    bgSize: "extra-small",
  };

  return (
    <>
      {iconType && iconPosition === "before" && children && (
        <Icon type={iconType} {...iconProps} />
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
            type={iconType}
            {...iconProps}
            tooltipMessage={iconTooltipMessage}
            tooltipPosition={iconTooltipPosition}
          />
        </TooltipProvider>
      )}
      {iconType && iconPosition === "after" && children && (
        <Icon type={iconType} {...iconProps} />
      )}
    </>
  );
}

let deprecatedWarnTriggered = false;

const Button = ({
  size = "medium",
  subtext = "",
  as,
  children,
  forwardRef,
  "aria-label": ariaLabel,
  disabled = false,
  destructive = false,
  buttonType: buttonTypeProp = "secondary",
  iconType,
  iconPosition = "before",
  href,
  m = 0,
  px,
  noWrap,
  target,
  rel,
  iconTooltipMessage,
  iconTooltipPosition,
  fullWidth = false,
  ...rest
}: ButtonProps) => {
  if (!deprecatedWarnTriggered && as) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      // eslint-disable-next-line max-len
      "The `as` prop is deprecated and will soon be removed from the `Button` component interface. You should use the `buttonType` prop to achieve the same styling. The following codemod is available to help with updating your code https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop"
    );
  }

  invariant(
    !!(children || iconType),
    "Either prop `iconType` must be defined or this node must have children."
  );
  if (subtext) {
    invariant(
      size === "large",
      "subtext prop has no effect unless the button is large."
    );
  }

  const [internalRef, setInternalRef] = useState<HTMLButtonElement>();

  const buttonType = as || buttonTypeProp;

  let paddingX;

  const handleLinkKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // If space key click link
    if (event.key === " ") {
      event.preventDefault();
      internalRef?.click();
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
      onKeyDown={href ? handleLinkKeyDown : undefined}
      draggable={false}
      buttonType={buttonType}
      disabled={disabled}
      destructive={destructive}
      role="button"
      type={href ? undefined : "button"}
      iconType={iconType}
      size={size}
      px={px ?? paddingX}
      m={m}
      noWrap={noWrap}
      iconOnly={!!(!children && iconType)}
      iconPosition={iconPosition}
      target={target}
      rel={rel}
      fullWidth={fullWidth}
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

const ButtonWithForwardRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <Button forwardRef={ref} {...props} />
);

ButtonWithForwardRef.displayName = "Button";
Button.displayName = "Button";

export { ButtonWithForwardRef };
export default Button;

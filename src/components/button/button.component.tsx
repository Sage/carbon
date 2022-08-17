import React, { useCallback, useState } from "react";
import invariant from "invariant";

import Icon, { IconProps } from "../icon";
import StyledButton, {
  StyledButtonSubtext,
  StyledButtonProps,
  ButtonIconPosition,
  ButtonTypes,
  SizeOptions,
} from "./button.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import Logger from "../../__internal__/utils/logger";
import { TooltipPositions } from "../tooltip/tooltip.config";

export type { ButtonIconPosition, ButtonTypes, SizeOptions };

export interface ButtonProps extends StyledButtonProps {
  /** Prop to specify the aria-label text.
   *  Only to be used in Button when only an icon is rendered.
   * This is required to comply with WCAG 4.1.2 - Buttons must have discernible text
   */
  "aria-label"?: string;
  /** The text the button displays */
  children?: React.ReactNode;
  /** Name attribute */
  name?: string;
  /** Ref to be forwarded */
  forwardRef?:
    | React.RefCallback<HTMLButtonElement>
    | React.MutableRefObject<HTMLButtonElement | null>
    | null;
  /** Used to transform button into anchor */
  href?: string;
  /** Provides a tooltip message when the icon is hovered. */
  iconTooltipMessage?: string;
  /** Provides positioning when the tooltip is displayed. */
  iconTooltipPosition?: TooltipPositions;
  /** id attribute */
  id?: string;
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
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
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

let deprecatedForwardRefWarnTriggered = false;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "medium",
      subtext = "",
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
    }: ButtonProps,
    ref
  ) => {
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

    if (!deprecatedForwardRefWarnTriggered && forwardRef) {
      deprecatedForwardRefWarnTriggered = true;
      Logger.deprecate(
        "The `forwardRef` prop in `Button` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    const [internalRef, setInternalRef] = useState<HTMLButtonElement>();

    const buttonType = buttonTypeProp;

    let paddingX;

    const handleLinkKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>
    ) => {
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
        const activeRef = ref || forwardRef;
        if (!activeRef) return;
        if (typeof activeRef === "object") activeRef.current = reference;
        if (typeof activeRef === "function") activeRef(reference);
      },
      [ref, forwardRef]
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
  }
);

let deprecatedButtonForwardRefWarnTriggered = false;

const ButtonWithForwardRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    if (!deprecatedButtonForwardRefWarnTriggered) {
      deprecatedButtonForwardRefWarnTriggered = true;
      Logger.deprecate(
        "The `ButtonWithForwardRef` component is deprecated and will soon be removed. Please use a basic `Button` component with `ref` instead."
      );
    }

    return <Button ref={ref} {...props} />;
  }
);

ButtonWithForwardRef.displayName = "Button";
Button.displayName = "Button";

export { ButtonWithForwardRef };
export default Button;

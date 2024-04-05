import React, { useCallback, useState, useContext } from "react";
import { SpaceProps } from "styled-system";
import invariant from "invariant";

import Icon, { IconType, IconProps } from "../icon";
import StyledButton, {
  StyledButtonSubtext,
  StyledButtonMainText,
} from "./button.style";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import Logger from "../../__internal__/utils/logger";
import { TooltipPositions } from "../tooltip/tooltip.config";
import { ButtonBarContext } from "../button-bar/button-bar.component";
import SplitButtonContext from "../split-button/__internal__/split-button.context";

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "tertiary"
  | "dashed"
  | "darkBackground"
  | "gradient-grey"
  | "gradient-white";

export type SizeOptions = "small" | "medium" | "large";
export type ButtonIconPosition = "before" | "after";

export interface ButtonProps extends SpaceProps, TagProps {
  /**
   * Prop to specify the aria-label attribute of the component
   * Defaults to the iconType, when the component has only an icon
   */
  "aria-label"?: string;
  /** Identifies the element(s) labelling the button. */
  "aria-labelledby"?: string;
  /** Identifies the element(s) offering additional information about the button the user might require. */
  "aria-describedby"?: string;
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
  /** id attribute */
  id?: string;
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
  tooltipTarget?: HTMLElement;
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
  const iconColor = () => {
    if (buttonType === "primary") {
      return "--colorsActionMajorYang100";
    }

    if (buttonType.includes("gradient")) {
      return "--colorsActionMinorYin090";
    }

    return "--colorsActionMajor500";
  };

  const iconProps: Pick<
    IconProps,
    "aria-hidden" | "disabled" | "color" | "bg"
  > = {
    "aria-hidden": true,
    disabled,
    color: iconColor(),
    bg: "transparent",
  };

  const isValidChildren = children !== undefined && children !== false;

  return (
    <>
      {iconType && iconPosition === "before" && isValidChildren && (
        <Icon type={iconType} {...iconProps} />
      )}
      {isValidChildren && (
        <span>
          <StyledButtonMainText data-element="main-text">
            {children}
          </StyledButtonMainText>
          {size === "large" && (
            <StyledButtonSubtext data-element="subtext">
              {subtext}
            </StyledButtonSubtext>
          )}
        </span>
      )}
      {iconType && !isValidChildren && (
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
let deprecatedDashedButtonWarnTriggered = false;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      buttonType: buttonTypeProp = "secondary",
      children,
      destructive = false,
      disabled = false,
      forwardRef,
      fullWidth: fullWidthProp = false,
      href,
      iconPosition: iconPositionProp = "before",
      iconTooltipMessage,
      iconTooltipPosition,
      iconType,
      m = 0,
      noWrap,
      onClick,
      px,
      rel,
      size: sizeProp = "medium",
      subtext = "",
      target,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const {
      buttonType: buttonTypeContext,
      size: sizeContext,
      iconPosition: iconPositionContext,
      fullWidth: fullWidthContext,
    } = useContext(ButtonBarContext);

    const buttonType = buttonTypeContext || buttonTypeProp;
    const size = sizeContext || sizeProp;
    const iconPosition = iconPositionContext || iconPositionProp;
    const fullWidth = fullWidthContext || fullWidthProp;

    invariant(
      children !== undefined || !!iconType,
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

    if (!deprecatedDashedButtonWarnTriggered && buttonType === "dashed") {
      deprecatedDashedButtonWarnTriggered = true;
      Logger.deprecate(
        "The `dashed` variant of the `buttonType` prop for `Button` component is deprecated and will soon be removed."
      );
    }

    const [internalRef, setInternalRef] = useState<HTMLButtonElement>();

    const { inSplitButton, onChildButtonClick } = useContext(
      SplitButtonContext
    );

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

    const isValidChildren = children !== undefined && children !== false;

    return (
      <StyledButton
        aria-label={
          !isValidChildren && iconType ? ariaLabel || iconType : ariaLabel
        }
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        as={!disabled && href ? "a" : "button"}
        onKeyDown={href ? handleLinkKeyDown : undefined}
        onClick={inSplitButton ? onChildButtonClick?.(onClick) : onClick}
        draggable={false}
        buttonType={buttonType}
        disabled={disabled}
        destructive={destructive}
        type={href ? undefined : "button"}
        iconType={iconType}
        size={size}
        px={px ?? paddingX}
        m={m}
        noWrap={noWrap}
        iconOnly={!isValidChildren && !!iconType}
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

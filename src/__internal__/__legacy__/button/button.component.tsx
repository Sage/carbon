import React, { useCallback, useState, useContext } from "react";
import { SpaceProps } from "styled-system";
import invariant from "invariant";

import Icon, { IconType, IconProps } from "../../../components/icon";
import StyledButton, {
  StyledButtonSubtext,
  StyledButtonMainText,
} from "./button.style";
import tagComponent, { TagProps } from "../../utils/helpers/tags/tags";
import { TooltipProvider } from "../../tooltip-provider";
import { TooltipPositions } from "../../../components/tooltip/tooltip.config";
import ButtonBarContext from "../../../components/button-bar/__internal__/button-bar.context";
import SplitButtonContext from "../../../components/split-button/__internal__/split-button.context";
import BatchSelectionContext from "../../../components/batch-selection/__internal__/batch-selection.context";

/**
 * @deprecated Use "primary", "secondary", "tertiary" or "ai" instead.
 */
export type DeprecatedButtonTypes =
  | "darkBackground"
  | "gradient-grey"
  | "gradient-white";

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "tertiary"
  | DeprecatedButtonTypes;

export type SizeOptions = "small" | "medium" | "large";
export type ButtonIconPosition = "before" | "after";

export interface ButtonProps extends SpaceProps, TagProps {
  /**
   * Prop to specify the aria-label attribute of the component
   * Defaults to the iconType, when the component has only an icon
   */
  "aria-label"?: string;
  /** Identifies the element(s) labelling the button */
  "aria-labelledby"?: string;
  /** Identifies the element(s) offering additional information about the button the user might require */
  "aria-describedby"?: string;
  /**
   * @deprecated Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground"
   * Recommended to use "variant", "variantType" and "inverse" props.
   * */
  buttonType?: ButtonTypes;
  /** The text the button displays */
  children?: React.ReactNode;
  /** Name attribute */
  name?: string;
  /** Apply disabled state to the button */
  disabled?: boolean;
  /**
   * @deprecated Apply destructive style to the button
   * */
  destructive?: boolean;
  /** Apply fullWidth style to the button */
  fullWidth?: boolean;
  /**
   * @deprecated Used to transform button into anchor
   * */
  href?: string;
  /**
   * @deprecated Defines an Icon position related to the children: "before" | "after"
   * */
  iconPosition?: ButtonIconPosition;
  /**
   * @deprecated [Legacy] Provides a tooltip message when the icon is hovered.
   * */
  iconTooltipMessage?: string;
  /**
   * @deprecated [Legacy] Provides positioning when the tooltip is displayed.
   * */
  iconTooltipPosition?: TooltipPositions;
  /**
   * @deprecated Defines an Icon type within the button
   * */
  iconType?: IconType;
  /** id attribute */
  id?: string;
  /**
   * @deprecated Whether to use the white-on-dark colour variant
   * Recommended to use "inverse" prop.
   * */
  isWhite?: boolean;
  /** If provided, the text inside a button will not wrap */
  noWrap?: boolean;
  /** Specify a callback triggered on blur */
  onBlur?: (
    ev: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /** Specify a callback triggered on change */
  onChange?: (
    ev:
      | React.FormEvent<HTMLButtonElement | HTMLAnchorElement>
      | React.ChangeEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (
    ev: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /** Specify a callback triggered on keyDown */
  onKeyDown?: (
    ev: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /** onClick handler */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size?: SizeOptions;
  /**
   * @deprecated Second text child, renders under main text, only when size is "large"
   * */
  subtext?: string;
  /** HTML button type property */
  type?: string;
  /**
   * @deprecated HTML target attribute
   * */
  target?: string;
  /**
   * @deprecated HTML rel attribute
   * */
  rel?: string;
  /**
   * @private
   * @internal
   * @ignore
   * Set a class name on the button element. INTERNAL USE ONLY.
   */
  className?: string;
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
    | "destructive"
  > {
  buttonType: ButtonTypes;
  tooltipTarget?: HTMLElement;
}

function renderChildren({
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
}: RenderChildrenProps) {
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
            <StyledButtonSubtext data-element="subtext" data-role="subtext">
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

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      buttonType: buttonTypeProp = "secondary",
      children,
      destructive = false,
      disabled = false,
      isWhite = false,
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
    ref,
  ) => {
    const {
      buttonType: buttonTypeContext,
      size: sizeContext,
      iconPosition: iconPositionContext,
      fullWidth: fullWidthContext,
    } = useContext(ButtonBarContext);
    const { batchSelectionDisabled } = useContext(BatchSelectionContext);

    const buttonType = buttonTypeContext || buttonTypeProp;
    const size = sizeContext || sizeProp;
    const iconPosition = iconPositionContext || iconPositionProp;
    const fullWidth = fullWidthContext || fullWidthProp;
    const isDisabled = disabled || batchSelectionDisabled;

    invariant(
      children !== undefined || !!iconType,
      "Either prop `iconType` must be defined or this node must have children.",
    );
    if (subtext) {
      invariant(
        size === "large",
        "subtext prop has no effect unless the button is large.",
      );
    }

    const [internalRef, setInternalRef] = useState<
      HTMLButtonElement | HTMLAnchorElement | null
    >(null);

    const { inSplitButton, onChildButtonClick } =
      useContext(SplitButtonContext);

    let paddingX;

    const handleLinkKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      // If space key click link
      if (event.key === " ") {
        event.preventDefault();
        internalRef?.click();
      }
    };

    const handleClick = (
      event:
        | React.MouseEvent<HTMLAnchorElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      internalRef?.focus({ preventScroll: true });

      if (inSplitButton) {
        onChildButtonClick?.(onClick)?.(event);
      } else if (onClick) {
        onClick(event);
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
      (reference: HTMLButtonElement | HTMLAnchorElement | null) => {
        setInternalRef(reference);
        if (!ref) return;
        if (typeof ref === "object") ref.current = reference;
        if (typeof ref === "function") ref(reference);
      },
      [ref],
    );

    const isValidChildren = children !== undefined && children !== false;

    return (
      <StyledButton
        aria-label={
          !isValidChildren && iconType ? ariaLabel || iconType : ariaLabel
        }
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        as={!isDisabled && href ? "a" : "button"}
        onKeyDown={href ? handleLinkKeyDown : undefined}
        onClick={handleClick}
        draggable={false}
        buttonType={buttonType}
        disabled={isDisabled}
        destructive={destructive}
        isWhite={isWhite}
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
          disabled: isDisabled,
          buttonType,
          iconTooltipMessage,
          iconTooltipPosition,
          destructive,
          tooltipTarget: internalRef as HTMLElement | undefined,
        })}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";
export default Button;

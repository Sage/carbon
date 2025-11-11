import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { SpaceProps } from "styled-system";

import StyledButton, {
  StyledChildContainer,
  StyledLoadingContainer,
} from "./button.style";
import Icon, { IconType } from "../../icon";
import { Loader } from "../../loader/__next__/loader.component";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useLocale from "../../../hooks/__internal__/useLocale";

export type ButtonHandle = {
  focusButton: () => void;
} | null;

export interface ButtonProps extends SpaceProps, TagProps {
  /** Identifies the element(s) offering additional information about the button that the user might require. */
  "aria-describedby"?: string;
  /**
   * The aria-label attribute of the button.
   * Defaults to the iconType, when the component has only an icon.
   */
  "aria-label"?: string;
  /** Identifies the element(s) labelling the button. */
  "aria-labelledby"?: string;
  /** The text that the button displays. */
  children?: ReactNode;
  /** Flag to indicate that the button is disabled. */
  disabled?: boolean;
  /** Flag to indicate that the button can be full-width. */
  fullWidth?: boolean;
  /** Defines the position of the chosen icon relative to the children. */
  iconPosition?: "left" | "right";
  /** The icon to display. */
  iconType?: IconType;
  /** The ID of the button. */
  id?: string;
  /** Set the button to use a dark-mode appearance. */
  inverse?: boolean;
  /** Flag to indicate that the button is in a loading state. */
  loading?: boolean;
  /** The name of the button. */
  name?: string;
  /** Flag to indicate whether the button text can wrap over multiple lines. */
  noWrap?: boolean;
  /** Handler to fire when the button is blurred. */
  onBlur?: (
    ev: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /** Handler to fire when the button is clicked. */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Handler to fire when the button is focused. */
  onFocus?: (
    ev: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /** Handler to fire when the button is activated via the Enter or Space keys. */
  onKeyDown?: (
    ev: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /** The size of the button. */
  size?: "xs" | "small" | "medium" | "large";
  /** The HTML type that this button should use. */
  type?: "button" | "reset" | "submit";
  /** The variant of the button. */
  variant?: "default" | "destructive" | "ai";
  /** The variant type of the button. */
  variantType?: "primary" | "secondary" | "tertiary" | "subtle";
}

export const Button = forwardRef<ButtonHandle, ButtonProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      children,
      disabled = false,
      fullWidth = false,
      iconPosition = "left",
      iconType,
      id,
      inverse,
      loading = false,
      name,
      noWrap = true,
      onClick,
      size = "medium",
      variant = "default",
      variantType = "primary",
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const locale = useLocale();

    const focusButton = useCallback(() => {
      const button = buttonRef.current;
      button?.focus();
    }, []);

    useImperativeHandle<ButtonHandle, ButtonHandle>(
      ref,
      () => ({
        focusButton() {
          focusButton();
        },
      }),
      [focusButton],
    );

    const allowMotion = useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

    const hasValidChildren = children !== undefined;

    const handleClick = (
      event:
        | React.MouseEvent<HTMLAnchorElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (loading) return;

      buttonRef.current?.focus({ preventScroll: true });

      onClick?.(event);
    };

    const getIconColor = () => {
      if (inverse) {
        if (variantType === "primary") {
          return "#000";
        }
        if (disabled) {
          return "rgba(255, 255, 255, 0.42)";
        }
        return "#FFF";
      }

      if (variant === "ai") {
        return disabled
          ? "var(--button-ai-label-disabled, #0000006B)"
          : "var(--button-ai-label-active, #000)";
      }

      if (variantType === "primary") {
        return "var(--button-typical-primary-label-default, #FFF)";
      }

      if (variant === "destructive") {
        return disabled
          ? "var(--button-destructive-secondary-label-disabled, rgba(0, 0, 0, 0.42))"
          : "var(--button-destructive-secondary-label-default, #DB004E)";
      }

      return disabled
        ? "var(--button-typical-secondary-label-disabled, #0000006B)"
        : "var(--button-typical--secondary-label-active, #000)";
    };

    const showIcon = () => {
      if (size === "xs") return null;

      return <Icon type={iconType as IconType} color={getIconColor()} />;
    };

    const showLoader = () => {
      if (size === "xs") return null;

      let useWhiteRing = !inverse;

      if (
        (variantType !== "primary" && variant === "default") ||
        (variantType === "secondary" && variant === "destructive") ||
        variant === "ai"
      ) {
        useWhiteRing = false;
      }

      return (
        <StyledLoadingContainer>
          <Loader
            variant="inline"
            loaderType="ring"
            size={size !== "large" ? "extra-small" : "small"}
            inverse={useWhiteRing}
            showLabel={false}
            loaderLabel={locale.loaderSpinner.loading()}
          />
          {allowMotion && locale.loaderSpinner.loading()}
        </StyledLoadingContainer>
      );
    };

    const showChildren = () => {
      return (
        <StyledChildContainer
          data-role="button-child-container"
          flip={iconPosition === "right"}
        >
          {iconType && showIcon()}
          {children}
        </StyledChildContainer>
      );
    };

    return (
      <StyledButton
        allowMotion={allowMotion}
        aria-describedby={ariaDescribedBy}
        aria-label={
          !hasValidChildren && iconType ? ariaLabel || iconType : ariaLabel
        }
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        fullWidth={fullWidth}
        inverse={inverse}
        iconOnly={!hasValidChildren && !!iconType}
        iconPosition={iconPosition}
        iconType={iconType}
        id={id}
        name={name}
        noWrap={noWrap}
        onClick={handleClick}
        ref={buttonRef}
        size={size}
        variant={variant}
        variantType={variantType}
        {...tagComponent("button", rest)}
        {...rest}
      >
        {loading ? showLoader() : showChildren()}
      </StyledButton>
    );
  },
);

export default Button;

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
import { LoaderSpinner } from "../../loader-spinner";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import useMediaQuery from "../../../hooks/useMediaQuery";

export type ButtonHandle = {
  focusButton: () => void;
} | null;

export interface ButtonProps extends SpaceProps, TagProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  iconPosition?: "left" | "right";
  iconType?: IconType;
  id?: string;
  inverse?: boolean;
  loading?: boolean;
  name?: string;
  noWrap?: boolean;
  onBlur?: (
    ev: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  onChange?: (
    ev:
      | React.FormEvent<HTMLButtonElement | HTMLAnchorElement>
      | React.ChangeEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  onFocus?: (
    ev: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  onKeyDown?: (
    ev: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  size?: "xs" | "small" | "medium" | "large";
  type?: "button" | "reset" | "submit";
  target?: string;
  rel?: string;
  variant?: "default" | "destructive" | "ai";
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
      href,
      iconPosition = "left",
      iconType,
      id,
      inverse,
      loading = false,
      name,
      noWrap,
      onClick,
      rel,
      size = "medium",
      target,
      type = "button",
      variant = "default",
      variantType = "primary",
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    const hasValidChildren = children !== undefined && children !== false;

    const handleLinkKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      if (event.key === " ") {
        event.preventDefault();
        buttonRef.current?.click();
      }
    };

    const handleClick = (
      event:
        | React.MouseEvent<HTMLAnchorElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      buttonRef.current?.focus({ preventScroll: true });

      onClick?.(event);
    };

    const showIcon = () => {
      if (size === "xs") return null;

      let iconColour =
        variantType === "primary"
          ? "var(--button-typical-primary-label-default, #FFF)"
          : "var(--button-typical-secondary-label-default, #000000E6)";

      if (variantType !== "primary") {
        iconColour = disabled
          ? "var(--button-typical-secondary-label-disabled, #0000006B)"
          : "var(--button-typical--secondary-label-active, #000)";

        if (variant === "destructive") {
          iconColour = disabled
            ? "var(--button-destructive-secondary-label-disabled, rgba(0, 0, 0, 0.42))"
            : "var(--button-destructive-secondary-label-default, #DB004E)";
        }
      }

      if (variant === "ai") {
        iconColour = disabled
          ? "var(--button-ai-label-disabled, #0000006B)"
          : "var(--button-ai-label-active, #000)";
      }

      if (inverse) {
        if (variantType === "primary") {
          iconColour = "#000";
        } else {
          iconColour = disabled ? "rgba(255, 255, 255, 0.42)" : "#FFF";
        }
      }

      return <Icon type={iconType as IconType} color={iconColour} />;
    };

    const showLoader = () => {
      if (size === "xs") return null;

      return (
        <StyledLoadingContainer>
          <LoaderSpinner
            showSpinnerLabel={false}
            size="extra-small"
            variant={
              variantType === "primary" && variant !== "ai"
                ? "inverse"
                : "action"
            }
          />{" "}
          Loading...
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
        as={!disabled && href ? "a" : "button"}
        data-component={""}
        data-element={""}
        data-role={""}
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
        onKeyDown={href ? handleLinkKeyDown : undefined}
        ref={buttonRef}
        rel={rel}
        size={size}
        target={target}
        type={href ? undefined : type}
        {...(href && { href })}
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

import React, {
  forwardRef,
  ReactNode,
  useRef,
  useImperativeHandle,
} from "react";
import { SpaceProps } from "styled-system";

import { ButtonProps as LegacyButtonProps } from "../button.component";
import StyledButton, { StyledContentContainer } from "./button.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { Size, Variant, VariantType } from "./button.config";
import isIconOnly from "./__internal__/utils/is-icon-only";
import Icon from "../../icon";

export type ButtonHandle = {
  focusButton: () => void;
} | null;

export interface ButtonProps
  extends Omit<
      LegacyButtonProps,
      "size" | "type" | "iconTooltipMessage" | "iconTooltipPosition"
    >,
    SpaceProps,
    TagProps {
  /** Identifies the element(s) offering additional information about the button that the user might require. */
  "aria-describedby"?: string;
  /**
   * The aria-label attribute of the button.
   */
  "aria-label"?: string;
  /** Identifies the element(s) labelling the button. */
  "aria-labelledby"?: string;
  /** The content that the button displays. */
  children?: ReactNode;
  /** Flag to indicate that the button is disabled. */
  disabled?: boolean;
  /** Flag to indicate that the button can be full-width. */
  fullWidth?: boolean;
  /** The ID of the button. */
  id?: string;
  /** Set the button to use a dark-mode appearance. */
  inverse?: boolean;
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
  size?: Size;
  /** The HTML type that this button should use. */
  type?: "button" | "reset" | "submit";
  /** The variant of the button. */
  variant?: Variant;
  /** The variant type of the button. */
  variantType?: VariantType;
  /**
   * @deprecated Please use `variantType` prop instead.
   * */
  buttonType?: LegacyButtonProps["buttonType"];
  /**
   * @deprecated Please use `variant="destructive"` instead.
   * */
  destructive?: LegacyButtonProps["destructive"];
  /**
   * @deprecated Please use `inverse` instead.
   * */
  isWhite?: LegacyButtonProps["isWhite"];
}

const mapButtonTypeToVariantType = ({
  buttonType,
  destructive,
  variant,
  variantType,
}: {
  buttonType?: ButtonProps["buttonType"];
  destructive?: ButtonProps["destructive"];
  variant: Variant;
  variantType: VariantType;
}): { variant: Variant; variantType: VariantType } => {
  // when buttonType and destructive are not set, use the variant and variantType directly
  if (!buttonType && !destructive) {
    return { variant, variantType };
  }

  if (destructive) {
    const type = buttonType ?? variantType;
    return {
      variant: "destructive",
      variantType: type === "primary" ? "primary" : "secondary",
    };
  }

  switch (buttonType) {
    case "primary":
      return { variant: "default", variantType: "primary" };
    case "tertiary":
      return { variant: "default", variantType: "tertiary" };
    case "darkBackground":
      return { variant: "default", variantType: "secondary" };
    case "gradient-grey":
    case "gradient-white":
      return { variant: "gradient", variantType: "secondary" };
    default:
      return { variant: "default", variantType: "secondary" };
  }
};

export const Button = forwardRef<ButtonHandle, ButtonProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      children,
      disabled = false,
      fullWidth = false,
      id,
      inverse,
      name,
      noWrap = true,
      onClick,
      size = "medium",
      variant = "default",
      variantType = "primary",
      buttonType,
      destructive,
      iconType,
      iconPosition = "before",
      isWhite,
      href,
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const hasChildren = children !== undefined && children !== false;

    const iconOnly = (!!iconType && !hasChildren) || isIconOnly(children);

    useImperativeHandle<ButtonHandle, ButtonHandle>(
      ref,
      () => ({
        focusButton: () => {
          buttonRef.current?.focus();
        },
      }),
      [],
    );

    const allowMotion = useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

    const { variant: computedVariant, variantType: computedVariantType } =
      mapButtonTypeToVariantType({
        buttonType,
        destructive,
        variant,
        variantType,
      });

    const handleClick = (
      event:
        | React.MouseEvent<HTMLAnchorElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      buttonRef.current?.focus({ preventScroll: true });

      onClick?.(event);
    };

    const renderChildren = () => {
      if (!iconType) {
        return children;
      }

      const iconProps = {
        "aria-hidden": true,
        bg: "transparent",
      };

      if (!hasChildren) {
        return (
          <Icon type={iconType} {...iconProps} data-role="button-icon-only" />
        );
      }

      if (iconPosition === "before") {
        return (
          <>
            <Icon
              type={iconType}
              {...iconProps}
              data-role="button-icon-before"
            />
            {children}
          </>
        );
      }

      return (
        <>
          {children}
          <Icon type={iconType} {...iconProps} data-role="button-icon-after" />
        </>
      );
    };

    return (
      <StyledButton
        $allowMotion={allowMotion}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        $fullWidth={fullWidth}
        $inverse={inverse || buttonType === "darkBackground" || isWhite}
        id={id}
        name={name}
        $noWrap={noWrap}
        onClick={!href ? handleClick : undefined}
        ref={buttonRef}
        $size={size}
        $variant={computedVariant}
        $variantType={computedVariantType}
        as={!disabled && href ? "a" : "button"}
        href={href}
        $iconOnly={iconOnly}
        {...tagComponent("button", rest)}
        {...rest}
      >
        <StyledContentContainer data-role="button-child-container">
          {renderChildren()}
        </StyledContentContainer>
      </StyledButton>
    );
  },
);

export default Button;

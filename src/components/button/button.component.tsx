import React, { forwardRef, useCallback, useContext, useState } from "react";
import { ButtonProps as OldButtonProps } from "../../__internal__/__legacy__/button/button.component";
import {
  Button as NextButton,
  ButtonProps as NextButtonProps,
} from "./__internal__/__next__/button.component";
import Icon from "../icon";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import ButtonBarContext from "../button-bar/__internal__/button-bar.context";

export interface ButtonProps
  extends Omit<OldButtonProps, "size">,
    Pick<
      NextButtonProps,
      "variant" | "variantType" | "inverse" | "size" | "loading"
    > {}

const mapButtonTypeToVariantType = ({
  buttonType,
  destructive,
  variant,
  variantType,
}: {
  buttonType?: OldButtonProps["buttonType"];
  destructive?: OldButtonProps["destructive"];
  variant?: NextButtonProps["variant"];
  variantType?: NextButtonProps["variantType"];
}): Pick<NextButtonProps, "variant" | "variantType"> => {
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

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      buttonType,
      children,
      destructive,
      disabled = false,
      fullWidth = false,
      iconPosition = "before",
      iconTooltipMessage,
      iconTooltipPosition,
      iconType,
      isWhite = false,
      name,
      noWrap,
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      size = "medium",
      type,
      id,
      variant = "default",
      variantType = "primary",
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const { batchSelectionDisabled } = useContext(BatchSelectionContext);
    const {
      buttonType: buttonBarButtonType,
      size: buttonBarSize,
      iconPosition: buttonBarIconPosition,
      fullWidth: buttonBarFullWidth,
    } = useContext(ButtonBarContext);

    // Map old API to new API
    const { variant: computedVariant, variantType: computedVariantType } =
      mapButtonTypeToVariantType({
        buttonType: buttonBarButtonType || buttonType,
        destructive,
        variant,
        variantType,
      });

    // console.log("ADAPTER SIZE ===>", size, rest)
    const [buttonRef, setButtonRef] = useState<
      HTMLButtonElement | HTMLAnchorElement | null
    >(null);

    const setRefs = useCallback(
      (reference: HTMLButtonElement | HTMLAnchorElement | null) => {
        setButtonRef(reference);
        if (!ref) return;
        if (typeof ref === "object") ref.current = reference;
        if (typeof ref === "function") ref(reference);
      },
      [ref],
    );

    const renderChildrenWithIcon = () => {
      if (!iconType) {
        return children;
      }

      const iconProps = {
        "aria-hidden": true,
        bg: "transparent",
      };

      if (children === undefined && children === false) {
        return (
          <Icon
            type={iconType}
            {...iconProps}
            tooltipMessage={iconTooltipMessage}
            tooltipPosition={iconTooltipPosition}
          />
        );
      }

      const getIcon = () => {
        if (iconTooltipMessage) {
          return (
            <TooltipProvider
              disabled={disabled}
              focusable={false}
              target={buttonRef as HTMLElement}
            >
              <Icon
                type={iconType}
                {...iconProps}
                tooltipMessage={iconTooltipMessage}
                tooltipPosition={iconTooltipPosition}
              />
            </TooltipProvider>
          );
        }

        return <Icon type={iconType} {...iconProps} />;
      };

      if (iconPosition === "before" || buttonBarIconPosition === "before") {
        return (
          <>
            {getIcon()}
            {children}
          </>
        );
      }

      return (
        <>
          {children}
          {getIcon()}
        </>
      );
    };

    const isDisabled = disabled || batchSelectionDisabled;

    return (
      <NextButton
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel || (!children && iconType ? iconType : undefined)}
        aria-labelledby={ariaLabelledBy}
        disabled={isDisabled}
        fullWidth={buttonBarFullWidth || fullWidth}
        id={id}
        inverse={isWhite || buttonType === "darkBackground"}
        name={name}
        noWrap={noWrap}
        onBlur={onBlur}
        onClick={!rest.href ? onClick : undefined}
        as={!isDisabled && rest.href ? "a" : "button"}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        ref={setRefs}
        size={buttonBarSize || size}
        type={type as NextButtonProps["type"]}
        variant={computedVariant}
        variantType={computedVariantType}
        {...rest}
      >
        {renderChildrenWithIcon()}
      </NextButton>
    );
  },
);

Button.displayName = "Button";

export default Button;

import React, { forwardRef, ReactNode, useCallback, useState } from "react";
import { SpaceProps } from "styled-system";

import StyledButton, { StyledContentContainer } from "./button.style";
import { Loader } from "../../../loader/__next__/loader.component";
import tagComponent, {
  TagProps,
} from "../../../../__internal__/utils/helpers/tags/tags";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import useLocale from "../../../../hooks/__internal__/useLocale";
import { Size, Variant, VariantType } from "./button.config";

export interface ButtonProps extends SpaceProps, TagProps {
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
  size?: Size;
  /** The HTML type that this button should use. */
  type?: "button" | "reset" | "submit";
  /** The variant of the button. */
  variant?: Variant;
  /** The variant type of the button. */
  variantType?: VariantType;

  /**
   * @internal
   * @private
   * @ignore
   * @legacy
   * Sets the underlying HTML element if href is passed
   */
  as?: "button" | "a";
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
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
    const locale = useLocale();

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

    const allowMotion = useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

    const handleClick = (
      event:
        | React.MouseEvent<HTMLAnchorElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (loading) return;

      buttonRef?.focus({ preventScroll: true });

      onClick?.(event);
    };

    const showLoader = () => {
      if (size === "xs") return null;

      let useWhiteRing = !inverse;

      if (
        (variantType !== "primary" && variant === "default") ||
        (variantType === "secondary" && variant === "destructive") ||
        variant === "gradient"
      ) {
        useWhiteRing = false;
      }

      return (
        <>
          <Loader
            variant="inline"
            loaderType="ring"
            size={size !== "large" ? "extra-small" : "small"}
            inverse={useWhiteRing}
            showLabel={false}
            loaderLabel={locale.loaderSpinner.loading()}
          />
          {allowMotion && locale.loaderSpinner.loading()}
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
        $inverse={inverse}
        id={id}
        name={name}
        $noWrap={noWrap}
        onClick={handleClick}
        ref={setRefs}
        $size={size}
        $variant={variant}
        $variantType={variantType}
        {...tagComponent("button", rest)}
        {...rest}
      >
        <StyledContentContainer data-role="button-child-container">
          {loading ? showLoader() : children}
        </StyledContentContainer>
      </StyledButton>
    );
  },
);

export default Button;

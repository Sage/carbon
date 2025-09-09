import React, { useContext, useEffect, useMemo, useState } from "react";

import Icon, { IconType } from "../icon";
import MenuContext from "../menu/__internal__/menu.context";
import { StyledLink, StyledContent, StyledLinkProps } from "./link.style";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import Logger from "../../__internal__/utils/logger";

export interface LinkProps
  extends StyledLinkProps,
    React.AriaAttributes,
    TagProps {
  /** An href for an anchor tag. */
  href?: string;
  /** An icon to display next to the link. */
  icon?: IconType;
  /** Function called when the mouse is clicked. */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when a key is pressed. */
  onKeyDown?: (
    ev:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when a mouse down event triggers. */
  onMouseDown?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;

  /** Child content to render in the link. */
  children?: React.ReactNode;
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target?: string;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** allows to set rel property in <a> tag */
  rel?: string;
  /** @ignore @private internal prop to be set when no aria-label should be specified */
  removeAriaLabelOnIcon?: boolean;
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** [Legacy] A message to display as a tooltip to the link.
   * @deprecated The tooltipMessage prop in Link is deprecated and will soon be removed. */
  tooltipMessage?: string;
  /** [Legacy] Positions the tooltip with the link.
   * @deprecated The tooltipPosition prop in Link is deprecated and will soon be removed. */
  tooltipPosition?: "bottom" | "left" | "right" | "top";
}

let deprecatedDisabledWarning = false;
let deprecatedTooltipPositionWarning = false;
let deprecatedTooltipMessageWarning = false;
let deprecatedIsDarkBackgroundWarning = false;
const deprecatedVariantValueWarning: Partial<Record<Variants, boolean>> = {
  default: false,
  neutral: false,
};

type Variants = Exclude<StyledLinkProps["variant"], undefined>;

const variantAlias: Partial<Record<Variants, Variants>> = {
  default: "typical",
  neutral: "subtle",
};

export const Link = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkProps
>(
  (
    {
      children,
      onKeyDown,
      href,
      onClick,
      onMouseDown,
      icon,
      iconAlign = "left",
      isSkipLink,
      disabled = false,
      underline = "always",
      ariaLabel,
      rel,
      tooltipMessage,
      tooltipPosition,
      target,
      variant = "typical",
      isDarkBackground,
      inverse,
      removeAriaLabelOnIcon,
      className,
      linkSize = "medium",
      ...rest
    }: LinkProps,
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false);
    const l = useLocale();
    const { inMenu } = useContext(MenuContext);
    const { batchSelectionDisabled } = useContext(BatchSelectionContext);
    const isDisabled = disabled || batchSelectionDisabled;

    if (!deprecatedDisabledWarning && disabled) {
      deprecatedDisabledWarning = true;
      Logger.deprecate(
        "The 'disabled' prop in Link is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedTooltipMessageWarning && tooltipMessage) {
      deprecatedTooltipMessageWarning = true;
      Logger.deprecate(
        "The 'tooltipMessage' prop in Link is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedTooltipPositionWarning && tooltipPosition) {
      deprecatedTooltipPositionWarning = true;
      Logger.deprecate(
        "The 'tooltipPosition' prop in Link is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedIsDarkBackgroundWarning && isDarkBackground) {
      deprecatedIsDarkBackgroundWarning = true;
      Logger.deprecate(
        "The 'isDarkBackground' prop in Link is deprecated and will soon be removed. Please use 'inverse' prop instead.",
      );
    }

    if (!deprecatedVariantValueWarning[variant] && variantAlias[variant]) {
      deprecatedVariantValueWarning[variant] = true;
      Logger.deprecate(
        `The value '${variant}' for the variant prop is deprecated and will soon be removed. Please use value '${variantAlias[variant]}' instead.`,
      );
    }

    const effectiveInverse = inverse ?? isDarkBackground;
    const effectiveVariant = variantAlias[variant] ?? variant;

    const setRefs = React.useCallback(
      (reference: HTMLAnchorElement) => {
        if (!ref) return;
        if (typeof ref === "object") ref.current = reference;
        if (typeof ref === "function") {
          ref(reference);
        }
      },
      [ref],
    );

    const renderLinkIcon = (currentAlignment = "left") => {
      const hasProperAlignment = icon && iconAlign === currentAlignment;

      return hasProperAlignment ? (
        <Icon
          type={icon}
          disabled={isDisabled}
          ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
          tooltipMessage={tooltipMessage}
          tooltipPosition={tooltipPosition}
        />
      ) : null;
    };

    const ariaProps = useMemo(() => {
      const restObject = rest as Record<string, unknown>;

      return Object.keys(restObject)
        .filter((key) => key.startsWith("aria"))
        .reduce((obj: Record<string, unknown>, key: string) => {
          obj[key] = restObject[key];
          return obj;
        }, {});
    }, [rest]);

    const componentProps = {
      onKeyDown,
      onMouseDown,
      onClick,
      disabled: isDisabled,
      target,
      ref: setRefs,
      href,
      rel,
      "aria-label": ariaLabel,
      ...ariaProps,
      onFocus: () => setHasFocus(true),
      onBlur: () => setHasFocus(false),
    };

    const buttonProps = {
      type: "button",
    };

    const createLinkBasedOnType = () => {
      let type = "a";

      if (onClick && !href) {
        type = "button";
      }

      return React.createElement(
        type,
        type === "button"
          ? {
              ...componentProps,
              ...buttonProps,
            }
          : {
              ...componentProps,
              "data-role": "link-anchor",
            },
        <>
          {renderLinkIcon()}

          <StyledContent>
            {isSkipLink ? l.link.skipLinkLabel() : children}
          </StyledContent>

          {renderLinkIcon("right")}
        </>,
      );
    };

    useEffect(() => {
      if (disabled || !(href || onClick)) {
        setHasFocus(false);
      }
    }, [disabled, href, onClick]);

    return (
      <StyledLink
        isSkipLink={isSkipLink}
        disabled={isDisabled}
        underline={underline}
        iconAlign={iconAlign}
        className={className}
        hasContent={Boolean(children)}
        variant={effectiveVariant}
        inverse={effectiveInverse}
        isMenuItem={inMenu}
        {...tagComponent("link", rest)}
        {...(isSkipLink && { "data-element": "skip-link" })}
        hasFocus={hasFocus}
        linkSize={linkSize}
      >
        {createLinkBasedOnType()}
      </StyledLink>
    );
  },
);

Link.displayName = "Link";

export default Link;

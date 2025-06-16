import React, { useContext, useEffect, useState } from "react";
import Icon from "../icon";
import MenuContext from "../menu/__internal__/menu.context";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";

import type { StyledLinkProps, Variants } from "./link.style.types";
import { StyledLinkStyles, StyledContent } from "./link.style";
import { BaseLink } from "./__internal__/base-link.component";
import type { IconType } from "../icon";

export interface LinkProps
  extends React.AriaAttributes,
    TagProps,
    Omit<StyledLinkProps, "variant"> {
  /** If provided, renders an anchor (`<a>`) tag; otherwise, renders a button */
  href?: string;
  /** Icon name (must match a valid `Icon` type) to display next to the link */
  icon?: string;
  /** Position of the icon relative to the content ("left" or "right"). Defaults to "left" */
  iconAlign?: "left" | "right";
  /** Optional tooltip text to show when hovering over the icon */
  tooltipMessage?: string;
  /** Position of the tooltip ("top", "bottom", "left", or "right"). Defaults to "top" */
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  /** Inner content (usually text) of the link */
  children?: React.ReactNode;
  /** Where to open the linked document (e.g., "_blank" to open in a new tab) */
  target?: string;
  /** Relationship between the current document and the linked one (e.g., "noopener noreferrer") */
  rel?: string;
  /** Aria label for screen readers. Required if no visible content is present */
  ariaLabel?: string;
  /** Click event handler (mouse or keyboard). Accepts both mouse and keyboard events */
  onClick?:
    | React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
    | ((
        ev:
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLButtonElement>
          | React.KeyboardEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLButtonElement>,
      ) => void);
  /** KeyDown event handler (e.g., for keyboard navigation or shortcuts) */
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** MouseDown event handler */
  onMouseDown?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Focus event handler (when the link/button receives focus) */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /** Blur event handler (when the link/button loses focus) */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /** If true, prevents `aria-label` from being applied to the icon */
  removeAriaLabelOnIcon?: boolean;
  /** If true, renders a visually hidden "Skip to content" link for accessibility */
  isSkipLink?: boolean;
  /** If true, disables the link or button and applies disabled styles */
  disabled?: boolean;
  /** Optional class name for custom styling */
  className?: string;
  /** Visual styling variant (e.g., "default", "neutral", "negative") */
  variant?: Variants;
  /** If true, adjusts styles for use on a dark background */
  isDarkBackground?: boolean;
  /** When set, applies text overflow styles (for use in e.g., MenuItem) */
  maxWidth?: StyledLinkProps["maxWidth"];
}

const Link = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
  (
    {
      children,
      className,
      icon,
      iconAlign = "left",
      variant = "default",
      isDarkBackground,
      isSkipLink,
      href,
      onClick,
      onKeyDown,
      onMouseDown,
      onFocus,
      onBlur,
      disabled,
      rel,
      target,
      ariaLabel,
      removeAriaLabelOnIcon,
      tooltipMessage,
      tooltipPosition,
      maxWidth,
      ...rest
    },
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false);
    const { inMenu } = useContext(MenuContext);
    const { batchSelectionDisabled } = useContext(BatchSelectionContext);
    const locale = useLocale();

    const isDisabled = disabled || batchSelectionDisabled;

    useEffect(() => {
      if (isDisabled || !(href || onClick)) {
        setHasFocus(false);
      }
    }, [isDisabled, href, onClick]);

    const handleFocus: React.FocusEventHandler<HTMLElement> = (e) => {
      setHasFocus(true);
      onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<HTMLElement> = (e) => {
      setHasFocus(false);
      onBlur?.(e);
    };

    const renderIcon = (align: "left" | "right") =>
      icon && iconAlign === align ? (
        <Icon
          type={icon as IconType}
          disabled={isDisabled}
          ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
          tooltipMessage={tooltipMessage}
          tooltipPosition={tooltipPosition}
          data-testid="icon"
        />
      ) : null;

    const customStyles = StyledLinkStyles({
      variant,
      disabled: isDisabled,
      isMenuItem: inMenu,
      isSkipLink,
      iconAlign,
      hasContent: Boolean(children),
      hasFocus,
      isDarkBackground,
      maxWidth,
    });

    const isBackButton = rest["data-role"] === "heading-back-button";
    const accessibleLabel = ariaLabel || (isBackButton ? "Back" : undefined);

    const mouseOnClick = onClick as
      | React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
      | undefined;

    return (
      <BaseLink
        ref={ref}
        href={href}
        rel={rel}
        target={target}
        aria-label={accessibleLabel}
        className={className}
        onClick={mouseOnClick}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isDisabled}
        customStyles={customStyles}
        {...tagComponent("link", rest)}
        {...(isSkipLink && { "data-element": "skip-link" })}
      >
        {renderIcon("left")}
        <StyledContent>
          {isSkipLink
            ? locale.link.skipLinkLabel()
            : (children ?? <span aria-hidden="true">{ariaLabel}</span>)}
        </StyledContent>
        {renderIcon("right")}
      </BaseLink>
    );
  },
);

Link.displayName = "Link";

export default Link;

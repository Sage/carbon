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
  /** The href attribute. If provided, renders an anchor (<a>) tag; otherwise, renders a button. */
  href?: string;
  /** The name of the icon to render (must correspond to a valid Icon type). */
  icon?: string;
  /** Position of the icon relative to the content (left or right). Defaults to "left". */
  iconAlign?: "left" | "right";
  /** Message shown in a tooltip on hover. */
  tooltipMessage?: string;
  /** Position of the tooltip relative to the link. */
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  /** The inner content of the link. */
  children?: React.ReactNode;
  /** Specifies where to open the linked document (e.g., _blank, _self). */
  target?: string;
  /** Specifies the relationship between the current document and the linked one. */
  rel?: string;
  /** Accessible label for screen readers. Applied as aria-label. */
  ariaLabel?: string;
  /** Called when the link or button is clicked (mouse or keyboard-triggered). */
  onClick?:
    | React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
    | ((
        ev:
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLButtonElement>
          | React.KeyboardEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLButtonElement>,
      ) => void);
  /** Called when a key is pressed while the link or button is focused. */
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Called when the mouse is pressed down on the link or button. */
  onMouseDown?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Called when the link or button receives focus. */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /** Called when the link or button loses focus. */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /** If true, prevents aria-label from being applied to the icon. */
  removeAriaLabelOnIcon?: boolean;
  /** If true, renders the link as a "skip to content" link for accessibility. */
  isSkipLink?: boolean;
  /** Whether the link is disabled. */
  disabled?: boolean;
  /** Custom CSS class for the component. */
  className?: string;
  /** Visual style variant for the link (e.g., "default", "negative", "neutral"). */
  variant?: Variants;
  /** If true, adjusts colors for rendering on a dark background. */
  isDarkBackground?: boolean;
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
    });

    const isBackButton = rest["data-role"] === "heading-back-button";
    const accessibleLabel = ariaLabel || (isBackButton ? "Back" : undefined);

    return (
      <BaseLink
        ref={ref}
        href={href}
        rel={rel}
        target={target}
        aria-label={accessibleLabel}
        className={className}
        onClick={onClick}
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

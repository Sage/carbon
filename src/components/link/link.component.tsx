import React, { useContext, useEffect, useState } from "react";
import Icon from "../icon";
import MenuContext from "../menu/__internal__/menu.context";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";

import type { StyledLinkProps, Variants } from "./link.style.types";
import StyledLinkStyles, { StyledContent } from "./link.style";
import { BaseLink } from "./__internal__/base-link.component";

import type { IconType } from "../icon";

export interface LinkProps
  extends React.AriaAttributes,
    TagProps,
    Omit<StyledLinkProps, "variant"> {
  /** An href value for the link. If provided, renders an anchor tag. */
  href?: string;
  /** The name of the icon to display alongside the link content. */
  icon?: string;
  /** Which side of the link to render the icon. */
  iconAlign?: "left" | "right";
  /** Tooltip text displayed when hovering over the link. */
  tooltipMessage?: string;
  /** The position of the tooltip relative to the link. */
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  /** The content to be rendered inside the link. */
  children?: React.ReactNode;
  /** Specifies where to open the linked document (e.g., _blank, _self). */
  target?: string;
  /** Sets the `rel` attribute on the anchor element (e.g., "noopener"). */
  rel?: string;
  /** Accessible label for screen readers, applied via `aria-label`. */
  ariaLabel?: string;
  /** Called when the link is clicked (mouse only). */
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Called when a key is pressed while the link is focused. */
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Called when the mouse is pressed down on the link. */
  onMouseDown?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Prevents `ariaLabel` from being applied to the icon when true. */
  removeAriaLabelOnIcon?: boolean;
  /** Allows the link to function as a skip link for accessibility. */
  isSkipLink?: boolean;
  /** The disabled state of the link. */
  disabled?: boolean;
  /** Sets a custom class name on the component. */
  className?: string;
  /** Allows link styling to be updated for light or dark backgrounds. */
  variant?: Variants;
  /** Sets the colour styling when the component is rendered on a dark background. */
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

    const styles = StyledLinkStyles({
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
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        disabled={isDisabled}
        styles={styles}
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

import React, { useContext, useEffect, useState } from "react";
import { StyledLink } from "./link.style";
import type { Variants } from "./link.style";
import type { IconType } from "../icon";
import MenuContext from "../menu/__internal__/menu.context";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import BaseLink from "../link/__internal__/base-link.component";

export interface LinkProps extends React.AriaAttributes, TagProps {
  href?: string;
  icon?: string;
  iconAlign?: "left" | "right";
  tooltipMessage?: string;
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  children?: React.ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  removeAriaLabelOnIcon?: boolean;
  isSkipLink?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: Variants;
  isDarkBackground?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
  (
    {
      children,
      className,
      icon,
      iconAlign,
      variant = "default",
      isDarkBackground,
      isSkipLink,
      href,
      onClick,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false);
    const { inMenu } = useContext(MenuContext);
    const { batchSelectionDisabled } = useContext(BatchSelectionContext);

    const isDisabled = disabled || batchSelectionDisabled;
    const isInteractive = !!href || !!onClick;

    useEffect(() => {
      if (isDisabled || !isInteractive) {
        setHasFocus(false);
      }
    }, [isDisabled, isInteractive]);

    const createLinkBasedOnType = () => (
      <BaseLink
        {...rest}
        ref={ref}
        href={href}
        onClick={onClick}
        disabled={isDisabled}
        icon={icon as IconType}
        iconAlign={iconAlign}
        isSkipLink={isSkipLink}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      >
        {children}
      </BaseLink>
    );

    return (
      <StyledLink
        data-component="link"
        isSkipLink={isSkipLink}
        disabled={isDisabled}
        iconAlign={iconAlign}
        className={className}
        hasContent={Boolean(children)}
        variant={variant}
        isDarkBackground={isDarkBackground}
        isMenuItem={inMenu}
        {...tagComponent("link", rest)}
        {...(isSkipLink && { "data-element": "skip-link" })}
        hasFocus={hasFocus}
      >
        {createLinkBasedOnType()}
      </StyledLink>
    );
  },
);

Link.displayName = "Link";
export default Link;

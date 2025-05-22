import React from "react";
import { StyledLink } from "../link.style";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";

export interface BaseLinkProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  icon?: React.ReactNode;
  iconAlign?: "left" | "right";
  tabIndex?: number;
  target?: string;
  rel?: string;
  isSkipLink?: boolean;
  className?: string;
  "data-element"?: string;
  "data-role"?: string;
  "data-initials"?: string;
  "aria-label"?: string;
}

const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement,
  BaseLinkProps
>(
  (
    {
      children,
      disabled,
      onClick,
      href,
      icon,
      iconAlign,
      tabIndex,
      target,
      rel,
      isSkipLink,
      className,
      "data-element": dataElement = "link",
      "data-role": dataRole,
      "data-initials": dataInitials,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const isButton = !!onClick && !href;
    const isAnchor = !!href;

    const tagProps = {
      ...tagComponent("link", rest),
      className,
      "data-element": dataElement,
      "data-role": dataRole,
      "aria-label": ariaLabel,
      tabIndex: disabled ? -1 : tabIndex,
    };

    const showInitialsFallback =
      !children || (typeof children === "string" && children.trim() === "");

    const linkContent = (
      <StyledLink
        disabled={disabled}
        isSkipLink={isSkipLink}
        iconAlign={iconAlign}
        hasContent={!showInitialsFallback}
        data-component="link"
      >
        {icon}
        {showInitialsFallback ? (
          <span data-element="initials">{dataInitials}</span>
        ) : (
          children
        )}
      </StyledLink>
    );

    if (isAnchor) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          onClick={disabled ? undefined : onClick}
          target={target}
          rel={rel}
          {...tagProps}
        >
          {linkContent}
        </a>
      );
    }

    if (isButton) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          {...tagProps}
        >
          {linkContent}
        </button>
      );
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        aria-disabled={disabled}
        {...tagProps}
      >
        {linkContent}
      </span>
    );
  },
);

BaseLink.displayName = "BaseLink";

export default BaseLink;

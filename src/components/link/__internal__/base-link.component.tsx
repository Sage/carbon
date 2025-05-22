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
      ...rest
    },
    ref,
  ) => {
    const tagProps = tagComponent("link", rest);

    const showInitialsFallback =
      !children || (typeof children === "string" && children.trim() === "");

    const linkContent = (
      <StyledLink
        disabled={disabled}
        isSkipLink={isSkipLink}
        iconAlign={iconAlign}
        hasContent={!showInitialsFallback}
      >
        {icon}
        {showInitialsFallback ? (
          <span data-element="initials">{rest["data-initials"]}</span>
        ) : (
          children
        )}
      </StyledLink>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          target={target}
          rel={rel}
          onClick={disabled ? undefined : onClick}
          tabIndex={disabled ? -1 : tabIndex}
          {...tagProps}
        >
          {linkContent}
        </a>
      );
    }

    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          tabIndex={disabled ? -1 : tabIndex}
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
        tabIndex={disabled ? -1 : tabIndex}
        {...tagProps}
      >
        {linkContent}
      </span>
    );
  },
);

BaseLink.displayName = "BaseLink";
export default BaseLink;

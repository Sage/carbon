import React from "react";
import type { FlattenSimpleInterpolation } from "styled-components";
import StyledBaseLinkWrapper from "./base-link.style";

export interface BaseLinkProps extends React.AriaAttributes {
  /** The `href` for anchor links. If provided, an `<a>` is rendered. */
  href?: string;
  /** The child elements or text content inside the link. */
  children?: React.ReactNode;
  /** The `target` attribute for anchor links (e.g. `_blank`, `_self`). */
  target?: string;
  /** The `rel` attribute for anchor links (e.g. `"noopener"`). */
  rel?: string;
  /** Optional class name to apply to the rendered element. */
  className?: string;
  /** Disables the button/link visually and functionally. */
  disabled?: boolean;
  /** Specifies the button type when rendered as a `<button>`. */
  type?: "button" | "submit" | "reset";
  /** Defines the tab order. */
  tabIndex?: number;
  /** Optional inline styles. */
  style?: React.CSSProperties;
  /** Data-role for internal testing/targeting. */
  "data-role"?: string;
  /** Data-element identifier, commonly used in testing. */
  "data-element"?: string;
  /** Called on mouse click. */
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Called when a key is pressed down. */
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Called when mouse button is pressed down. */
  onMouseDown?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Called when the element receives focus. */
  onFocus?: React.FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Called when the element loses focus. */
  onBlur?: React.FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** CSS styles passed from the parent component, injected via styled-components. */
  $styles?: FlattenSimpleInterpolation;
}

const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(({ href, children, $styles, type = "button", ...rest }, ref) => {
  const Element = href ? "a" : "button";

  return (
    <StyledBaseLinkWrapper $styles={$styles}>
      {Element === "a" ? (
        <a href={href} ref={ref as React.Ref<HTMLAnchorElement>} {...rest}>
          {children}
        </a>
      ) : (
        // eslint-disable-next-line react/button-has-type
        <button ref={ref as React.Ref<HTMLButtonElement>} type={type} {...rest}>
          {children}
        </button>
      )}
    </StyledBaseLinkWrapper>
  );
});

BaseLink.displayName = "BaseLink";
export default BaseLink;

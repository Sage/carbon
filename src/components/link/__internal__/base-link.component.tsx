import React from "react";
import type { FlattenSimpleInterpolation } from "styled-components";
import StyledBaseLinkWrapper from "./base-link.style";

export interface BaseLinkProps extends React.AriaAttributes {
  /** The URL to link to. If omitted, renders a <button>. */
  href?: string;
  /** The children nodes to render inside the link. */
  children?: React.ReactNode;
  /** Anchor `target` attribute. */
  target?: string;
  /** Anchor `rel` attribute. */
  rel?: string;
  /** Data attribute to identify the element. */
  "data-role"?: string;
  /** Data element name, e.g. skip-link. */
  "data-element"?: string;
  /** Whether the component is disabled. */
  disabled?: boolean;
  /** Optional className. */
  className?: string;
  /** Optional inline styles. */
  style?: React.CSSProperties;
  /** Tab index for accessibility. */
  tabIndex?: number;
  /** Optional styles passed from the parent component. */
  $styles?: FlattenSimpleInterpolation;
}

const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(({ href, children, $styles, ...rest }, ref) => {
  return (
    <StyledBaseLinkWrapper $styles={$styles}>
      {href ? (
        <a href={href} ref={ref as React.Ref<HTMLAnchorElement>} {...rest}>
          {children}
        </a>
      ) : (
        <button
          type="button"
          ref={ref as React.Ref<HTMLButtonElement>}
          {...rest}
        >
          {children}
        </button>
      )}
    </StyledBaseLinkWrapper>
  );
});

BaseLink.displayName = "BaseLink";
export default BaseLink;
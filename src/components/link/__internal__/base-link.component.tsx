import React from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Ref,
  AriaAttributes,
} from "react";
import type { FlattenSimpleInterpolation } from "styled-components";
import StyledBaseLinkWrapper from "./base-link.style";

interface SharedProps extends AriaAttributes {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
  "data-role"?: string;
  "data-element"?: string;
  $styles?: FlattenSimpleInterpolation;
  disabled?: boolean;
}

type BaseLinkProps =
  | (SharedProps & {
      href: string;
      target?: string;
      rel?: string;
      ref?: Ref<HTMLAnchorElement>;
    } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | (SharedProps & {
      href?: string;
      ref?: Ref<HTMLButtonElement>;
    } & ButtonHTMLAttributes<HTMLButtonElement>);

const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(({ href, children, $styles, ...rest }, ref) => {
  return (
    <StyledBaseLinkWrapper $styles={$styles}>
      {href ? (
        <a
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
        >
          {children}
        </a>
      ) : (
        <button
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
          type="button"
          ref={ref as Ref<HTMLButtonElement>}
        >
          {children}
        </button>
      )}
    </StyledBaseLinkWrapper>
  );
});

BaseLink.displayName = "BaseLink";
export default BaseLink;

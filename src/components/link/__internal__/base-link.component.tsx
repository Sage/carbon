import React, { useCallback } from "react";
import type {
  AriaAttributes,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
} from "react";
import type { FlattenSimpleInterpolation } from "styled-components";
import StyledBaseLinkWrapper from "./base-link.style";

export interface BaseLinkProps extends AriaAttributes {
  /** An href for an anchor tag. */
  href?: string;
  /** Function called when the mouse is clicked. */
  onClick?: (
    ev:
      | MouseEvent<HTMLAnchorElement>
      | MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLAnchorElement>
      | KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when a key is pressed. */
  onKeyDown?: (
    ev: KeyboardEvent<HTMLAnchorElement> | KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when a mouse down event triggers. */
  onMouseDown?: (
    ev: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when focus is received. */
  onFocus?: (
    ev: FocusEvent<HTMLAnchorElement> | FocusEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when focus is lost. */
  onBlur?: (
    ev: FocusEvent<HTMLAnchorElement> | FocusEvent<HTMLButtonElement>,
  ) => void;
  /** Set the component to disabled */
  disabled?: boolean;
  /** Child content to render in the link. */
  children?: React.ReactNode;
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target?: string;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** allows to set rel property in <a> tag */
  rel?: string;
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /**
   * @private
   * @internal
   * @ignore
   */
  "data-component"?: string;
  /**
   * @private
   * @internal
   * @ignore
   */
  "data-element"?: string;
  /**
   * @private
   * @internal
   * @ignore
   */
  "data-role"?: string;
  styles?: FlattenSimpleInterpolation;
}

export const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(({ href, children, styles, onClick, ...rest }, ref) => {
  const setAnchorRef = useCallback(
    (reference: HTMLAnchorElement | null) => {
      if (!ref) return;
      if (typeof ref === "object" && ref !== null) {
        (ref as React.MutableRefObject<HTMLAnchorElement | null>).current =
          reference;
      } else if (typeof ref === "function") {
        ref(reference);
      }
    },
    [ref],
  );

  const setButtonRef = useCallback(
    (reference: HTMLButtonElement | null) => {
      if (!ref) return;
      if (typeof ref === "object" && ref !== null) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
          reference;
      } else if (typeof ref === "function") {
        ref(reference);
      }
    },
    [ref],
  );

  return (
    <StyledBaseLinkWrapper $styles={styles}>
      {onClick && !href ? (
        <button ref={setButtonRef} type="button" {...rest}>
          {children}
        </button>
      ) : (
        <a ref={setAnchorRef} href={href} {...rest} data-role="link-anchor">
          {children}
        </a>
      )}
    </StyledBaseLinkWrapper>
  );
});

BaseLink.displayName = "BaseLink";

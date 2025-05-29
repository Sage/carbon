import React, { useMemo } from "react";
import { SimpleInterpolation } from "styled-components";

import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import StyledBaseLinkWrapper from "./base-link.style";

export interface BaseLinkProps extends React.AriaAttributes {
  /** An href for an anchor tag. */
  href?: string;
  /** Function called when the mouse is clicked. */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when a key is pressed. */
  onKeyDown?: (
    ev:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when a mouse down event triggers. */
  onMouseDown?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when focus is received. */
  onFocus?: (
    ev:
      | React.FocusEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLButtonElement>,
  ) => void;
  /** Function called when focus is lost. */
  onBlur?: (
    ev:
      | React.FocusEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLButtonElement>,
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
  styles?: SimpleInterpolation;
}

export const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(
  (
    {
      children,
      onKeyDown,
      href,
      onClick,
      onMouseDown,
      ariaLabel,
      rel,
      target,
      className,
      disabled,
      onFocus,
      onBlur,
      "data-component": dataComponent,
      styles,
      ...rest
    }: BaseLinkProps,
    ref,
  ) => {
    const setAnchorRef = React.useCallback(
      (reference: HTMLAnchorElement | null) => {
        if (!ref) return;
        if (typeof ref === "object" && ref !== null)
          (
            ref as React.MutableRefObject<
              HTMLAnchorElement | HTMLButtonElement | null
            >
          ).current = reference;
        if (typeof ref === "function") {
          ref(reference);
        }
      },
      [ref],
    );

    const setButtonRef = React.useCallback(
      (reference: HTMLButtonElement | null) => {
        if (!ref) return;
        if (typeof ref === "object" && ref !== null)
          (
            ref as React.MutableRefObject<
              HTMLAnchorElement | HTMLButtonElement | null
            >
          ).current = reference;
        if (typeof ref === "function") {
          ref(reference);
        }
      },
      [ref],
    );

    const ariaProps = useMemo(() => {
      const restObject = rest as Record<string, unknown>;

      return Object.keys(restObject)
        .filter((key) => key.startsWith("aria"))
        .reduce((obj: Record<string, unknown>, key: string) => {
          obj[key] = restObject[key];
          return obj;
        }, {});
    }, [rest]);

    const componentProps = {
      onKeyDown,
      onMouseDown,
      onClick,
      disabled,
      target,
      href,
      rel,
      "aria-label": ariaLabel,
      ...ariaProps,
      onFocus,
      onBlur,
    };

    return (
      <StyledBaseLinkWrapper
        $styles={styles}
        className={className}
        {...tagComponent(dataComponent, rest)}
      >
        {onClick && !href ? (
          <button ref={setButtonRef} type="button" {...componentProps}>
            {children}
          </button>
        ) : (
          <a ref={setAnchorRef} {...componentProps} data-role="link-anchor">
            {children}
          </a>
        )}
      </StyledBaseLinkWrapper>
    );
  },
);

export default BaseLink;

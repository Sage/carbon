import React, { forwardRef, useCallback, MutableRefObject } from "react";
import type { SimpleInterpolation } from "styled-components";
import StyledBaseLinkWrapper from "../__internal__/base-link.style";

export interface BaseLinkProps {
  /** The href attribute. If provided, renders an anchor (<a>) tag; otherwise, renders a button. */
  href?: string;
  /** The content inside the link or button. */
  children: React.ReactNode;
  /** Custom styled-components CSS passed to the wrapper (used with styled-components). */
  customStyles?: SimpleInterpolation;
  /** Called when the link or button is clicked (supports mouse and keyboard triggers). */
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
  /** Sets an accessible label via aria-label for screen readers. */
  ariaLabel?: string;
  /** Specifies the relationship between the current document and the linked one. */
  rel?: string;
  /** Specifies where to open the linked document (e.g., _blank, _self). */
  target?: string;
  /** Whether the link or button is disabled. */
  disabled?: boolean;
  /** Optional CSS class to apply to the component. */
  className?: string;
  /** Optional test ID for querying the link in tests. */
  "data-testid"?: string;
  /** Optional data-role attribute used for automation or styling. */
  "data-role"?: string;
  /** Indicates the current item in a set of related links. */
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | boolean;
}

export const BaseLink = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>((props, ref) => {
  const {
    href,
    children,
    customStyles,
    onClick,
    onKeyDown,
    onMouseDown,
    onFocus,
    onBlur,
    rel,
    target,
    disabled,
    className,
    ariaLabel,
    "data-testid": providedTestId,
    "data-role": providedDataRole,
    ...rest
  } = props;

  const finalTestId = providedTestId || "link-anchor";
  const finalDataRole =
    providedDataRole === "crumb"
      ? "link-anchor"
      : (providedDataRole ?? "link-anchor");

  const commonProps = {
    onClick,
    onKeyDown,
    onMouseDown,
    onFocus,
    onBlur,
    rel,
    target,
    disabled,
    className,
    "aria-label": ariaLabel,
    "data-testid": finalTestId,
    "data-role": finalDataRole,
    ...rest,
  };

  const setAnchorRef = useCallback(
    (node: HTMLAnchorElement | null) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<HTMLAnchorElement | null>).current = node;
    },
    [ref],
  );

  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<HTMLButtonElement | null>).current = node;
    },
    [ref],
  );

  const renderAsButton = onClick && !href;

  return (
    <StyledBaseLinkWrapper $styles={customStyles}>
      {renderAsButton ? (
        <button type="button" ref={setButtonRef} {...commonProps}>
          {children}
        </button>
      ) : (
        <a href={href} ref={setAnchorRef} {...commonProps}>
          {children}
        </a>
      )}
    </StyledBaseLinkWrapper>
  );
});

BaseLink.displayName = "BaseLink";
export default BaseLink;

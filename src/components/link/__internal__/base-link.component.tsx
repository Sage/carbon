import React from "react";
import { SimpleInterpolation } from "styled-components";
import StyledBaseLinkWrapper from "./base-link.style";

export interface BaseLinkProps {
  /** The href attribute. If provided, renders an anchor (<a>) tag; otherwise, renders a button. */
  href?: string;
  /** The content inside the link or button. */
  children: React.ReactNode;
  /** Custom styled-components CSS passed to the wrapper (used with styled-components). */
  customStyles?: SimpleInterpolation;
  /** Called when the link or button is clicked (includes support for keyboard-based clicks). */
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
}

type DataAndAriaAttributes = Partial<Record<`data-${string}`, string>> &
  Partial<Record<`aria-${string}`, string>>;

type InternalBaseLinkProps = BaseLinkProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement> &
      React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseLinkProps | "style"
  > &
  DataAndAriaAttributes;

export const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  InternalBaseLinkProps
>(
  (
    { href, children, customStyles, onClick, onKeyDown, ariaLabel, ...rest },
    ref,
  ) => {
    const {
      "aria-label": ariaLabelFromRest,
      "data-role": dataRoleFromRest,
      "data-testid": providedTestId,
      ...restWithoutExtractedProps
    } = rest;

    const finalAriaLabel = ariaLabel || ariaLabelFromRest;
    const finalTestId = providedTestId || "link-anchor";
    const finalDataRole =
      dataRoleFromRest === "crumb"
        ? "link-anchor"
        : dataRoleFromRest || "link-anchor";

    const isBackButton =
      restWithoutExtractedProps["data-role"] === "heading-back-button";
    const autoAriaLabel = isBackButton ? "Back" : undefined;
    const resolvedAriaLabel = finalAriaLabel || autoAriaLabel;

    const setAnchorRef = (element: HTMLAnchorElement | null) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const setButtonRef = (element: HTMLButtonElement | null) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <StyledBaseLinkWrapper $styles={customStyles}>
        {href ? (
          <a
            ref={setAnchorRef}
            href={href}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-label={resolvedAriaLabel}
            data-testid={finalTestId}
            data-role={finalDataRole}
            {...restWithoutExtractedProps}
          >
            {children}
          </a>
        ) : (
          <button
            ref={setButtonRef}
            type="button"
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-label={resolvedAriaLabel}
            data-testid={finalTestId}
            data-role={finalDataRole}
            {...restWithoutExtractedProps}
          >
            {children}
          </button>
        )}
      </StyledBaseLinkWrapper>
    );
  },
);

BaseLink.displayName = "BaseLink";

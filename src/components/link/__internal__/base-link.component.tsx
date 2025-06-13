import React, {
  forwardRef,
  useCallback,
  MutableRefObject,
  ReactNode,
} from "react";
import type { SimpleInterpolation } from "styled-components";
import StyledBaseLinkWrapper from "../__internal__/base-link.style";

export interface BaseLinkProps {
  /** The href attribute. If provided, renders an anchor (<a>) tag; otherwise, renders a button. */
  href?: string;
  /** The content inside the link or button. */
  children: ReactNode;
  /** Custom styled-components CSS passed to the wrapper. */
  customStyles?: SimpleInterpolation;
  /** Called when the link or button is clicked. */
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
  /** Role for automation/testing (e.g., 'link-anchor', 'menu-item-wrapper'). */
  "data-role"?: string;
  /** Test ID for testing utilities. */
  "data-testid"?: string;
  /** Allows passing additional custom data attributes. */
  [key: `data-${string}`]: string | undefined;
  /** Allows passing additional custom aria attributes. */
  [key: `aria-${string}`]: string | undefined;
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
    "data-role": dataRole = "link-anchor",
    ariaLabel,
    ...rest
  } = props;

  const componentProps = {
    onClick,
    onKeyDown,
    onMouseDown,
    onFocus,
    onBlur,
    "aria-label": ariaLabel,
    "data-role": dataRole,
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

  const isButton = onClick && !href;

  return (
    <StyledBaseLinkWrapper $styles={customStyles}>
      {isButton ? (
        <button type="button" ref={setButtonRef} {...componentProps}>
          {children}
        </button>
      ) : (
        <a href={href} ref={setAnchorRef} {...componentProps}>
          {children}
        </a>
      )}
    </StyledBaseLinkWrapper>
  );
});

BaseLink.displayName = "BaseLink";

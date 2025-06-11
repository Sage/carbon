import React from "react";
import { SimpleInterpolation } from "styled-components";
import StyledBaseLinkWrapper from "./base-link.style";

export interface BaseLinkProps {
  href?: string;
  children: React.ReactNode;
  styles?: SimpleInterpolation;
  onClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  ariaLabel?: string;
}

type DataAndAriaAttributes = {
  [key: `aria-${string}`]: string | undefined;
};

type InternalBaseLinkProps = BaseLinkProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement> &
      React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseLinkProps
  > &
  DataAndAriaAttributes & {
    $styles?: SimpleInterpolation;
  };

export const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  InternalBaseLinkProps
>(
  (
    { href, children, styles, onClick, onKeyDown, ariaLabel, $styles, ...rest },
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (onClick) {
          onClick(e as unknown as React.MouseEvent);
        }
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

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
      <StyledBaseLinkWrapper $styles={styles}>
        {href ? (
          <a
            ref={setAnchorRef}
            href={href}
            onClick={onClick}
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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

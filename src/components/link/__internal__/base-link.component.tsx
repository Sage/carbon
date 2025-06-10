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

export const BaseLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BaseLinkProps
>(({ href, children, styles, onClick, onKeyDown, ariaLabel, ...rest }, ref) => {
  const { $styles, ...cleanedRest } = rest as any; 
  
  const { 
    'aria-label': ariaLabelFromRest, 
    'data-role': dataRoleFromRest,
    'data-testid': providedTestId,
    ...restWithoutExtractedProps 
  } = cleanedRest;
  
  const finalAriaLabel = ariaLabel || ariaLabelFromRest;
  const finalTestId = providedTestId || "link-anchor";
  const finalDataRole = dataRoleFromRest === "crumb" ? "link-anchor" : (dataRoleFromRest || "link-anchor");
 
  const isBackButton = restWithoutExtractedProps["data-role"] === "heading-back-button";
  const autoAriaLabel = isBackButton ? "Back" : undefined;
  const resolvedAriaLabel = finalAriaLabel || autoAriaLabel;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onClick) {
        onClick(e as any);
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
});

BaseLink.displayName = "BaseLink";
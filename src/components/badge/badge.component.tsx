import React from "react";
import {
  StyledBadgeWrapper,
  StyledButton,
  StyledCrossIcon,
  StyledCounter,
} from "./badge.style";

export interface BadgeProps {
  /** The badge will be added to this element */
  children: React.ReactNode;
  /** The number rendered in the badge component */
  counter?: string | number;
  /** Callback fired when badge is clicked */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export const Badge = ({ children, counter = 0, onClick }: BadgeProps) => {
  return (
    <StyledBadgeWrapper>
      {counter > 0 && (
        <StyledButton
          data-component="badge"
          buttonType="secondary"
          onClick={onClick}
        >
          <StyledCrossIcon data-element="badge-cross-icon" type="cross" />
          <StyledCounter data-element="badge-counter">
            {counter > 99 ? 99 : counter}
          </StyledCounter>
        </StyledButton>
      )}
      {children}
    </StyledBadgeWrapper>
  );
};

export default Badge;

import React, { useContext } from "react";
import {
  StyledBadgeWrapper,
  StyledCrossIcon,
  StyledCounter,
  StyledBadge,
  StyledBadgeAsButton,
} from "./badge.style";
import { NewValidationContext as RoundedCornersOptOutContext } from "../carbon-provider/carbon-provider.component";

export interface BadgeProps {
  /** Prop to specify an aria-label for the component */
  "aria-label"?: string;
  /** The badge will be added to this element */
  children: React.ReactNode;
  /** The number rendered in the badge component */
  counter?: string | number;
  /** Callback fired when badge is clicked */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export const Badge = ({
  "aria-label": ariaLabel,
  children,
  counter = 0,
  onClick,
}: BadgeProps) => {
  const shouldDisplayCounter = Number(counter) > 0;
  const counterToDisplay = Number(counter) > 99 ? 99 : counter;
  const { roundedCornersOptOut } = useContext(RoundedCornersOptOutContext);

  const renderCorrectBadge = () => {
    if (shouldDisplayCounter) {
      if (onClick) {
        return (
          <StyledBadgeAsButton
            roundedCornersOptOut={roundedCornersOptOut}
            data-component="badge"
            buttonType="secondary"
            onClick={onClick}
          >
            <StyledCrossIcon data-element="badge-cross-icon" type="cross" />
            <StyledCounter data-element="badge-counter">
              {counterToDisplay}
            </StyledCounter>
          </StyledBadgeAsButton>
        );
      }

      return (
        <StyledBadge
          roundedCornersOptOut={roundedCornersOptOut}
          data-component="badge"
          aria-label={ariaLabel}
        >
          <StyledCounter data-element="badge-counter">
            {counterToDisplay}
          </StyledCounter>
        </StyledBadge>
      );
    }

    return null;
  };

  return (
    <StyledBadgeWrapper>
      {renderCorrectBadge()}
      {children}
    </StyledBadgeWrapper>
  );
};

export default Badge;

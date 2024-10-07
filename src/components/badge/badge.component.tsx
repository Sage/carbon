import React, { useState } from "react";
import {
  StyledBadgeWrapper,
  StyledCrossIcon,
  StyledCounter,
  StyledBadge,
} from "./badge.style";

export interface BadgeProps {
  /** Prop to specify an aria-label for the component */
  "aria-label"?: string;
  /** The badge will be added to this element */
  children: React.ReactNode;
  /** The number rendered in the badge component */
  counter?: string | number;
  /** Prop to specify the colour of the component */
  color?: string;
  /** Callback fired when badge is clicked */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export const Badge = ({
  "aria-label": ariaLabel,
  children,
  counter = 0,
  color = "--colorsActionMajor500",
  onClick,
}: BadgeProps) => {
  const shouldDisplayCounter = +counter > 0;
  const counterToDisplay = +counter > 99 ? 99 : counter;
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderCorrectBadge = () => {
    const props = onClick
      ? {
          buttonType: "secondary",
          onClick,
        }
      : {
          "aria-label": ariaLabel,
        };

    if (shouldDisplayCounter) {
      return (
        <StyledBadge
          data-role="badge"
          data-component="badge"
          color={color}
          {...props}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          isFocused={isFocused}
          isHovered={isHovered}
        >
          {onClick && (
            <StyledCrossIcon data-element="badge-cross-icon" type="cross" />
          )}
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

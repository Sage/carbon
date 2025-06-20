import React, { useState, useRef } from "react";
import {
  StyledBadgeWrapper,
  StyledCrossIcon,
  StyledCounter,
  StyledBadge,
} from "./badge.style";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import guid from "../../__internal__/utils/helpers/guid";

export interface BadgeProps extends TagProps {
  /** Prop to specify an aria-label for the component */
  "aria-label"?: string;
  /** The badge will be added to this element */
  children: React.ReactNode;
  /** The number rendered in the badge component */
  counter?: string | number;
  /** Prop to specify the color of the component */
  color?: string;
  /** Callback fired when badge is clicked */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Unique identifier for the component. */
  id?: string;
}

export const Badge = ({
  "aria-label": ariaLabel,
  children,
  counter = 0,
  color = "--colorsActionMajor500",
  onClick,
  id,
  "data-element": dataElement,
  "data-role": dataRole,
}: BadgeProps) => {
  const shouldDisplayCounter = +counter > 0;
  const counterToDisplay = +counter > 99 ? 99 : counter;
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { current: uniqueId } = useRef(id || guid());

  const renderCorrectBadge = () => {
    const buttonProps = { buttonType: "secondary", onClick };

    if (shouldDisplayCounter) {
      return (
        <StyledBadge
          data-component="badge"
          data-element={dataElement}
          data-role={dataRole}
          color={color}
          id={uniqueId}
          aria-label={ariaLabel}
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
          {...(onClick && buttonProps)}
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
      {children}
      {renderCorrectBadge()}
    </StyledBadgeWrapper>
  );
};

export default Badge;

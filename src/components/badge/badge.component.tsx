import React, { useState, useRef } from "react";
import { MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { StyledBadgeWrapper, StyledCounter, StyledBadge } from "./badge.style";
import Icon from "../icon";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import guid from "../../__internal__/utils/helpers/guid";
import Logger from "../../__internal__/utils/logger";

let deprecateOnClickTriggered = false;
let deprecateAriaLabelTriggered = false;
let deprecateColorTriggered = false;

export interface BadgeProps extends TagProps, MarginProps {
  /** @deprecated Prop to specify an aria-label for the component */
  "aria-label"?: string;
  /** The badge will be positioned relative to this element */
  children?: React.ReactNode;
  /** The number rendered in the badge component */
  counter?: string | number;
  /** @deprecated Prop to specify the color of the component */
  color?: string;
  /** @deprecated Callback fired when badge is clicked */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Unique identifier for the component. */
  id?: string;
  /** Size of the badge */
  size?: "small" | "medium" | "large";
  /** Badge variant */
  variant?: "typical" | "subtle";
  /** Set the style of the Badge to inverse */
  inverse?: boolean;
}

export const Badge = ({
  "aria-label": ariaLabel,
  children,
  counter = 0,
  color,
  onClick,
  id,
  size = "medium",
  variant = "typical",
  inverse = false,
  ...rest
}: BadgeProps) => {
  if (onClick && !deprecateOnClickTriggered) {
    Logger.deprecate(
      "The `onClick` prop in `Badge` is deprecated and will soon be removed.",
    );
    deprecateOnClickTriggered = true;
  }

  if (ariaLabel && !deprecateAriaLabelTriggered) {
    Logger.deprecate(
      "The `aria-label` prop in `Badge` is deprecated and will soon be removed.",
    );
    deprecateAriaLabelTriggered = true;
  }

  if (color && !deprecateColorTriggered) {
    Logger.deprecate(
      "The `color` prop in `Badge` is deprecated and will soon be removed.",
    );
    deprecateColorTriggered = true;
  }

  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { current: uniqueId } = useRef(id || guid());

  let shouldDisplayBadge = true;
  const isButton = onClick && size !== "small";
  const isButtonInteraction = isButton && (isFocused || isHovered);

  let counterToDisplay = counter;

  /* istanbul ignore else */
  if (typeof counter === "string") {
    if (counter.length > 4) {
      counterToDisplay = counter.substring(0, 4);
    }
    if (counter === "") {
      shouldDisplayBadge = false;
    }
  } else if (typeof counter === "number") {
    if (counter > 999) {
      counterToDisplay = "999+";
    }
    if (counter <= 0 || counter % 1 !== 0) {
      shouldDisplayBadge = false;
    }
  }

  const renderContent = () => {
    if (isButtonInteraction) {
      return (
        <Icon
          data-role="badge-cross-icon"
          data-element="badge-cross-icon"
          type="cross"
          color="white"
        />
      );
    }

    if (size !== "small") {
      return (
        <StyledCounter data-element="badge-counter">
          {counterToDisplay}
        </StyledCounter>
      );
    }

    return null;
  };

  const renderBadge = () => {
    const buttonProps = { buttonType: "secondary", onClick };

    if (shouldDisplayBadge) {
      return (
        <StyledBadge
          customColor={color}
          id={uniqueId}
          aria-label={ariaLabel}
          size={size}
          variant={variant}
          inverse={inverse}
          hasChildren={!!children}
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
          {...(isButton && buttonProps)}
          {...tagComponent("badge", rest)}
          {...filterStyledSystemMarginProps(rest)}
        >
          {renderContent()}
        </StyledBadge>
      );
    }

    return null;
  };

  if (children) {
    return (
      <StyledBadgeWrapper data-role="badge-wrapper">
        {children}
        {renderBadge()}
      </StyledBadgeWrapper>
    );
  }

  return renderBadge();
};

export default Badge;

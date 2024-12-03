import React, { useEffect, useState } from "react";
import { MarginProps } from "styled-system";

import { IconType } from "../icon";
import Tooltip from "../tooltip";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";

import {
  StyledCustomImg,
  StyledIcon,
  StyledPortraitContainer,
  StyledPortraitInitials,
} from "./portrait.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

export type PortraitShapes = "circle" | "square";

export type PortraitSizes = "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";

export interface PortraitProps extends MarginProps {
  /** A custom image URL. */
  src?: string;
  /** The size of the Portrait. */
  size?: PortraitSizes;
  /** @private @ignore */
  name?: string;
  /** The `alt` HTML string. */
  alt?: string;
  /** The shape of the Portrait. */
  shape?: PortraitShapes;
  /** Icon to be rendered as a fallback. */
  iconType?: IconType;
  /** The initials to render in the Portrait. */
  initials?: string;
  /** Use a dark background. */
  darkBackground?: boolean;
  /** Prop for `onClick` events. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** [Legacy] The message to be displayed within the tooltip */
  tooltipMessage?: React.ReactNode;
  /** [Legacy] The id attribute to use for the tooltip */
  tooltipId?: string;
  /** [Legacy] Whether to to show the Tooltip */
  tooltipIsVisible?: boolean;
  /** [Legacy] Sets position of the tooltip */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** [Legacy] Defines the message type */
  tooltipType?: string;
  /** [Legacy] Defines the size of the tooltip content */
  tooltipSize?: "medium" | "large";
  /** [Legacy] Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** [Legacy] Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
}

const Portrait = ({
  alt,
  name,
  darkBackground = false,
  iconType = "individual",
  initials,
  shape = "circle",
  size = "M",
  src,
  onClick,
  tooltipMessage,
  tooltipId,
  tooltipIsVisible,
  tooltipPosition,
  tooltipType,
  tooltipSize,
  tooltipBgColor,
  tooltipFontColor,
  ...rest
}: PortraitProps) => {
  const [externalError, setExternalError] = useState(false);
  const hasValidImg = Boolean(src) && !externalError;

  useEffect(() => {
    setExternalError(false);
  }, [src]);

  const tagProps = tagComponent("portrait", rest);

  const renderComponent = () => {
    let portrait = <StyledIcon type={iconType} size={size} />;

    if (initials) {
      portrait = (
        <StyledPortraitInitials size={size} data-element="initials">
          {initials.slice(0, 3).toUpperCase()}
        </StyledPortraitInitials>
      );
    }

    if (src && !externalError) {
      portrait = (
        <StyledCustomImg
          src={src}
          alt={alt || name || ""}
          data-element="user-image"
          onError={() => setExternalError(true)}
        />
      );
    }

    if (tooltipMessage) {
      return (
        <Tooltip
          message={tooltipMessage}
          id={tooltipId}
          position={tooltipPosition}
          type={tooltipType}
          size={tooltipSize}
          isVisible={tooltipIsVisible}
          bgColor={tooltipBgColor}
          fontColor={tooltipFontColor}
        >
          <StyledPortraitContainer
            {...filterStyledSystemMarginProps(rest)}
            onClick={onClick}
            {...tagProps}
            hasValidImg={hasValidImg}
            darkBackground={darkBackground}
            size={size}
            shape={shape}
          >
            {portrait}
          </StyledPortraitContainer>
        </Tooltip>
      );
    }

    return (
      <StyledPortraitContainer
        {...filterStyledSystemMarginProps(rest)}
        onClick={onClick}
        {...tagProps}
        hasValidImg={hasValidImg}
        darkBackground={darkBackground}
        size={size}
        shape={shape}
      >
        {portrait}
      </StyledPortraitContainer>
    );
  };

  return renderComponent();
};

export default Portrait;

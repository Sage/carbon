import React, { useEffect, useState } from "react";
import { MarginProps } from "styled-system";

import { IconType } from "../icon";
import Tooltip from "../tooltip";
import { Expand, ExplicitUnion } from "../../__internal__/utils/helpers/types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import PortraitGravatar from "./portrait-gravatar.component";
import PortraitInitials from "./portrait-initials.component";
import {
  StyledCustomImg,
  StyledIcon,
  StyledPortraitContainer,
} from "./portrait.style";

import { filterStyledSystemMarginProps } from "../../style/utils";

export type PortraitShapes = "circle" | "square";

export type PortraitSizes = "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";

export interface PortraitBaseProps extends Expand<MarginProps> {
  /** The size of the Portrait. */
  size?: ExplicitUnion<PortraitSizes>;
  /** The `alt` HTML string. */
  alt?: string;
  /** The shape of the Portrait. */
  shape?: ExplicitUnion<PortraitShapes>;
  /** Icon to be rendered as a fallback. */
  iconType?: ExplicitUnion<IconType>;
  /** The initials to render in the Portrait. */
  initials?: string;
  /** Use a dark background. */
  darkBackground?: boolean;
  /** Prop for `onClick` events. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** The message to be displayed within the tooltip */
  tooltipMessage?: React.ReactNode;
  /** The id attribute to use for the tooltip */
  tooltipId?: string;
  /** Whether to to show the Tooltip */
  tooltipIsVisible?: boolean;
  /** Sets position of the tooltip */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Defines the message type */
  tooltipType?: string;
  /** Defines the size of the tooltip content */
  tooltipSize?: "medium" | "large";
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
}

export interface PortraitWithGravatar extends PortraitBaseProps {
  /** An email address registered with Gravatar. */
  gravatar?: string;
  src?: never;
}

export interface PortraitWithSrc extends PortraitBaseProps {
  /** A custom image URL. */
  src?: string;
  gravatar?: never;
}

export type RawPortraitProps = PortraitWithGravatar | PortraitWithSrc;

// need the below "trick" to get intellisense to work correctly with the individual props when hovering
export type PortraitProps = {
  [K in keyof RawPortraitProps]: RawPortraitProps[K];
};

export const Portrait = ({
  alt = "",
  darkBackground = false,
  gravatar,
  iconType = "individual",
  initials,
  shape = "square",
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

  useEffect(() => {
    setExternalError(false);
  }, [gravatar, src]);

  const tagProps = tagComponent("portrait", rest);

  const renderComponent = () => {
    let portrait = (
      <StyledIcon
        type={iconType}
        size={size}
        shape={shape}
        darkBackground={darkBackground}
      />
    );

    if (initials) {
      portrait = (
        <PortraitInitials
          size={size}
          shape={shape}
          initials={initials}
          darkBackground={darkBackground}
          alt={alt}
        />
      );
    }

    if (src && !externalError) {
      portrait = (
        <StyledCustomImg
          src={src}
          alt={alt}
          size={size}
          shape={shape}
          data-element="user-image"
          onError={() => setExternalError(true)}
        />
      );
    }

    if (gravatar && !externalError) {
      portrait = (
        <PortraitGravatar
          gravatarEmail={gravatar}
          shape={shape}
          size={size}
          alt={alt}
          errorCallback={() => setExternalError(true)}
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
      >
        {portrait}
      </StyledPortraitContainer>
    );
  };

  return renderComponent();
};

export default Portrait;

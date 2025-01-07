import React, { useEffect, useState } from "react";
import { MarginProps } from "styled-system";
import MD5 from "crypto-js/md5";
import invariant from "invariant";
import Logger from "../../__internal__/utils/logger";

import { IconType } from "../icon";
import Tooltip from "../tooltip";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { PORTRAIT_SIZE_PARAMS } from "./portrait.config";
import {
  StyledCustomImg,
  StyledIcon,
  StyledPortraitContainer,
  StyledPortraitInitials,
  StyledPortraitGravatar,
} from "./portrait.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

export type PortraitShapes = "circle" | "square";

export type PortraitSizes = "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";

let deprecatedGravatarWarnTriggered = false;

export interface PortraitProps extends MarginProps {
  /** (Deprecated) An email address registered with Gravatar. */
  gravatar?: string;
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
  gravatar = "",
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

  invariant(
    !(src && gravatar),
    "The `src` prop cannot be used in conjunction with the `gravatar` prop." +
      " Please use one or the other.",
  );

  const logGravatarDeprecationWarning = () => {
    deprecatedGravatarWarnTriggered = true;
    Logger.deprecate(
      "The `gravatar` prop has been deprecated and will soon be removed.",
    );
  };

  useEffect(() => {
    setExternalError(false);
  }, [gravatar, src]);

  const tagProps = tagComponent("portrait", rest);

  const gravatarSrc = () => {
    const { dimensions } = PORTRAIT_SIZE_PARAMS[size];
    const base = "https://www.gravatar.com/avatar/";
    const hash = MD5(gravatar.toLowerCase());
    const fallbackOption = "404"; // "Return an HTTP 404 File Not Found response"

    /** @see https://en.gravatar.com/site/implement/images/#default-image */
    return `${base}${hash}?s=${dimensions}&d=${fallbackOption}`;
  };

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

    if (gravatar && !externalError) {
      portrait = (
        <StyledPortraitGravatar
          src={gravatarSrc()}
          alt={alt || name || ""}
          onLoad={() =>
            !deprecatedGravatarWarnTriggered && logGravatarDeprecationWarning()
          }
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

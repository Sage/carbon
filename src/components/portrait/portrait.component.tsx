import React, { useEffect, useState } from "react";
import { MarginProps } from "styled-system";

import { IconType } from "../icon";
import Tooltip from "../tooltip";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

import {
  StyledCustomImg,
  StyledIcon,
  StyledPortraitContainer,
  StyledPortraitInitials,
} from "./portrait.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Logger from "../../__internal__/utils/logger";

export type PortraitShapes = "circle" | "square";

export type PortraitSizes = "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";

export interface PortraitProps extends MarginProps, TagProps {
  /** @private @ignore */
  className?: string;
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
  /** Use a dark background.
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  darkBackground?: boolean;
  /** Prop for `onClick` events. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** [Legacy] The message to be displayed within the tooltip
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  tooltipMessage?: React.ReactNode;
  /** [Legacy] The id attribute to use for the tooltip
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  tooltipId?: string;
  /** [Legacy] Whether to to show the Tooltip
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  tooltipIsVisible?: boolean;
  /** [Legacy] Sets position of the tooltip
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** [Legacy] Defines the message type
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  tooltipType?: string;
  /** [Legacy] Defines the size of the tooltip content
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  tooltipSize?: "medium" | "large";
  /** [Legacy] Override background color of the Tooltip, provide any color from palette or any valid css color value.
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  tooltipBgColor?: string;
  /** [Legacy] Override font color of the Tooltip, provide any color from palette or any valid css color value.
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  tooltipFontColor?: string;
  /** The hex code of the background colour
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  backgroundColor?: string;
  /** The hex code of the foreground colour. This will only take effect if use in conjunction with `backgroundColor`
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  foregroundColor?: string;
}

let deprecatedDarkBackgroundTriggered = false;
let deprecatedTooltipMessage = false;
let deprecatedTooltipId = false;
let deprecatedTooltipIsVisible = false;
let deprecatedTooltipPosition = false;
let deprecatedTooltipType = false;
let deprecatedTooltipSize = false;
let deprecatedTooltipBgColor = false;
let deprecatedTooltipFontColor = false;
let deprecatedBackgroundColor = false;
let deprecatedForegroundColor = false;

/**
 * @deprecated This version of Portrait has been deprecated. See the Carbon documentation for migration details.
 */
export const Portrait = ({
  alt,
  backgroundColor,
  foregroundColor = undefined,
  className,
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
  if (darkBackground && !deprecatedDarkBackgroundTriggered) {
    deprecatedDarkBackgroundTriggered = true;
    Logger.deprecate(
      "`darkBackground` prop is deprecated and will be removed in a future release.",
    );
  }

  if (tooltipMessage && !deprecatedTooltipMessage) {
    deprecatedTooltipMessage = true;
    Logger.deprecate(
      "`tooltipMessage` prop is deprecated and will be removed in a future release.",
    );
  }

  if (tooltipId && !deprecatedTooltipId) {
    deprecatedTooltipId = true;
    Logger.deprecate(
      "`tooltipId` prop is deprecated and will be removed in a future release.",
    );
  }

  if (tooltipIsVisible && !deprecatedTooltipIsVisible) {
    deprecatedTooltipIsVisible = true;
    Logger.deprecate(
      "`tooltipIsVisible` prop is deprecated and will be removed in a future release.",
    );
  }

  if (tooltipPosition && !deprecatedTooltipPosition) {
    deprecatedTooltipPosition = true;
    Logger.deprecate(
      "`tooltipPosition` prop is deprecated and will be removed in a future release.",
    );
  }

  if (tooltipType && !deprecatedTooltipType) {
    deprecatedTooltipType = true;
    Logger.deprecate(
      "`tooltipType` prop is deprecated and will be removed in a future release.",
    );
  }

  if (tooltipSize && !deprecatedTooltipSize) {
    deprecatedTooltipSize = true;
    Logger.deprecate(
      "`tooltipSize` prop is deprecated and will be removed in a future release.",
    );
  }

  if (tooltipBgColor && !deprecatedTooltipBgColor) {
    deprecatedTooltipBgColor = true;
    Logger.deprecate(
      "`tooltipBgColor` prop is deprecated and will be removed in a future release.",
    );
  }

  if (tooltipFontColor && !deprecatedTooltipFontColor) {
    deprecatedTooltipFontColor = true;
    Logger.deprecate(
      "`tooltipFontColor` prop is deprecated and will be removed in a future release.",
    );
  }

  if (backgroundColor && !deprecatedBackgroundColor) {
    deprecatedBackgroundColor = true;
    Logger.deprecate(
      "`backgroundColor` prop is deprecated and will be removed in a future release.",
    );
  }

  if (foregroundColor && !deprecatedForegroundColor) {
    deprecatedForegroundColor = true;
    Logger.deprecate(
      "`foregroundColor` prop is deprecated and will be removed in a future release.",
    );
  }

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
            className={className}
            {...tagProps}
            hasValidImg={hasValidImg}
            darkBackground={darkBackground}
            size={size}
            shape={shape}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
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
        className={className}
        {...tagProps}
        hasValidImg={hasValidImg}
        darkBackground={darkBackground}
        size={size}
        shape={shape}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
      >
        {portrait}
      </StyledPortraitContainer>
    );
  };

  return renderComponent();
};

export default Portrait;

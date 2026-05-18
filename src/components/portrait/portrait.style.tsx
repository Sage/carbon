import React from "react";

import styled from "styled-components";

import { margin, MarginProps } from "styled-system";

import Icon from "../icon";

import applyBaseTheme from "../../style/themes/apply-base-theme";

import {
  PortraitSizes,
  PortraitShapes,
  PortraitVariant,
} from "./portrait.component";

import getColoursForPortrait, {
  getPortraitColors,
  getPortraitFontSize,
  getPortraitDimensions,
  getPortraitBorderRadius,
  getPortraitIconFontSize,
} from "./__internal__/get-properties";

type StyledPortraitProps = {
  backgroundColor?: string;
  foregroundColor?: string;
  darkBackground?: boolean;
  size: PortraitSizes;
  shape?: PortraitShapes;
  hasValidImg?: boolean;
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  variant?: PortraitVariant;
};

export const StyledPortraitInitials = styled.div<
  Pick<StyledPortraitProps, "size" | "variant">
>`
  font: ${({ size }) => getPortraitFontSize(size)};
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: inherit;

  .mentions-list-item && {
    color: var(--input-dropdown-label-default);
  }

  .mentions-list-item:hover &&,
  .mentions-list-item.selected && {
    color: var(--popover-label-hover);
  }
`;

export const StyledCustomImg = styled.img`
  height: inherit;
  min-width: inherit;
`;

// && is used here to increase the specificity
export const StyledIcon = styled(Icon)<
  Pick<StyledPortraitProps, "size" | "variant">
>`
  && {
    color: ${({ variant }) => getPortraitColors(variant).color};
    height: ${({ size }) => getPortraitDimensions(size).height};
    min-width: ${({ size }) => getPortraitDimensions(size).width};

    ::before {
      font-size: ${({ size }) => getPortraitIconFontSize(size)};
    }
  }
`;

export const StyledPortraitContainer = styled.div.attrs(applyBaseTheme)<
  StyledPortraitProps & MarginProps
>`
  ${({ variant }) => `
    background-color: ${getPortraitColors(variant).backgroundColor};
    color: ${getPortraitColors(variant).color};
  `}

  ${({ darkBackground, backgroundColor, size, foregroundColor, variant }) =>
    !variant &&
    getColoursForPortrait(
      backgroundColor,
      darkBackground,
      !["XS", "S"].includes(size),
      true,
      foregroundColor,
    )};
  ${({ hasValidImg, size }) =>
    hasValidImg && `max-width: ${getPortraitDimensions(size).width};`}
  min-width: ${({ size }) => getPortraitDimensions(size).width};
  height: ${({ size }) => getPortraitDimensions(size).height};
  overflow: hidden;
  border-radius: ${({ shape }) => getPortraitBorderRadius(shape)};
  border: var(--global-borderwidth-xs) solid var(--profile-border-default);
  display: inline-block;

  ${({ onClick }) => onClick && "cursor: pointer"}
  ${margin}

  .mentions-list-item && {
    color: currentColor;
  }

  .mentions-list-item:hover &&,
  .mentions-list-item.selected && {
    color: currentColor;
  }
`;

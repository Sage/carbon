import React from "react";

import styled from "styled-components";

import { margin, MarginProps } from "styled-system";

import Icon from "../icon";
import profileConfigSizes from "../profile/profile.config";
import applyBaseTheme from "../../style/themes/apply-base-theme";

import { PortraitSizes, PortraitShapes } from "./portrait.component";
import { PORTRAIT_SIZE_PARAMS } from "./portrait.config";

import getColoursForPortrait from "./__internal__/get-colors";

type StyledPortraitProps = {
  backgroundColor?: string;
  foregroundColor?: string;
  darkBackground?: boolean;
  size: PortraitSizes;
  shape?: PortraitShapes;
  hasValidImg?: boolean;
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
};

export const StyledPortraitInitials = styled.div<
  Pick<StyledPortraitProps, "size">
>`
  font-weight: 500;
  font-size: ${({ size }) => profileConfigSizes[size].initialSize};
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: inherit;
`;

export const StyledCustomImg = styled.img`
  height: inherit;
  min-width: inherit;
`;

// && is used here to increase the specificity
export const StyledIcon = styled(Icon)<Pick<StyledPortraitProps, "size">>`
  && {
    color: inherit;
    height: inherit;
    min-width: inherit;

    ::before {
      font-size: ${({ size }) => PORTRAIT_SIZE_PARAMS[size].iconDimensions}px;
    }
  }
`;

export const StyledPortraitContainer = styled.div.attrs(applyBaseTheme)<
  StyledPortraitProps & MarginProps
>`
  ${({ darkBackground, backgroundColor, size, foregroundColor }) =>
    getColoursForPortrait(
      backgroundColor,
      darkBackground,
      !["XS", "S"].includes(size),
      true,
      foregroundColor,
    )};
  ${({ hasValidImg, size }) =>
    hasValidImg && `max-width: ${PORTRAIT_SIZE_PARAMS[size].dimensions}px;`}
  min-width: ${({ size }) => PORTRAIT_SIZE_PARAMS[size].dimensions}px;
  height: ${({ size }) => PORTRAIT_SIZE_PARAMS[size].dimensions}px;
  overflow: hidden;
  border-radius: ${({ shape }) =>
    shape === "square" ? "0px" : "var(--borderRadiusCircle)"};
  border: 1px solid var(--colorsUtilityReadOnly600);
  display: inline-block;

  ${({ onClick }) => onClick && "cursor: pointer"}
  ${margin}
`;

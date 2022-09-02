import React from "react";
import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";

import BaseTheme from "../../style/themes/base";
import Icon, { IconType } from "../icon";
import { PortraitSizes, PortraitShapes } from "./portrait.component";
import { PORTRAIT_SIZE_PARAMS } from "./portrait.config";

type StylingForSize = {
  size: PortraitSizes;
  initials?: string;
};

function stylingForSize({ size, initials }: StylingForSize) {
  const params = PORTRAIT_SIZE_PARAMS[size];

  if (initials) {
    return css`
      width: inherit;
      height: inherit;
      margin: 1px;
    `;
  }

  return css`
    width: ${params?.dimensions}px;
    height: ${params?.dimensions}px;
  `;
}

type StylingForShape = { shape?: PortraitShapes };

function stylingForShape({ shape }: StylingForShape) {
  let cssString = "overflow: hidden;";

  if (shape === "square") cssString += "border-radius: 0px;";
  if (shape === "circle") cssString += "border-radius: 50%;";

  return css`
    ${cssString}
  `;
}

type StylingForIcon = {
  size: PortraitSizes;
  darkBackground: boolean;
};

function stylingForIcon({ size, darkBackground }: StylingForIcon) {
  const params = PORTRAIT_SIZE_PARAMS[size];

  let color = "var(--colorsUtilityMajor200)";
  let backgroundColor = "var(--colorsUtilityMajor025)";

  if (darkBackground) {
    color = "var(--colorsUtilityMajor025)";
    backgroundColor = "var(--colorsUtilityMajor200)";
  }

  return css`
    background-color: ${backgroundColor};
    color: ${color};

    ::before {
      font-size: ${params?.iconDimensions}px;
    }
  `;
}

export function getColorsForInitials(
  darkBackground?: boolean
): {
  textColor: "colorsUtilityYang100" | "colorsUtilityYin055";
  bgColor: "colorsUtilityMajor400" | "colorsUtilityMajor025";
} {
  return {
    textColor: darkBackground ? "colorsUtilityYang100" : "colorsUtilityYin055",
    bgColor: darkBackground ? "colorsUtilityMajor400" : "colorsUtilityMajor025",
  };
}

type PortraitSizeAndShape = {
  size: PortraitSizes;
  shape?: PortraitShapes;
};

type StyledPortraitInitialsProps = PortraitSizeAndShape & {
  initials?: string;
};

export const StyledPortraitInitials = styled.div<StyledPortraitInitialsProps>`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  ${stylingForSize}
  ${stylingForShape}
  outline: 1px solid var(--colorsUtilityMajor200);

  /* Styling for safari. This ensures that there is no outline on the component but that a border is still present 
     to achieve the same styling as Chrome and Firefox */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      border: 1px solid var(--colorsUtilityMajor200);
      outline: none;
    }
  }
`;

export const StyledPortraitInitialsImg = styled.img`
  display: block;
`;

export const StyledPortraitGravatar = styled.img<PortraitSizeAndShape>`
  display: inline-block;
  vertical-align: middle;
  ${stylingForSize}
  ${stylingForShape}
`;

export const StyledCustomImg = styled.img<PortraitSizeAndShape>`
  display: block;
  ${stylingForSize}
  ${stylingForShape}
`;

// && is used here to increase the specificity
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledIcon = styled(Icon)<{
  size: PortraitSizes;
  shape?: PortraitShapes;
  darkBackground: boolean;
  type: IconType;
}>`
  && {
    box-sizing: border-box;
    line-height: 14px;
    ${stylingForSize}
    ${stylingForIcon}
    ${stylingForShape}
    border: 1px dashed ${({ darkBackground }) =>
      darkBackground
        ? "var(--colorsUtilityMajorTransparent)"
        : "var(--colorsUtilityMajor200)"};
  }
`;

type StyledPortraitContainerProps = MarginProps & {
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
};

export const StyledPortraitContainer = styled.div<StyledPortraitContainerProps>`
  display: inline-block;
  ${({ onClick }) => onClick && "cursor: pointer"}
  ${margin}
`;

StyledPortraitContainer.defaultProps = {
  theme: BaseTheme,
};

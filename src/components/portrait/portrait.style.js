import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";

import BaseTheme from "../../style/themes/base";
import Icon from "../icon";
import {
  PORTRAIT_SHAPES,
  PORTRAIT_SIZES,
  PORTRAIT_SIZE_PARAMS,
} from "./portrait.config";

function stylingForSize({ size, initials }) {
  const params = PORTRAIT_SIZE_PARAMS[size];
  if (!params) {
    return css``;
  }

  if (initials) {
    return css`
      width: inherit;
      height: inherit;
      margin: 1px;
    `;
  }

  return css`
    width: ${params.dimensions}px;
    height: ${params.dimensions}px;
  `;
}

function stylingForShape({ shape }) {
  let cssString = "overflow: hidden;";

  if (shape === "square") cssString += "border-radius: 0px;";
  if (shape === "circle") cssString += "border-radius: 50%;";

  return css`
    ${cssString}
  `;
}

function stylingForIcon({ size, darkBackground }) {
  const params = PORTRAIT_SIZE_PARAMS[size];

  if (!params) {
    return css``;
  }

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
      font-size: ${params.iconDimensions}px;
    }
  `;
}

export function getColorsForInitials(darkBackground) {
  return {
    textColor: darkBackground ? "colorsUtilityYang100" : "colorsUtilityYin055",
    bgColor: darkBackground ? "colorsUtilityMajor400" : "colorsUtilityMajor025",
  };
}

export const StyledPortraitInitials = styled.div`
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

StyledPortraitInitials.propTypes = {
  size: PropTypes.oneOf(PORTRAIT_SIZES).isRequired,
  shape: PropTypes.oneOf(PORTRAIT_SHAPES),
};

StyledPortraitInitials.defaultProps = {
  shape: "square",
};

export const StyledPortraitInitialsImg = styled.img`
  display: block;
`;

StyledPortraitInitialsImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export const StyledPortraitGravatar = styled.img`
  display: inline-block;
  vertical-align: middle;
  ${stylingForSize}
  ${stylingForShape}
`;

StyledPortraitGravatar.propTypes = {
  shape: PropTypes.oneOf(PORTRAIT_SHAPES),
  size: PropTypes.oneOf(PORTRAIT_SIZES).isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export const StyledCustomImg = styled.img`
  display: block;
  ${stylingForSize}
  ${stylingForShape}
`;

StyledCustomImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  shape: PropTypes.oneOf(PORTRAIT_SHAPES),
  size: PropTypes.oneOf(PORTRAIT_SIZES).isRequired,
};

// && is used here to increase the specificity
export const StyledIcon = styled(({ size, darkBackground, ...rest }) => (
  <Icon {...rest} />
))`
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

StyledIcon.propTypes = {
  darkBackground: PropTypes.bool,
  size: PropTypes.oneOf(PORTRAIT_SIZES),
  shape: PropTypes.oneOf(PORTRAIT_SHAPES),
  type: PropTypes.string.isRequired,
};

StyledIcon.defaultProps = {
  darkBackground: false,
  size: "M",
  shape: "square",
};

export const StyledPortraitContainer = styled.div`
  display: inline-block;
  ${({ onClick }) => onClick && "cursor: pointer"}
  ${margin}
`;

StyledPortraitContainer.defaultProps = {
  theme: BaseTheme,
};

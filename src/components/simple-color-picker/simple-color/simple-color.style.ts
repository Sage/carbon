import styled, { css } from "styled-components";

import { Input } from "../../../__internal__/input";
import checkerBoardSvg from "./checker-board.svg";
import Icon from "../../icon";
import getRgbValues from "../../../style/utils/get-rgb-values";
import addFocusStyling from "../../../style/utils/add-focus-styling";

export const StyledSimpleColor = styled.div`
  width: var(--sizing700);
  height: var(--sizing700);
  margin-right: 2px;
  margin-bottom: 2px;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledColorSampleBox = styled.div<{ color: string }>`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ color }) =>
    color !== "transparent" &&
    css`
      background-color: ${color};
    `}

  ${({ color }) =>
    color === "transparent" &&
    css`
      background-color: #eeeeee;
      background-image: url("${checkerBoardSvg}");
      background-size: 14px 14px;
      background-position: -2px -2px;
    `}
`;

export const StyledSimpleColorInput = styled(Input)`
  position: absolute;
  opacity: 0;
  height: var(--sizing700);
  width: var(--sizing700);
  margin: 0;

  &:hover {
    cursor: pointer;
  }

  &:disabled:hover {
    cursor: not-allowed;
  }

  &:focus + ${StyledColorSampleBox} {
    ${addFocusStyling(true)}
  }
`;

const getIconColor = (color: string) => {
  const rgbValues = getRgbValues(color);
  const [r, g, b] = rgbValues;
  // color contrast calculating formula as per W3 suggestions
  const redMultiplier = 299,
    greenMultiplier = 587,
    blueMultiplier = 114;
  const contrast =
    (Math.round(r * redMultiplier) +
      Math.round(g * greenMultiplier) +
      Math.round(b * blueMultiplier)) /
    1000;
  if (contrast < 128) return "var(--colorsUtilityYang100)";
  return "var(--colorsUtilityYin090)";
};

export const StyledTickIcon = styled(Icon)<{ color: string }>`
  height: 20px;
  width: 20px;
  pointer-events: none;
  display: block;

  &::before {
    font-size: 20px;
    color: ${({ color }) => getIconColor(color)};
  }
`;

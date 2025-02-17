import styled, { css } from "styled-components";

import { HintTextProps } from "./hint-text.component";

const getColor = (isDarkBackground?: boolean, isDisabled?: boolean) => {
  if (isDarkBackground) {
    return "var(--colorsUtilityYang080)";
  }
  if (isDisabled) {
    return "var(--colorsUtilityYin030)";
  }
  return "var(--colorsUtilityYin055)";
};

const StyledHintText = styled.div<HintTextProps>`
  display: flex;
  align-items: center;
  font-size: 14px;

  ${({ align }) => css`
    justify-content: ${align !== "right" ? "flex-start" : "flex-end"};
  `}
  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-top: ${({ marginTop }) => marginTop};

  ${({ isDarkBackground, isDisabled }) => css`
    color: ${getColor(isDarkBackground, isDisabled)};
  `}

  ${({ fontWeight }) =>
    fontWeight &&
    css`
      font-weight: ${fontWeight};
    `}
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
    `}

  ::after {
    content: " ";
  }
`;

export default StyledHintText;

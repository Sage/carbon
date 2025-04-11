import styled, { css } from "styled-components";

import Button from "../../button";

interface StyledResponsiveMenuProps {
  height?: string;
  left?: string;
  reduceMotion?: boolean;
  responsive?: boolean;
  menu: "primary" | "secondary" | "tertiary";
  top?: string;
  width?: string;
}

interface StyledButtonProps {
  active?: boolean;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0;
  background-color: var(
    ${({ active }) =>
      active ? "--colorsActionMinorGray700" : "--colorsUtilityYin100"}
  );

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
  }
`;

export const StyledGlobalVerticalMenuWrapper = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  position: absolute;
  width: fit-content;
`;

export const StyledResponsiveMenu = styled.div<StyledResponsiveMenuProps>`
  align-items: center;
  background-color: var(--colorsUtilityYin100);
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || "100%"};
  justify-content: flex-start;
  padding-bottom: var(--spacing100);
  padding-left: var(--spacing200);
  padding-right: var(--spacing200);
  padding-top: var(--spacing100);
  position: fixed;
  top: ${({ top }) => top};
  width: ${({ width }) => width || "375px"};
  z-index: 1000;

  ${({ height, left, menu }) =>
    menu === "secondary" &&
    css`
      border-left: 2px solid var(--colorsActionMajorYang030);
      left: ${left};
      min-height: ${height};
    `}
`;

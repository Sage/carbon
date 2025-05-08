import styled, { css } from "styled-components";

import Button from "../../button";
import addFocusStyling from "../../../style/utils/add-focus-styling";

interface StyledResponsiveMenuProps {
  childOpen?: boolean;
  height?: string;
  iconsVisible?: boolean;
  left?: string;
  reduceMotion: boolean;
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

  &:focus {
    appearance: none;
    -webkit-appearance: none;
    -webkit-box-shadow: ${addFocusStyling(true)};
    box-shadow: ${addFocusStyling(true)};
    border: 1px solid black;
    outline: transparent 3px solid;
  }
`;

export const StyledCloseButton = styled(Button)`
  border-radius: 0;

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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || "100%"};
  justify-content: flex-start;
  overflow-y: auto;
  padding-bottom: var(--spacing100);
  ${({ responsive }) =>
    !responsive &&
    css`
      padding-left: var(--spacing200);
      padding-right: var(--spacing200);
    `};
  padding-top: var(--spacing100);
  position: fixed;
  top: ${({ top }) => top};
  width: ${({ width }) => width || "100%"};
  max-width: 375px;
  z-index: 1000;
  border-right: ${({ childOpen, menu }) =>
    menu === "secondary" || (!childOpen && menu === "primary")
      ? "2px solid var(--colorsGray850)"
      : "1px solid var(--colorsGray850)"};

  ${({ childOpen }) =>
    childOpen &&
    css`
      padding-right: calc(var(--spacing200) + 1px);
    `}

  ${({ height, left, menu }) =>
    menu === "secondary" &&
    css`
      left: ${left};
      min-height: ${height};
    `}

    ${({ responsive }) =>
    !responsive &&
    css`
      & > :last-child {
        margin-bottom: 40px;
      }
    `}
`;

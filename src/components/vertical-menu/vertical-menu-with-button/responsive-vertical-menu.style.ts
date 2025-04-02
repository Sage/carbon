import styled, { css } from "styled-components";

import Button from "../../button";
import addFocusStyling from "../../../style/utils/add-focus-styling";

interface StyledResponsiveMenuProps {
  height?: string;
  left?: string;
  reduceMotion?: boolean;
  responsive?: boolean;
  menu: "primary" | "secondary" | "tertiary";
  top?: string;
}

interface StyledResponsiveMenuItemProps {
  active?: boolean;
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
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 24px;
  background-color: black;
  color: white;
  width: fit-content;
`;

export const StyledResponsiveMenu = styled.div<StyledResponsiveMenuProps>`
  align-items: center;
  background-color: var(--colorsUtilityYin100);
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || "auto"};
  justify-content: flex-start;
  padding-left: var(--spacing200);
  padding-right: var(--spacing200);
  position: fixed;
  top: ${({ top }) => top};
  width: 320px;
  z-index: 1000;

  ${({ height, left, menu }) =>
    menu === "secondary" &&
    css`
      border-left: 2px solid var(--colorsActionMajorYang030);
      left: ${left};
      min-height: ${height || "auto"};
    `}
`;

export const StyledResponsiveMenuItem = styled.button<StyledResponsiveMenuItemProps>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 16px;
  width: 100%;

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  ${({ active }) => active && `background-color: var(--colorsGray850);`}

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: 8px;
  }

  &:focus {
    ${addFocusStyling()}
  }
`;

export const StyledResponsiveMenuAction = styled.a`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 16px;
  text-decoration: none;
  width: -moz-available;

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: 8px;
  }

  &:focus {
    ${addFocusStyling()}
  }
`;

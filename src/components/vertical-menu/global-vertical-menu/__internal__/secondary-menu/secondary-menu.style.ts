import styled from "styled-components";

import addFocusStyling from "../../../../../style/utils/add-focus-styling";

interface StyledSecondaryMenuProps {
  height?: string;
  left?: string;
  reduceMotion?: boolean;
  top?: string;
}

export const StyledSecondaryMenu = styled.div<StyledSecondaryMenuProps>`
  align-items: center;
  background-color: var(--colorsUtilityYin100);
  border-left: 2px solid var(--colorsActionMajorYang030);
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || "auto"};
  min-height: ${({ height }) => height || "auto"};
  justify-content: flex-start;
  padding-left: var(--spacing200);
  padding-right: var(--spacing200);
  position: fixed;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  z-index: 1000;
  width: 320px;
`;

export const StyledSecondaryMenuDropdown = styled.button`
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

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: 8px;
  }

  &:focus {
    ${addFocusStyling()}
  }
`;

export const StyledSecondaryMenuAction = styled.a`
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

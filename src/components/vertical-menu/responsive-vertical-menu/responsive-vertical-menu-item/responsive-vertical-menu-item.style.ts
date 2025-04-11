import styled, { css } from "styled-components";

import Icon from "../../../icon";
import addFocusStyling from "../../../../style/utils/add-focus-styling";

interface StyledResponsiveMenuItemProps {
  active?: boolean;
  depth: number;
  responsive?: boolean;
}

interface StyledMenuItemContentProps {
  depth: number;
  disableIconSpacing?: boolean;
  icon?: boolean;
  responsive?: boolean;
}

export const StyledMenuItemContent = styled.span<StyledMenuItemContentProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 8px;

  svg {
    margin-right: 8px;
    max-width: 24px;
    min-width: 24px;
  }

  ${({ depth, responsive }) =>
    depth > 0 &&
    responsive &&
    css`
      width: ${92 - 8 * depth}%;
    `}

  ${({ disableIconSpacing, icon }) =>
    !icon &&
    !disableIconSpacing &&
    // depth === 0 &&
    css`
      margin-left: 40px;
    `}
`;

const getRotationData = (
  depth: number,
  expanded: boolean,
  responsive: boolean,
) => {
  if (responsive) {
    if (depth === 0) {
      return expanded ? "90deg" : "-90deg";
    }
  }

  if (depth === 0) {
    return "0deg";
  }

  return expanded ? "180deg" : "0deg";
};

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
  min-height: 40px;
  padding: 0 16px;
  width: 100%;

  ${({ depth, responsive }) =>
    depth > 0 &&
    responsive &&
    css`
      width: 85%;
    `}

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  ${({ active, responsive }) =>
    active && !responsive && `background-color: var(--colorsGray850);`}

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: 8px;
  }

  &:focus {
    ${addFocusStyling()}
  }
`;

const getActionWidth = (depth: number, responsive: boolean) => {
  let width = 92;
  if (responsive) {
    if (depth === 1) {
      width = 78;
    } else if (depth === 2) {
      width = 72;
    }
  }
  return `${width}%`;
};

export const StyledResponsiveMenuAction = styled.a<{
  depth: number;
  responsive?: boolean;
}>`
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
  min-height: 40px;
  padding: 0 16px;
  text-decoration: none;
  width: ${({ depth, responsive }) =>
    getActionWidth(depth, responsive || false)};

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

export const StyledNestedMenu = styled.div<{
  depth: number;
  responsive?: boolean;
}>`
  width: 90%;

  ${({ responsive }) =>
    responsive &&
    css`
      align-items: flex-end;
      display: flex;
      flex-direction: column;
    `}

  a {
    font-weight: 400;

    ${({ depth, responsive }) =>
      responsive &&
      depth &&
      depth >= 1 &&
      css`
        margin-left: 16px;
        margin-right: 16px;
      `}
  }
`;

export const StyledIcon = styled(Icon)<{
  depth: number;
  expanded: boolean;
  reduceMotion: boolean;
  responsive: boolean;
}>`
  rotate: ${({ depth, expanded, responsive }) =>
    getRotationData(depth, expanded, responsive)};
  transition: rotate ${({ reduceMotion }) => (reduceMotion ? 0 : "0.2s")}
    ease-in;

  ${({ depth, expanded, reduceMotion, responsive }) =>
    expanded &&
    css`
      rotate: ${getRotationData(depth, expanded, responsive)};
      transition: rotate ${reduceMotion ? 0 : "0.2s"} ease-out;
    `};
`;

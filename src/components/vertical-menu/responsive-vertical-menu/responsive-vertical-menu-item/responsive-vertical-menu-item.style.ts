import styled, { css } from "styled-components";

import { margin, padding } from "styled-system";
import Icon from "../../../icon";
import addFocusStyling from "../../../../style/utils/add-focus-styling";

interface StyledResponsiveMenuItemProps {
  active?: boolean;
  depth: number;
  hasIcon?: boolean;
  responsive?: boolean;
}

interface StyledMenuItemContentProps {
  customIcon?: boolean;
  depth: number;
  hasChildren?: boolean;
  icon?: boolean;
  responsive?: boolean;
}

const BASE_ACTION_WIDTH = 92;
const RESPONSIVE_ACTION_WIDTH_NO_NESTED_MENU = BASE_ACTION_WIDTH - 14;
const RESPONSIVE_ACTION_WIDTH_NESTED_MENU = BASE_ACTION_WIDTH - 20;

const getRotationData = (depth: number, expanded: boolean) => {
  if (!depth || !expanded) {
    return "0deg";
  }

  return "180deg";
};

export const StyledMenuItemContent = styled.span<StyledMenuItemContentProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: var(--spacing100);

  svg {
    margin-right: var(--spacing100);
    max-width: var(--sizing300);
    min-width: var(--sizing300);
  }

  ${({ customIcon, depth, hasChildren, icon, responsive }) => {
    if (depth > 0) {
      if (responsive) {
        return css`
          width: 100%;
        `;
      }
    }

    if (depth === 0 && hasChildren && responsive) {
      return css`
        color: #ffffffcc;
        cursor: default;
      `;
    }

    if (customIcon || icon) {
      return css`
        width: 81%;
      `;
    }

    return css`
      width: 92%;
    `;
  }}
`;

export const StyledResponsiveMenuItem = styled.button<StyledResponsiveMenuItemProps>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: var(--borderRadius100);
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-between;
  min-height: var(--sizing500);
  padding: 0 15px;
  width: 100%;
  max-width: 340px;

  ${margin}
  ${padding}

${({ depth, responsive }) =>
    depth > 0 &&
    responsive &&
    css`
      cursor: default;
      justify-content: space-around;
      width: 80%;
    `}


  ${({ depth, responsive }) =>
    depth === 0 &&
    responsive &&
    css`
      padding: 0;
    `}

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  ${({ active, responsive }) =>
    active &&
    !responsive &&
    css`
      background-color: var(--colorsGray850);
    `}

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: var(--spacing100);
  }

  &:focus {
    ${addFocusStyling(true)}
  }
`;

export const StyledResponsiveMenuAction = styled.a<{
  depth: number;
  responsive?: boolean;
}>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: var(--borderRadius100);
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-between;
  min-height: var(--sizing500);
  padding: 0 var(--spacing200);
  text-decoration: none;
  width: 92%;
  max-width: 92%;

  ${({ depth, responsive }) =>
    depth > 0 &&
    responsive &&
    css`
      cursor: default;
      justify-content: space-around;
      width: ${depth === 1
        ? `${RESPONSIVE_ACTION_WIDTH_NO_NESTED_MENU}%`
        : `${RESPONSIVE_ACTION_WIDTH_NESTED_MENU}%`};
    `}

  ${margin}
  ${padding}

  &:hover {
    background-color: var(--colorsActionMajor500);
  }

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: var(--spacing100);
  }

  &:focus {
    ${addFocusStyling(true)}
  }
`;

export const StyledNestedMenu = styled.div<{
  depth: number;
  hasIcon?: boolean;
  responsive?: boolean;
}>`
  width: ${({ responsive }) => (responsive ? "72%" : "92%")};
  ${({ hasIcon }) =>
    hasIcon &&
    css`
      margin-left: 80px;
      width: 100%;
    `};

  ${({ responsive }) =>
    responsive &&
    css`
      align-items: center
      display: flex;
      flex-direction: column;
      width: 100%;

    `}

  a {
    font-weight: 400;
    ${({ hasIcon }) => hasIcon && `width: 81%;`};

    ${({ depth, responsive }) =>
      responsive &&
      css`
        font-weight: 500;
        width: 70%;

        ${depth &&
        depth >= 1 &&
        css`
          font-weight: 400;
          margin-left: var(--spacing200);
          margin-right: var(--spacing200);
          width: 63%;
        `}
      `}
  }
`;

export const StyledIcon = styled(Icon)<{
  depth: number;
  expanded: boolean;
  reduceMotion: boolean;
}>`
  rotate: ${({ depth, expanded }) => getRotationData(depth, expanded)};
  transition: rotate ${({ reduceMotion }) => (reduceMotion ? 0 : "0.2s")}
    ease-in;

  ${({ depth, expanded, reduceMotion }) =>
    expanded &&
    css`
      rotate: ${getRotationData(depth, expanded)};
      transition: rotate ${reduceMotion ? 0 : "0.2s"} ease-out;
    `};
`;

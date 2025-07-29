import styled, { css } from "styled-components";
import { margin, padding } from "styled-system";

import Icon from "../../../icon";

import addFocusStyling from "../../../../style/utils/add-focus-styling";

interface StyledMenuItemContentProps {
  customIcon?: boolean;
  depth: number;
  hasChildren?: boolean;
  icon?: boolean;
  responsive?: boolean;
}

interface StyledResponsiveMenuItemProps {
  active?: boolean;
  depth: number;
  hasIcon?: boolean;
  responsive?: boolean;
}

interface StyledIconProps {
  depth: number;
  expanded: boolean;
  reduceMotion: boolean;
}

const getRotationData = (depth: number, expanded: boolean) => {
  return !depth || !expanded ? "0deg" : "180deg";
};

const commonAttributes = css`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: var(--borderRadius100);
  box-sizing: border-box;
  color: var(--colorsUtilityYang100);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-between;
  min-height: var(--sizing500);
  padding: 0 var(--spacing200);
  width: 100%;

  ${margin}
  ${padding}

  &:hover {
    background-color: var(--colorsActionMajor500);
    color: var(--colorsUtilityYang100);
    text-decoration: none;
  }

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
    margin-right: var(--spacing100);
  }

  &:focus {
    ${addFocusStyling(true)}
  }
`;

export const StyledIcon = styled(Icon)<StyledIconProps>`
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
`;

export const StyledNestedMenuWrapper = styled.div<{
  depth: number;
  hasIcon?: boolean;
  responsive?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  justify-content: ${({ hasIcon, responsive }) =>
    hasIcon && responsive ? "flex-end" : "flex-start"};
  width: 100%;

  ${({ depth, responsive }) =>
    depth === 1 &&
    responsive &&
    css`
      padding: 0 0 0 16px;
    `}
`;

export const StyledNestedMenu = styled.ul<{
  depth: number;
  hasIcon?: boolean;
  responsive?: boolean;
}>`
  padding: 0;

  ${({ depth, hasIcon, responsive }) => css`
    width: ${depth < 2 && !hasIcon ? "100%" : "88%"};
    margin-left: var(--spacing400);

    ${responsive &&
    css`
      margin-left: ${hasIcon || depth === 1 ? "var(--spacing200)" : "0"};
    `}

    li > a {
      font-weight: ${depth === 1
        ? "var(--fontWeights400)"
        : "var(--fontWeights500)"};
    }
  `}
`;

export const StyledResponsiveMenuListItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 340px;
`;

export const StyledResponsiveMenuItem = styled.button<StyledResponsiveMenuItemProps>`
  ${commonAttributes}

  ${({ active, responsive }) =>
    active &&
    !responsive &&
    css`
      background-color: var(--colorsGray850);
    `}

  ${({ depth, responsive }) =>
    depth === 0 &&
    responsive &&
    css`
      color: var(--colorsUtilityYang080);
      cursor: default;
    `}


  ${({ depth }) =>
    depth >= 2 &&
    css`
      & {
        color: var(--colorsUtilityYang080);
        font-weight: var(--fontWeights400);

        [data-component="icon"] {
          color: var(--colorsUtilityYang080);
        }
      }
    `}
`;

export const StyledResponsiveMenuAction = styled.a<{
  depth: number;
  responsive?: boolean;
}>`
  ${commonAttributes}
  height: 40px;
  text-decoration: none;

  ${({ depth, responsive }) =>
    depth >= 2 &&
    css`
      && {
        color: var(--colorsUtilityYang080);
        font-weight: var(--fontWeights400);

        ${responsive &&
        depth >= 3 &&
        css`
          margin-left: var(--spacing300);
        `}
      }
    `}
`;

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
  hasChildren?: boolean;
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
  background-color: var(--nav-primary-bg-default);
  border: none;
  border-radius: var(--global-radius-action-m);
  box-sizing: border-box;
  color: var(--nav-primary-label-default);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font: var(--global-font-static-comp-medium-m);
  justify-content: space-between;
  min-height: var(--global-size-m);
  padding: 0 var(--global-space-comp-l);
  width: 100%;

  ${padding}

  &:hover {
    background-color: var(--nav-primary-bg-hover);
    color: var(--nav-primary-label-hover);
    text-decoration: none;
  }

  [data-component="icon"] {
    color: var(--nav-primary-label-hover);
  }

  [data-component="icon"]:not(
      [data-role="responsive-vertical-menu-expander-icon"]
    ) {
    margin-right: var(--global-space-comp-s);
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

  svg {
    margin-right: var(--global-space-comp-s);
    max-width: var(--global-size-xs);
    min-width: var(--global-size-xs);
  }
`;

export const StyledNestedMenuWrapper = styled.div<{
  depth: number;
  hasIcon?: boolean;
  responsive?: boolean;
}>`
  box-sizing: border-box;
  display: flex;

  width: 100%;

  ${({ depth, responsive }) =>
    responsive &&
    css`
      padding: 0 0 0 ${depth === 0 ? "var(--global-space-comp-l)" : "0px"};
    `}
`;

export const StyledNestedMenu = styled.ul<{
  depth: number;
  hasIcon?: boolean;
  responsive?: boolean;
}>`
  padding: 0;

  ${({ depth, hasIcon, responsive }) => css`
    width: 100%;
    margin-left: var(--global-space-comp-l);

    padding-right: ${responsive && depth >= 1
      ? "var(--global-space-comp-xl)"
      : "0"};

    ${responsive &&
    css`
      margin-left: ${hasIcon || depth === 1
        ? "var(--global-space-comp-l)"
        : "0"};
    `}
  `}
`;

export const StyledResponsiveMenuListItem = styled.li`
  list-style: none;
  ${margin}
  padding: 0;
`;

export const StyledResponsiveMenuItem = styled.button<StyledResponsiveMenuItemProps>`
  ${commonAttributes}

  ${({ active, responsive }) =>
    active &&
    !responsive &&
    css`
      background-color: var(--nav-primary-bg-child);
    `}

  ${({ depth, responsive, hasChildren }) =>
    depth === 0 &&
    responsive &&
    css`
      color: ${hasChildren
        ? "var(--nav-primary-label-default-alt)"
        : "var(--nav-primary-label-default)"};
      cursor: default;
    `}


  ${({ depth }) =>
    depth >= 2 &&
    css`
      & {
        color: var(--nav-primary-label-default);
        font: var(--global-font-static-comp-regular-m);

        [data-component="icon"] {
          color: var(--nav-primary-label-default);
        }
      }
    `}
`;

export const StyledResponsiveMenuActionLink = styled.a<{
  depth: number;
  responsive?: boolean;
}>`
  ${commonAttributes}
  min-height: var(--global-size-m);
  text-decoration: none;

  ${({ depth, responsive }) =>
    depth >= 2 &&
    css`
      && {
        color: var(--nav-primary-label-default);
        font: var(--global-font-static-comp-regular-m);

        ${responsive &&
        depth >= 3 &&
        css`
          margin-left: var(--global-space-comp-xl);
        `}
      }
    `}
`;

export const StyledResponsiveMenuActionButton = styled.button<{
  depth: number;
  responsive?: boolean;
}>`
  ${commonAttributes}
  min-height: var(--global-size-m);
  text-decoration: none;

  ${({ depth, responsive }) =>
    depth >= 2 &&
    css`
      && {
        color: var(--nav-primary-label-default);
        font: var(--global-font-static-comp-regular-m);

        ${responsive &&
        depth >= 3 &&
        css`
          margin-left: var(--global-space-comp-xl);
        `}
      }
    `}
`;

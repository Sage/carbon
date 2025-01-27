import styled, { css } from "styled-components";

import BaseTheme from "../../../../style/themes/base";

import { TabHeaderProps } from "./tabs-header.component";

const outlineWidth = "3px";

type StyledTabsHeaderWrapperProps = Pick<
  TabHeaderProps,
  "position" | "isInSidebar"
>;

const StyledTabsHeaderWrapper = styled.div<StyledTabsHeaderWrapperProps>`
  ${({ position, isInSidebar }) =>
    position === "left" &&
    css`
      box-sizing: border-box;
      padding: 3px;

      button[data-element="select-tab"] {
        border-top-left-radius: var(--borderRadius100);
        border-bottom-left-radius: var(--borderRadius100);
      }

      ${!isInSidebar &&
      css`
        min-width: 20%;
        overflow-y: auto;
      `}

      ${isInSidebar &&
      css`
        min-width: 100%;
        margin: auto;
        padding: 0px;
      `}
    `}
`;

export type StyledTabsHeaderListProps = Pick<
  TabHeaderProps,
  "align" | "extendedLine" | "noRightBorder" | "isInSidebar" | "position"
>;

const StyledTabsHeaderList = styled.div<StyledTabsHeaderListProps>`
  display: flex;
  ${({ extendedLine = true }) =>
    !extendedLine &&
    css`
      width: fit-content;
    `}
  cursor: default;
  list-style: none;
  padding: ${outlineWidth};
  overflow-x: hidden;
  position: relative;

  ${({ align }) =>
    align === "right" &&
    css`
      justify-content: flex-end;
      text-align: right;
    `}

  ${({ position, noRightBorder, align }) =>
    position === "left" &&
    css`
      flex-direction: column;
      box-shadow: none;

      ${noRightBorder &&
      css`
        box-shadow: none;
      `}

      ${align === "right" &&
      css`
        justify-content: flex-start;
      `}
    `}
`;

StyledTabsHeaderList.defaultProps = {
  theme: BaseTheme,
};

type StyledVerticalTabsWrapperProps = Pick<TabHeaderProps, "isInSidebar">;

const StyledVerticalTabsWrapper = styled.div<StyledVerticalTabsWrapperProps>`
  margin: 3px;
  ${({ isInSidebar }) =>
    isInSidebar &&
    css`
      margin-left: 6px;
      margin-top: 6px;
    `}
  display: flex;
  flex-direction: column;
`;

type StyledWrapperProps = {
  align: string;
  position: string;
  role?: string;
  extendedLine?: boolean;
  noRightBorder?: boolean;
  isInSidebar?: boolean;
};

type StyledNavigationButtonWrapperProps = {
  position: string;
  visible: boolean;
  size: string;
};

const StyledWrapper = styled.section<StyledWrapperProps>`
  overflow: hidden;
  position: relative;
  display: flex;
  ${({ extendedLine = true }) =>
    !extendedLine &&
    css`
      width: fit-content;
    `}

  ${({ position }) => position === "top" && "white-space: nowrap"};

  ${({ align }) =>
    align === "right" &&
    css`
      justify-content: flex-end;
      text-align: right;
    `}
`;

const StyledNavigationButtonWrapper = styled.div<StyledNavigationButtonWrapperProps>`
  width: 48px;

  ${({ position, visible, size }) => css`
    height: ${size === "default" ? "48px" : "56px"}
    z-index: 8;
    display: ${visible ? "block" : "none"};
    ${position === "right" && `right: 0; position: absolute;`}
  `}
`;

const StyledNavigationButton = styled.button`
  position: absolute;
  height: 100%;
  width: 48px;
  top: 0;
  align-items: center;
  border: none;
  border-radius: 0px;
  background-color: var(--colorsDisabled400);
  color: var(--colorsActionMinor500);
  z-index: 6;

  :hover {
    cursor: pointer;
    background-color: var(--colorsActionDisabled500);
    color: var(--colorsComponentsMenuYang100);
  }
`;

const StyledContainer = styled.div<{ size: string }>`
  display: flex;
  padding: 6px 4px 0px;
  margin: 0;
  overflow-x: hidden;
  ${({ size }) => css`
    height: ${size === "large" ? "50px" : "42px"};
  `}
  align-items: flex-start;
`;

const StyledBottomBorder = styled.div`
  height: auto;
  border-bottom: 2px solid var(--colorsActionMinor100);
  bottom: 0;
  left: 4px;
  right: 4px;
  position: absolute;
`;

export {
  StyledTabsHeaderWrapper,
  StyledTabsHeaderList,
  StyledVerticalTabsWrapper,
  StyledWrapper,
  StyledNavigationButtonWrapper,
  StyledNavigationButton,
  StyledContainer,
  StyledBottomBorder,
};

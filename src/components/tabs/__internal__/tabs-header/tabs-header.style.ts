import styled, { css } from "styled-components";
import { TabHeaderProps } from "./tabs-header.component";
import BaseTheme from "../../../../style/themes/base";

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

const commonShadowStyles = css`
  pointer-events: none;
  content: "";
  background-repeat: no-repeat;
  background-size: 16px 48px;
  background-attachment: scroll;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  position: sticky;
  min-width: 16px;
  transition: opacity 0.1s ease-in-out;
`;

export interface StyledTabsHeaderListProps
  extends Pick<
    TabHeaderProps,
    "align" | "extendedLine" | "noRightBorder" | "isInSidebar" | "position"
  > {
  leftScrollOpacity?: number;
  rightScrollOpacity?: number;
  isScrollable?: boolean;
}

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
  overflow-x: auto;
  position: relative;
  ${({ position }) => position === "top" && "white-space: nowrap"};

  ${({ isScrollable, leftScrollOpacity, rightScrollOpacity }) =>
    isScrollable &&
    css`
      &:before {
        ${commonShadowStyles}
        background: radial-gradient(
          farthest-side at 0 50%,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        );
        background-position: left calc(50% - 4px);
        left: -${outlineWidth};
        margin-right: -16px;
        opacity: ${leftScrollOpacity};
      }

      &:after {
        ${commonShadowStyles}
        background: radial-gradient(
          farthest-side at 100% 50%,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        );
        background-position: right calc(50% - 4px);
        right: -${outlineWidth};
        margin-left: -16px;
        opacity: ${rightScrollOpacity};
      }
    `}

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    background: var(--colorsUtilityMajor025);
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--colorsUtilityMajor300);
    cursor: pointer;
  }

  ${({ align = "left" }) =>
    align === "right" &&
    css`
      justify-content: flex-end;
      text-align: right;
    `}

  ${({ position = "top", noRightBorder, align = "left" }) =>
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

const StyledTabsWrapper = styled.div`
  margin: 3px;
  position: relative;
  min-width: max-content;
  width: 100%;
  height: 100%;
`;

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

const StyledTabsBottomBorderWrapper = styled.div<{
  validationRedesignOptIn?: boolean;
}>`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0px;
  ${({ validationRedesignOptIn }) => css`
    z-index: ${validationRedesignOptIn ? 2 : ""};
  `}
`;

const StyledTabsBottomBorder = styled.div`
  position: sticky;
  bottom: 2px;
  left: ${outlineWidth};
  right: ${outlineWidth};
  height: 2px;
  background-color: var(--colorsActionMinor100);
`;

export {
  StyledTabsHeaderWrapper,
  StyledTabsHeaderList,
  StyledTabsWrapper,
  StyledTabsBottomBorderWrapper,
  StyledTabsBottomBorder,
  StyledVerticalTabsWrapper,
};

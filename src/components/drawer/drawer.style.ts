import styled, { css, keyframes } from "styled-components";
import StyledTabs from "../tabs/tabs.style";
import Box from "../box";
import StyledStickyFooter from "../../__internal__/sticky-footer/sticky-footer.style";
import addFocusStyling from "../../style/utils/add-focus-styling";
import baseTheme from "../../style/themes/base";

const defaultExpandedWidth = "var(--sizing500)";

const StyledSidebarHeader = styled.div<{ isExpanded?: boolean }>`
  ${({ isExpanded }) => css`
    position: sticky;
    top: 0;

    ${isExpanded &&
    css`
      border-bottom: var(--sizing010) solid #ccd6db;
    `}
  `}
`;

const StyledSidebarTitle = styled.div`
  white-space: nowrap;
  padding: var(--spacing300) var(--spacing500);
`;

const StyledDrawerChildren = styled.div`
  flex: 1;
  margin-left: 1px;
  overflow: auto;
`;

interface StyledDrawerSidebarProps {
  isExpanded?: boolean;
  hasControls: boolean;
}

const StyledDrawerSidebar = styled(Box)<StyledDrawerSidebarProps>`
  ${({ hasControls, isExpanded }) => css`
    ${!isExpanded &&
    css`
      display: none;
      opacity: 0;
    `}

    ${isExpanded &&
    css`
      display: flex;
      flex-direction: column;
      flex: 1 1 0%;
    `}

      ${hasControls &&
    css`
      ${StyledTabs} {
        margin-top: 48px;
        ${!isExpanded &&
        css`
          display: none;
        `}
      }
    `}
  `}

  &::-webkit-scrollbar {
    width: 12px;
  }
`;

const sidebarVisible = () => keyframes`
  0% {opacity: 0;}
  50% {opacity: 0;}
  100% {opacity: 1;}
`;

const sidebarHidden = () => keyframes`
  0% {opacity: 1;}
  100% {opacity: 0; display: none;}
`;

const drawerOpen = (expandedWidth: string) => keyframes`
  0% {
    width: ${defaultExpandedWidth};
    overflow: hidden;
    min-width: ${defaultExpandedWidth};
  }
  100% {
    width: ${expandedWidth};
    min-width: 52px;
  }
`;

const drawerClose = (expandedWidth: string) => keyframes`
  0% {width: ${expandedWidth};}
  100% {width: ${defaultExpandedWidth};}
`;

const buttonOpen = () => keyframes`
  0% {float: right;}
  100% {float: right;}
`;

const buttonClose = () => keyframes`
  0% {float: right;}
  80% {float: right;}
  100% {float: left;}
`;

interface StyledDrawerContentProps {
  animationDuration?: string;
  backgroundColor?: string;
  expandedWidth: string;
}

const StyledDrawerContent = styled.aside<StyledDrawerContentProps>`
  display: flex;
  flex-direction: column;
  min-width: ${defaultExpandedWidth};
  width: ${defaultExpandedWidth};
  min-height: 40px;
  height: auto;
  position: relative;
  overflow: auto;

  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor || "var(--colorsUtilityMajor040)"};
    border-right: 1px solid ${backgroundColor || "var(--colorsUtilityMajor075)"};
  `};

  &.open {
    min-width: 52px;
    width: ${({ expandedWidth }) => expandedWidth};

    ${StyledDrawerSidebar}, ${StyledSidebarTitle} {
      display: block;
      opacity: 1;
    }
  }

  &.opening {
    animation: ${({ animationDuration, expandedWidth }) => css`
        ${drawerOpen(expandedWidth)} ${animationDuration}
      `}
      ease-in-out;

    ${StyledDrawerSidebar}, ${StyledSidebarTitle} {
      animation: ${sidebarVisible}
        ${({ animationDuration }) => animationDuration} ease-in-out;
    }
  }

  &.closed {
    overflow: hidden;
    ${StyledDrawerSidebar}, ${StyledSidebarTitle}, ${StyledStickyFooter} {
      display: block;
      opacity: 0;
    }
  }

  &.closing {
    animation: ${({ animationDuration, expandedWidth }) => css`
        ${drawerClose(expandedWidth)} ${animationDuration}
      `}
      ease-in-out;

    ${StyledDrawerSidebar}, ${StyledSidebarTitle}, ${StyledStickyFooter} {
      animation: ${sidebarHidden}
        ${({ animationDuration }) => animationDuration} ease-in-out;
    }
  }
`;

interface StyledSidebarToggleButtonProps {
  animationDuration?: string;
  isExpanded?: boolean;
}

const oldFocusStyling = `
  outline: solid 3px var(--colorsSemanticFocus500);
`;

const StyledSidebarToggleButton = styled.button.attrs({
  type: "button",
})<StyledSidebarToggleButtonProps>`
  ${({ animationDuration, isExpanded }) => css`
    position: absolute;
    top: var(--spacing300);
    right: 8px;
    padding: var(--spacing100);
    width: var(--spacing300);
    height: var(--spacing300);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: margin-right ${animationDuration} ease-in-out;
    background-color: transparent;
    border: none;
    z-index: 1;
    animation: ${buttonClose} ${animationDuration} ease-in-out;
    border-radius: var(--borderRadius050);

    ${({ theme }) =>
      `
      &:focus {
        ${
          !theme.focusRedesignOptOut
            ? addFocusStyling()
            : /* istanbul ignore next */ oldFocusStyling
        }
      }
    `}

    &:hover {
      cursor: pointer;
    }

    ${isExpanded &&
    css`
      transform: scaleX(-1);
      animation: ${buttonOpen} ${animationDuration} ease-in-out;
    `}
  `}
`;

StyledSidebarToggleButton.defaultProps = {
  theme: baseTheme,
};

const StyledDrawerWrapper = styled.div<{ height: string }>`
  display: flex;
  height: ${({ height }) => height};
`;

export {
  StyledSidebarHeader,
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledDrawerChildren,
  StyledDrawerSidebar,
  StyledSidebarTitle,
  StyledSidebarToggleButton,
};

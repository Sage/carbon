import styled, { css, keyframes } from "styled-components";
import baseTheme from "../../../style/themes/base";
import StyledTabs from "../../tabs/tabs.style";

const StyledSidebarTitle = styled.div`
  margin: 24px 36px 24px 24px;
`;

const StyledDrawerChildren = styled.div`
  flex: 1;
  margin-left: 1px;
  overflow: auto;
`;

const StyledDrawerSidebar = styled.div`
  overflow: auto;
  display: none;
  opacity: 0;

  ${({ hasControls, isExpanded }) =>
    hasControls &&
    css`
      ${StyledTabs} {
        margin-top: 48px;
        ${!isExpanded &&
        css`
          display: none;
        `}
      }
    `}
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

const drawerOpen = (expandedWidth) => keyframes`
  0% {
    width: 40px;
    overflow: hidden;
    min-width: 40px;
  }
  100% {
    width: ${expandedWidth};
    min-width: 52px;
  }
`;

const drawerClose = (expandedWidth) => keyframes`
  0% {width: ${expandedWidth};}
  100% {width: 40px;}
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

const StyledDrawerContent = styled.div`
  min-width: 40px;
  width: 40px;
  min-height: 40px;
  height: auto;
  position: relative;
  overflow: auto;
  border-right: 1px solid ${({ theme }) => theme.drawer.divider};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.drawer.background}};

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
    `} ease-in-out;

    ${StyledDrawerSidebar}, ${StyledSidebarTitle} {
      animation: ${sidebarVisible} ${({ animationDuration }) =>
  animationDuration} ease-in-out;
    }
  }

  &.closed {
    overflow: hidden;
    ${StyledDrawerSidebar}, ${StyledSidebarTitle} {
      display: block;
      opacity: 0;
    }
  }

  &.closing {
    animation: ${({ animationDuration, expandedWidth }) => css`
      ${drawerClose(expandedWidth)} ${animationDuration}
    `} ease-in-out;

    ${StyledDrawerSidebar}, ${StyledSidebarTitle} {
      animation: ${sidebarHidden} ${({ animationDuration }) =>
  animationDuration} ease-in-out;
    }
  }
`;

const StyledButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 18px;
  right: 6px;
  padding: 0;
  width: 24px;
  height: 24px;
  transition: margin-right ${({ animationDuration }) => animationDuration}
    ease-in-out;
  background-color: transparent;
  border: none;
  z-index: 1;

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }

  &:hover {
    cursor: pointer;
  }

  animation: ${buttonClose} ${({ animationDuration }) => animationDuration}
    ease-in-out;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      transform: scaleX(-1);
      animation: ${buttonOpen} ${({ animationDuration }) => animationDuration}
        ease-in-out;
    `}
`;

const StyledDrawerWrapper = styled.div`
  display: flex;
  height: ${({ height }) => height};
`;

StyledDrawerContent.defaultProps = {
  theme: baseTheme,
};

StyledButton.defaultProps = {
  theme: baseTheme,
};

export {
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledDrawerChildren,
  StyledDrawerSidebar,
  StyledSidebarTitle,
  StyledButton,
};

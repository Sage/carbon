import styled, { css, keyframes } from 'styled-components';
import baseTheme from '../../style/themes/base';

const StyledDrawerChildren = styled.div`
  flex: 1;
  margin-left: 1px;
  overflow: auto;
`;

const StyledDrawerSidebar = styled.div`
  overflow: auto;
  margin-top: 60px;
  display: none;
  opacity: 0;
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

const drawerOpen = expandedWidth => keyframes`
  0% {width: 40px;}
  100% {width: ${expandedWidth};}
`;

const drawerClose = expandedWidth => keyframes`
  0% {width: ${expandedWidth};}
  100% {width: 40px;}
`;

const buttonOpen = () => keyframes`
  0% {float: left;}
  20% {float: right;}
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
  overflow: hidden;
  border-right: 1px solid ${({ theme }) => theme.drawer.divider};

  &.open {
    min-width: 52px;
    width: ${({ expandedWidth }) => expandedWidth};
    animation: ${({ animationDuration, expandedWidth }) => css`
      ${drawerOpen(expandedWidth)} ${animationDuration}
    `} ease-in-out;

    ${StyledDrawerSidebar} {
      display: block;
      opacity: 1;
      animation: ${sidebarVisible} ${({ animationDuration }) => animationDuration} ease-in-out;
    }
  }

  &.closed {
    animation: ${({ animationDuration, expandedWidth }) => css`
      ${drawerClose(expandedWidth)} ${animationDuration}
    `} ease-in-out;

    ${StyledDrawerSidebar} {
      display: block;
      opacity: 0;
      animation: ${sidebarHidden} ${({ animationDuration }) => animationDuration} ease-in-out;
    }
  }
`;

const StyledButton = styled.button`
  float: right;
  padding: 0;
  width: 24px;
  height: 24px;
  margin: 8px 8px auto 8px;
  transition: margin-right ${({ animationDuration }) => animationDuration} ease-in-out;
  background-color: transparent;
  border: none;

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
  animation: ${buttonClose} ${({ animationDuration }) => animationDuration} ease-in-out;

  ${({ isExpanded }) => isExpanded && css`
    float: right;
    transform: scaleX(-1);
    margin-right: 20px;
    animation: ${buttonOpen} ${({ animationDuration }) => animationDuration} ease-in-out;
  `}
`;

const StyledDrawerWrapper = styled.div`
  display: flex;
  height: 100%;
`;

StyledDrawerContent.defaultProps = {
  theme: baseTheme
};

StyledButton.defaultProps = {
  theme: baseTheme
};

export {
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledDrawerChildren,
  StyledDrawerSidebar,
  StyledButton
};

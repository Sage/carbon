import styled, { css } from "styled-components";
import addFocusStyling from "../../style/utils/add-focus-styling";
import applyBaseTheme from "../../style/themes/apply-base-theme";

export const StyledSidebarTitle = styled.div<{ stickyHeader?: boolean }>`
  padding: var(--spacing300);

  ${({ stickyHeader }) =>
    stickyHeader &&
    css`
      position: sticky;
      top: 0;
      border-bottom: var(--sizing010) solid #a0a0a0;
    `}
`;

export const StyledSidebarFooter = styled.div<{ stickyFooter?: boolean }>`
  padding: var(--spacing300);
  background-color: var(--colorsUtilityYang100);

  ${({ stickyFooter }) =>
    stickyFooter &&
    css`
      position: sticky;
      bottom: 0;
    `}
`;

const StyledDrawerSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  overflow-y: auto;
  outline: none;
`;

interface StyledDrawerContentProps {
  animationDuration?: string;
  backgroundColor?: string;
  expandedWidth?: string;
  isExpanded?: boolean;
  showControls?: boolean;
}

const StyledDrawerContent = styled.aside<StyledDrawerContentProps>`
  ${({
    animationDuration,
    backgroundColor,
    expandedWidth,
    isExpanded,
    showControls,
  }) => css`
    flex-direction: column;
    height: auto;
    position: relative;
    overflow: auto;
    display: flex;
    min-width: "288px";
    width: ${expandedWidth};
    max-width: "760px";

    ${!isExpanded &&
    css`
      display: none;
      width: 0;
      min-width: 0;
    `}

    background-color: ${backgroundColor || "var(--colorsUtilityYang100)"};

    ${showControls &&
    css`
      display: flex;
      overflow: hidden;
      min-height: 40px;
      transition: all ${animationDuration} ease-in-out;

      ${StyledDrawerSidebar}, ${StyledSidebarTitle}, ${StyledSidebarFooter} {
        transition: all ${animationDuration} ease-in-out;
        white-space: nowrap;
        overflow: hidden;
        opacity: 1;
      }

      ${!isExpanded &&
      css`
        min-width: var(--sizing500);
        width: var(--sizing500);
        ${StyledDrawerSidebar}, ${StyledSidebarTitle}, ${StyledSidebarFooter} {
          opacity: 0;
        }
      `}
    `}
  `};
`;

interface StyledSidebarToggleButtonProps {
  isExpanded?: boolean;
}

const StyledSidebarToggleButton = styled.button.attrs(applyBaseTheme).attrs({
  type: "button",
})<StyledSidebarToggleButtonProps>`
  ${({ isExpanded }) => css`
    position: absolute;
    top: var(--spacing300);
    right: 8px;
    padding: var(--spacing100);
    width: var(--spacing300);
    height: var(--spacing300);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    z-index: 1;
    border-radius: var(--borderRadius050);
    transform: rotate(0deg);

    &:focus {
      ${addFocusStyling()}
    }

    &:hover {
      cursor: pointer;
    }

    ${isExpanded &&
    css`
      transform: rotate(180deg);
    `}
  `}
`;

const StyledDrawerWrapper = styled.div<{ height?: string }>`
  display: flex;
  ${({ height }) => css`
    height: ${height};
  `}
`;

export {
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledDrawerSidebar,
  StyledSidebarToggleButton,
};

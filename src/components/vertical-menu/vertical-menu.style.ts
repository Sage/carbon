import styled, { css } from "styled-components";
import { margin, padding, PaddingProps } from "styled-system";
import addFocusStyling from "../../style/utils/add-focus-styling";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import StyledButton from "../button/__next__/button.style";
import Button from "../button/__next__";

import StyledIcon from "../icon/icon.style";
import Icon from "../icon";

type StyledListProps = {
  level?: number;
};

export const StyledListWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  padding: var(--global-space-comp-s);
`;

export const StyledList = styled.ul<StyledListProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  list-style: none;
  margin: 0;
  padding-left: ${({ level }) =>
    !level || level === 0 ? "0px" : "var(--global-space-comp-l)"};
`;

export const StyledHr = styled.hr`
  border: none;
  border-bottom: 1px solid var(--nav-secondary-divider);
  margin: var(--global-space-comp-s) var(--global-space-comp-l);
`;

export const StyledListItem = styled.li.attrs(applyBaseTheme)`
  ${margin}
`;

interface StyledVerticalMenuProps extends PaddingProps {
  active?: boolean;
  height: string;
  isFullScreen?: boolean;
  level?: number;
  hasChildren?: boolean;
}

export const StyledVerticalMenuItem = styled.div.attrs(
  applyBaseTheme,
)<StyledVerticalMenuProps>`
  min-height: ${({ height }) => height};
  width: 100%;
  display: flex;
  border: none;
  align-items: center;
  font: ${({ isFullScreen }) =>
    isFullScreen
      ? "var(--global-font-static-comp-medium-l)"
      : "var(--global-font-static-comp-medium-m)"};
  cursor: pointer;
  color: ${({ isFullScreen, level, hasChildren }) =>
    isFullScreen && level === 0 && hasChildren
      ? "var(--nav-secondary-label-default-alt)"
      : "var(--nav-secondary-label-default)"};
  position: relative;
  box-sizing: border-box;
  text-decoration: none;
  background-color: var(--nav-secondary-bg-default);
  border-radius: var(--global-radius-container-m);

  padding: 0 var(--global-space-comp-l);

  ${padding}

  &:hover {
    background-color: var(--nav-secondary-bg-hover);
  }

  &:focus {
    ${addFocusStyling(true)}
  }

  &:active {
    background-color: var(--nav-secondary-bg-active);
  }

  ${({ active }) =>
    active &&
    css`
      &:before {
        background: var(--nav-secondary-bg-selected);
        content: "";
        height: 24px;
        left: 0px;
        position: absolute;
        top: 8px;
        width: 2px;
        z-index: 0;
      }

      &:focus,
      &:hover {
        &:before {
          background: transparent;
        }
      }
    `}

  ${StyledIcon} {
    width: 20px;
    color: var(--nav-secondary-label-default);
  }
`;

export const StyledTitle = styled.span`
  margin: 0;
  z-index: 1;
  text-align: left;
`;

export const StyledAdornment = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const StyledTitleIcon = styled(Icon)`
  margin-right: var(--global-space-comp-m);
  width: 20px;
  color: inherit;
`;

export const StyledCustomIconWrapper = styled.div`
  margin-right: var(--global-space-comp-m);
  width: 20px;
`;

export const StyledChevronIcon = styled(Icon)`
  margin-left: auto;
  padding-left: var(--global-space-comp-m);
  width: 20px;
  color: var(--nav-secondary-label-default);
`;

export const StyledVerticalMenuCloseBar = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40px;
  box-sizing: border-box;
  background-color: var(--nav-primary-bg-child);
  padding-right: var(--global-space-comp-l);

  ${StyledButton} {
    border: none;
    color: var(--nav-secondary-label-default);

    &:active,
    &:hover {
      background-color: transparent;
    }
  }
`;

export const StyledCloseButton = styled(Button)`
  border: none;
  border-radius: 0;

  && [data-component="icon"]:not([data-color]) {
    color: var(--nav-primary-label-default);
  }

  &&:hover,
  &&:active {
    background-color: var(--nav-primary-bg-child);
    border-color: transparent;
  }

  &&:hover [data-component="icon"]:not([data-color]),
  &&:active [data-component="icon"]:not([data-color]) {
    color: var(--nav-primary-label-default);
  }

  min-height: 32px;
  height: 32px;
  width: 32px;
  margin-top: 4px;
`;

export const StyledVerticalMenu = styled.nav.attrs(applyBaseTheme)<{
  $height: string;
  $width: string;
}>`
  background-color: var(--nav-secondary-bg-default);
  box-sizing: border-box;
  display: flex;
  height: ${({ $height }) => $height};
  overflow: auto;
  padding: var(--global-space-comp-s);
  width: ${({ $width }) => $width};
`;

interface FullScreenProps {
  isOpen: boolean;
  prefersReducedMotion?: boolean;
}

export const StyledVerticalMenuFullScreen = styled.nav.attrs(
  applyBaseTheme,
)<FullScreenProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  outline: none;
  padding: 0;
  overflow: auto;
  background-color: var(--nav-secondary-bg-default);
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndex.fullScreenModal};

  ${({ prefersReducedMotion }) =>
    !prefersReducedMotion &&
    css`
      transition: all 0.3s ease;
    `}

  ${({ isOpen }) =>
    isOpen &&
    css`
      visibility: visible;
      transform: translateX(0);
    `}

  ${({ isOpen }) =>
    !isOpen &&
    css`
      transform: translateX(-100%);
      visibility: hidden;
    `}
`;

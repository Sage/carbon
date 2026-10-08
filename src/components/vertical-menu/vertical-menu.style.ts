import styled, { css } from "styled-components";
import { margin, padding, PaddingProps } from "styled-system";
import addFocusStyling from "../../style/utils/add-focus-styling";
import applyBaseTheme from "../../style/themes/apply-base-theme";

import StyledIcon from "../icon/icon.style";
import Icon from "../icon";

export const StyledList = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const StyledListItem = styled.li.attrs(applyBaseTheme)`
  ${margin}
`;

interface StyledVerticalMenuProps extends PaddingProps {
  active?: boolean;
  height: string;
}

export const StyledVerticalMenuItem = styled.div.attrs(
  applyBaseTheme,
)<StyledVerticalMenuProps>`
  min-height: ${({ height }) => height};
  width: 100%;
  display: flex;
  border: none;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  color: var(--colorsComponentsLeftnavWinterStandardContent);
  position: relative;
  box-sizing: border-box;
  text-decoration: none;
  background-color: var(--colorsComponentsLeftnavWinterStandardBackground);

  ${padding}

  &:hover {
    background-color: var(--colorsComponentsLeftnavWinterStandardHover);
  }

  &:focus {
    ${addFocusStyling(true)}
  }

  ${({ active }) =>
    active &&
    css`
      &:before {
        background: var(--colorsComponentsLeftnavWinterStandardSelected);
        border-radius: var(--borderRadius100);
        content: "";
        height: calc(100% - 16px);
        left: 24px;
        position: absolute;
        top: 8px;
        width: calc(100% - 48px);
        z-index: 0;
      }

      &:hover {
        &:before {
          background: var(--colorsComponentsLeftnavWinterStandardHover);
        }
      }
    `}

  ${StyledIcon} {
    width: 20px;
  }
`;

export const StyledTitle = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
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
  margin-right: 12px;
  width: 20px;
  color: var(--colorsComponentsLeftnavWinterStandardContent);
`;

export const StyledCustomIconWrapper = styled.div`
  margin-right: 12px;
  width: 20px;
`;

export const StyledChevronIcon = styled(Icon)`
  margin-left: auto;
  padding-left: 12px;
  width: 20px;
  color: var(--colorsComponentsLeftnavWinterStandardContent);
`;

export const StyledVerticalMenu = styled.nav.attrs(applyBaseTheme)<{
  $height: string;
  $width: string;
}>`
  background-color: rgb(38, 38, 38);
  box-sizing: border-box;
  display: flex;
  height: ${({ $height }) => $height};
  overflow: auto;
  padding-block: var(--global-space-layout-3-xs);
  scrollbar-color: rgb(179, 179, 179) rgb(77, 77, 77);
  width: ${({ $width }) => $width};

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgb(77, 77, 77);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
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
  padding: var(--global-space-layout-3-xs) 0;
  overflow: auto;
  background-color: rgb(38, 38, 38);
  box-sizing: border-box;
  scrollbar-color: rgb(102, 132, 148) rgb(242, 245, 246);
  z-index: ${({ theme }) => theme.zIndex.fullScreenModal};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgb(242, 245, 246);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(102, 132, 148);
  }

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

  &::-webkit-scrollbar {
    width: 12px;
  }
`;

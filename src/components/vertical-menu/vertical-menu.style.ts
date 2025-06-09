import styled, { css } from "styled-components";
import { padding, PaddingProps } from "styled-system";
import addFocusStyling from "../../style/utils/add-focus-styling";
import applyBaseTheme from "../../style/themes/apply-base-theme";

import StyledIcon from "../icon/icon.style";
import Icon from "../icon";
import StyledBox from "../box/box.style";

export const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
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

export const StyledTitle = styled.h3`
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

export const StyledChevronIcon = styled(Icon)`
  margin-left: auto;
  padding-left: 12px;
  width: 20px;
  color: var(--colorsComponentsLeftnavWinterStandardContent);
`;

export const StyledVerticalMenu = styled(StyledBox)`
  // TODO remove hardcoded values when DS have had chance to review which token to use
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #808080;
  }
  &::-webkit-scrollbar {
    width: 12px;
  }
`;

interface FullScreenProps {
  isOpen: boolean;
  prefersReducedMotion?: boolean;
}

export const StyledVerticalMenuFullScreen = styled(StyledBox)<FullScreenProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  outline: none;
  padding: 8px 0px;
  overflow: auto;
  background-color: var(--colorsComponentsLeftnavWinterStandardBackground);
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

  // TODO remove hardcoded values when DS have had chance to review which token to use
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #808080;
  }
  &::-webkit-scrollbar {
    width: 12px;
  }
`;

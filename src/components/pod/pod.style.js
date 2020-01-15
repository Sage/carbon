import styled, { css } from 'styled-components';

import { baseTheme } from '../../style/themes';
import Link from '../link';
import Icon from '../icon';
import StyledIcon from '../icon/icon.style';

import { isClassic } from '../../utils/helpers/style-helper';

import {
  styledBlockClassic, styledHeaderClassic, styledFooterClassic, styledEditActionClassic
} from './pod-classic.style';

const StyledPod = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  text-align: ${({ alignTitle }) => alignTitle};
  ${({ internalEditButton }) => internalEditButton && 'position: relative'};

  &:focus {
    outline: none;
  }
`;

const blockBackgrounds = (podType, theme) => ({
  primary: theme.colors.white,
  secondary: theme.pod.secondaryBackground,
  tertiary: theme.pod.tertiaryBackground,
  transparent: 'transparent',
  tile: theme.colors.white
}[podType]);

const StyledBlock = styled.div`
  ${({
    theme,
    podType,
    noBorder,
    editable,
    contentTriggersEdit,
    fullWidth,
    internalEditButton,
    isHovered,
    isFocused
  }) => css`
    box-sizing: border-box;
    background-color: ${blockBackgrounds(podType, theme)};
    width: 100%;
    ${podType === 'tile' && 'box-shadow: 0 2px 3px 0 rgba(2, 18, 36, 0.2)'};
    ${noBorder ? 'border: none' : `border: 1px solid ${theme.pod.border};`};
    ${editable && !(fullWidth || internalEditButton) && 'width: auto;'};
    ${contentTriggersEdit && 'cursor: pointer'};
    ${(isHovered || isFocused) && css`
      background-color: ${theme.pod.hoverBackground};

      ${internalEditButton && podType === 'tile' && 'background-color: transparent;'}
      ${contentTriggersEdit && css`
        background-color: ${theme.colors.primary};
        * {
          color: ${theme.colors.white};
        }
      `}
    `}

    ${!isClassic(theme)
      && isFocused
      && (!internalEditButton || contentTriggersEdit)
      && css`
        outline: 3px solid ${theme.colors.focus};
        border: none;
        ${noBorder ? '' : 'padding: 1px'};
      `};

    ${styledBlockClassic}
  `}
`;

const contentPaddings = {
  'extra-small': '6px',
  small: '10px',
  medium: '15px',
  large: '30px 25px',
  'extra-large': '40px'
};

const StyledContent = styled.div`
  text-align: left;
  padding: ${({ padding }) => contentPaddings[padding]};
`;

const StyledCollapsibleContent = styled.div``;

const StyledDescription = styled.div`
  background: none;
  margin-bottom: 10px;
  font-size: 13px;
`;

const footerPaddings = {
  'extra-small': '6px',
  small: '10px',
  medium: '10px 15px',
  large: '15px 25px',
  'extra-large': '20px 40px'
};

const StyledFooter = styled.div`
  ${({ theme, podType, padding }) => css`
    background-color: ${theme.pod.footerBackground};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: inset 0px 1px 1px 0 rgba(0, 0, 0, 0.1);

    ${podType === 'tile' && css`
      border-top: 1px solid ${theme.pod.border};
    `};

    padding: ${footerPaddings[padding]};

    ${styledFooterClassic}
  `}
`;

const StyledEditContainer = styled.div`
  ${({ internalEditButton }) => internalEditButton && css`
      position: absolute;
      right: 2px;
      top: 2px;
      z-index: 10;
    `}
`;

const editPaddings = {
  'extra-small': 6,
  small: 10,
  medium: 15,
  large: 15,
  'extra-large': 15
};

const editBackgrounds = (podType, theme) => ({
  primary: theme.colors.white,
  secondary: theme.pod.secondaryBackground,
  tertiary: theme.pod.tertiaryBackground,
  transparent: 'transparent',
  tile: theme.colors.white
}[podType]);

const StyledEditAction = styled(Link)`
  ${({
    theme,
    padding,
    podType,
    noBorder,
    isFocused,
    isHovered,
    displayOnlyOnHover,
    internalEditButton,
    contentTriggersEdit
  }) => css`
    && {
      cursor: pointer;
      background-color: ${editBackgrounds(podType, theme)};
      border: 1px solid ${theme.pod.border};
      margin-left: 8px;

      > a, button {
        width: 15px;
        height: 15px;
        padding: ${editPaddings[padding]}px;
        background-color: transparent;
      }

      ${StyledIcon} {
        top: -2px;
      }
      ${noBorder && 'border: none;'}
      ${internalEditButton && css`
        border: none;
        background: transparent;
      `}

      ${displayOnlyOnHover && !(isHovered || isFocused) && 'display: none;'}
      ${(isHovered || isFocused)
        && !internalEditButton
        && css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};

          ${StyledIcon} {
            color: ${theme.colors.white};
          }
        `}

      ${isFocused
        && !isClassic(theme)
        && (!internalEditButton || !contentTriggersEdit)
        && css`
          outline: 3px solid ${theme.colors.focus};
          border: none;
          > a, button {
            padding: ${editPaddings[padding] + (noBorder || internalEditButton ? 0 : 1)}px;
          }
        `};


      .carbon-link__content {
        clip: rect(1px, 1px, 1px, 1px);
        position: absolute;
      }

      ${styledEditActionClassic}
    }
  `}
`;

const headerRightAlignMargins = {
  'extra-small': 20,
  small: 25,
  medium: 30,
  large: 30,
  'extra-large': 30
};

const StyledHeader = styled.div`
  ${({
    alignTitle,
    internalEditButton,
    padding,
    isCollapsed
  }) => css`
    margin-bottom: 24px;
    text-align: ${alignTitle};

    ${isCollapsed === true
      && css`
        margin-bottom: 0;
        cursor: pointer;
      `};

    ${alignTitle === 'right'
      && internalEditButton
      && css`
        margin-right: ${headerRightAlignMargins[padding]}px;
      `};

    ${styledHeaderClassic}
  `}
`;

const StyledSubtitle = styled.h5`
  margin-top: 8px;
  font-size: 14px;
  font-weight: normal;
`;

const StyledTitle = styled.h4`
  display: inline;
  font-size: 18px;
  font-weight: 600;
`;

const StyledArrow = styled(Icon).attrs({ type: 'dropdown' })`
  position: relative;
  top: -1px;
  ${({ isCollapsed }) => isCollapsed && 'transform: rotate(180deg)'};
`;

StyledBlock.defaultProps = {
  theme: baseTheme
};
StyledCollapsibleContent.defaultProps = {
  theme: baseTheme
};
StyledContent.defaultProps = {
  theme: baseTheme
};
StyledDescription.defaultProps = {
  theme: baseTheme
};
StyledEditAction.defaultProps = {
  theme: baseTheme
};
StyledEditContainer.defaultProps = {
  theme: baseTheme
};
StyledFooter.defaultProps = {
  theme: baseTheme
};
StyledPod.defaultProps = {
  theme: baseTheme
};
StyledHeader.defaultProps = {
  theme: baseTheme
};
StyledSubtitle.defaultProps = {
  theme: baseTheme
};
StyledTitle.defaultProps = {
  theme: baseTheme
};
StyledArrow.defaultProps = {
  theme: baseTheme
};

export {
  StyledBlock,
  StyledCollapsibleContent,
  StyledContent,
  StyledDescription,
  StyledEditAction,
  StyledEditContainer,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
  StyledArrow
};

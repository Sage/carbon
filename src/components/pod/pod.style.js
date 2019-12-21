import styled, { css } from 'styled-components';

import BaseTheme from '../../style/themes/base';
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
  box-sizing: border-box;
  background-color: ${({ theme, podType }) => blockBackgrounds(podType, theme)};
  ${({ podType }) => podType === 'tile' && 'box-shadow: 0 2px 3px 0 rgba(2, 18, 36, 0.2)'};
  border: 1px solid ${({ theme }) => theme.pod.border};
  ${({ noBorder }) => noBorder && 'border: none'};
  width: 100%;
  ${({ editable, fullWidth, internalEditButton }) => {
    return editable && !(fullWidth || internalEditButton) && 'width: auto';
  }};
  ${({ contentTriggersEdit }) => contentTriggersEdit && 'cursor: pointer'};
  ${({
    contentTriggersEdit, isHovered, isFocused, theme, internalEditButton, podType
  }) => {
    if (isHovered || isFocused) {
      if (internalEditButton) {
        return podType === 'tile' ? 'background-color: transparent' : '';
      }

      if (contentTriggersEdit) {
        return css`
          background-color: ${theme.colors.primary};
          * {
            color: ${theme.colors.white};
          }
        `;
      }

      return `background-color: ${theme.pod.hoverBackground}`;
    }
    return '';
  }}

  ${({
    isFocused, internalEditButton, contentTriggersEdit, noBorder, theme
  }) => !isClassic(theme)
    && isFocused
    && (!internalEditButton || contentTriggersEdit)
    && css`
      outline: 3px solid ${theme.colors.focus};
      border: none;
      ${noBorder ? '' : 'padding: 1px'};
    `};

  ${styledBlockClassic}
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
  background-color: ${({ theme }) => theme.pod.footerBackground};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: inset 0px 1px 1px 0 rgba(0, 0, 0, 0.1);

  ${({ podType, theme }) => podType === 'tile'
    && css`
      border-top: 1px solid ${theme.pod.border};
    `};

  padding: ${({ padding }) => footerPaddings[padding]};

  ${styledFooterClassic}
`;

const StyledEditContainer = styled.div`
  /* cursor: pointer; */

  ${({ internalEditButton }) => internalEditButton
    && css`
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
&& {
  cursor: pointer;
  background-color: ${({ theme, podType }) => editBackgrounds(podType, theme)};
  border: 1px solid ${({ theme }) => theme.pod.border};
  margin-left: 8px;

  > a, button {
    width: 15px;
    height: 15px;
    padding: ${({ padding }) => editPaddings[padding]}px;
    background-color: transparent;
  }

  ${StyledIcon} {
    top: -2px;
  }

  ${({ noBorder }) => noBorder && 'border: none'}
  ${({ internalEditButton }) => internalEditButton
    && css`
      border: none;
      background: transparent;
    `}

  ${({ displayOnlyOnHover, isFocused, isHovered }) => {
    return displayOnlyOnHover && !(isHovered || isFocused) && 'display: none';
  }}

  ${({
    isHovered, isFocused, theme, internalEditButton
  }) => (isHovered || isFocused)
    && !internalEditButton
    && css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};

      ${StyledIcon} {
        color: ${theme.colors.white};
      }
    `}

  ${({
    isFocused, padding, noBorder, internalEditButton, theme, contentTriggersEdit
  }) => isFocused
    && !isClassic(theme)
    && (internalEditButton ? !contentTriggersEdit : true)
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
`;

const headerRightAlignMargins = {
  'extra-small': 20,
  small: 25,
  medium: 30,
  large: 30,
  'extra-large': 30
};

const StyledHeader = styled.div`
  margin-bottom: 24px;
  text-align: ${({ alignTitle }) => alignTitle};

  ${({ isCollapsed }) => isCollapsed === true
    && css`
      margin-bottom: 0;
      cursor: pointer;
    `};

  ${({ alignTitle, internalEditButton, padding }) => alignTitle === 'right'
    && internalEditButton
    && css`
      margin-right: ${headerRightAlignMargins[padding]}px;
    `};

  ${styledHeaderClassic}
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
  theme: BaseTheme
};
StyledCollapsibleContent.defaultProps = {
  theme: BaseTheme
};
StyledContent.defaultProps = {
  theme: BaseTheme
};
StyledDescription.defaultProps = {
  theme: BaseTheme
};
StyledEditAction.defaultProps = {
  theme: BaseTheme
};
StyledEditContainer.defaultProps = {
  theme: BaseTheme
};
StyledFooter.defaultProps = {
  theme: BaseTheme
};
StyledPod.defaultProps = {
  theme: BaseTheme
};
StyledHeader.defaultProps = {
  theme: BaseTheme
};
StyledSubtitle.defaultProps = {
  theme: BaseTheme
};
StyledTitle.defaultProps = {
  theme: BaseTheme
};
StyledArrow.defaultProps = {
  theme: BaseTheme
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

import styled, { css } from 'styled-components';

import Icon from '../icon';
import { baseTheme } from '../../style/themes';

const StyledAccordionContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  width: ${({ width }) => width || '100%'};
  padding: ${({ customPadding }) => customPadding || 0}px 0;
  color: ${({ theme }) => theme.text.color};
  background-color: ${({ scheme, theme }) => (scheme === 'white' ? theme.colors.white : 'transparent')};
  ${({ theme }) => (css`border: 1px solid ${theme.accordion.border}`)};
  ${({ borders }) => (borders === 'default' && css`border-left: none; border-right: none;`)}

  & + & {
    margin-top: -1px;
    border-top: 1px solid ${({ theme }) => theme.accordion.border};
    border-bottom: 1px solid ${({ theme }) => theme.accordion.border};
  }

  ${({ styleOverride }) => styleOverride};
`;

const StyledAccordionTitle = styled.h3`
  font-size: ${({ size }) => (size === 'small' ? '14' : '20')}px;
  font-weight: ${({ size }) => (size === 'small' ? 700 : 900)};
  line-height: 1;
  user-select: none;
  margin: 0;
  ${({ styleOverride }) => styleOverride};
`;

const StyledAccordionSubTitle = styled.span`
  margin-top: 8px;
`;

const StyledAccordionIcon = styled(Icon)`
  transition: transform 0.3s;
  margin-right: ${({ iconAlign, theme }) => (iconAlign === 'left' ? theme.spacing * 2 : 0)}px;
  ${({ isExpanded, iconAlign }) => {
    return !isExpanded && (iconAlign === 'right' ? 'transform: rotate(90deg)' : 'transform: rotate(-90deg)');
  }};
  ${({ styleOverride }) => styleOverride};
`;

const StyledAccordionHeadingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAccordionTitleContainer = styled.div`
  padding:  ${({ size, theme }) => (size === 'small' ? theme.spacing * 2 : theme.spacing * 3)}px;  
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;

  ${({ iconAlign }) => (iconAlign === 'left' && css`
    justify-content: flex-end;
    flex-direction: row-reverse;
  `)}

  cursor: pointer;
  z-index: 1;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
  }

  &:hover {
    background-color: ${({ theme }) => theme.accordion.background};
  }
  ${({ styleOverride }) => styleOverride};
`;

const StyledAccordionContentContainer = styled.div`
  flex-grow: 1;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.3s;
  max-height: ${({ maxHeight }) => maxHeight}px;
  height: ${({ maxHeight }) => maxHeight}px;
  ${({ isExpanded }) => !isExpanded && 'visibility: hidden'};
`;

const StyledAccordionContent = styled.div`
  padding: 0 ${({ theme }) => theme.spacing * 3}px;
  ${({ styleOverride }) => styleOverride};
`;

StyledAccordionContainer.defaultProps = {
  theme: baseTheme
};
StyledAccordionTitleContainer.defaultProps = {
  theme: baseTheme
};
StyledAccordionTitle.defaultProps = {
  theme: baseTheme
};
StyledAccordionIcon.defaultProps = {
  theme: baseTheme
};
StyledAccordionContent.defaultProps = {
  theme: baseTheme
};
StyledAccordionContentContainer.defaultProps = {
  theme: baseTheme
};

export {
  StyledAccordionContainer,
  StyledAccordionHeadingsContainer,
  StyledAccordionSubTitle,
  StyledAccordionTitleContainer,
  StyledAccordionTitle,
  StyledAccordionIcon,
  StyledAccordionContent,
  StyledAccordionContentContainer
};

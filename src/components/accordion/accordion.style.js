import styled, { css } from 'styled-components';

import Icon from '../icon';
import { baseTheme } from '../../style/themes';

const StyledAccordionContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding:  ${({ theme }) => theme.spacing * 7}px;
  background-color: ${({ accordionType, theme }) => (accordionType === 'primary' ? theme.colors.white : 'transparent')};
  ${({ accordionType, theme }) => (accordionType === 'primary' && css`border: 1px solid ${theme.accordion.border}`)};

  & + & {
    margin-top: -1px;
    border-top: 1px solid ${({ theme }) => theme.accordion.border};
    border-bottom: 1px solid ${({ theme }) => theme.accordion.border};
  }

  ${({ styleOverride }) => styleOverride};
`;

const StyledAccordionTitle = styled.h3`
  font-size: 20px;
  font-weight: 900;
  line-height: 1;
  user-select: none;
  margin: 0;
  ${({ styleOverride }) => styleOverride};
`;

const StyledAccordionIcon = styled(Icon)`
  transition: transform 0.3s;
  margin-right: ${({ iconAlign, theme }) => (iconAlign === 'left' ? theme.spacing * 2 : 0)}px;
  ${({ isExpanded }) => !isExpanded && 'transform: rotate(90deg)'};
  ${({ styleOverride }) => styleOverride};
`;

const StyledAccordionTitleContainer = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
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

    ${StyledAccordionTitle} {
      color: ${({ theme }) => theme.colors.primary};
    }
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
  padding: ${({ theme }) => theme.spacing * 3}px;
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
  StyledAccordionTitleContainer,
  StyledAccordionTitle,
  StyledAccordionIcon,
  StyledAccordionContent,
  StyledAccordionContentContainer
};

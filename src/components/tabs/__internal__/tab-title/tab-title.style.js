import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../../style/themes/base';

const StyledTabTitle = styled.li`
  background-color: transparent;
  border-bottom: 2px solid ${({ theme }) => theme.disabled.background};
  color: ${({ theme }) => theme.disabled.disabled};
  display: inline-block;
  font-weight: bold;
  height: 100%;
  line-height: 20px;
  margin: 0;
  padding: 14px 16px 12px;

  &:first-child {
    margin-left: 0;
  }

  ${({ isTabSelected }) => !isTabSelected && css`
    &:hover,
    &:focus {
      background: transparent;
      border-bottom-color: ${({ theme }) => theme.colors.hoveredTabKeyline};
      color: ${({ theme }) => theme.text.color};
      outline: none;
    }
  `}

  ${({ isTabSelected }) => isTabSelected && css`
    color: ${({ theme }) => theme.text.color};
    background-color: transparent;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
    
    &:focus {
      outline: none;
      ${({ theme, position }) => css`
        position: relative;
        &:after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          ${position === 'top' && css`
            bottom: -2px;
            left: 0;
            box-shadow: 
              inset 2px 0 0 0 ${theme.colors.focus}, 
              inset -2px 0 0 0 ${theme.colors.focus}, 
              inset 0 2px 0 0 ${theme.colors.focus}, 
              0 2px 0 0 ${theme.colors.focus};
          `}
          ${position === 'left' && css`
            bottom: 0;
            left: 2px; 
            box-shadow: 
              inset 2px 0 0 0 ${theme.colors.focus}, 
              2px 0 0 0 ${theme.colors.focus}, 
              inset 0 2px 0 0 ${theme.colors.focus}, 
              inset 0 -2px 0 0 ${theme.colors.focus};
          `}  
        }
      `}
    }

    &:hover {
      background: transparent;
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.text.color};
    }
  `}

  ${({ position }) => position === 'left' && css`
    background-color: transparent;
    border-bottom: 0px;
    border-right: 2px solid ${({ theme }) => theme.disabled.background};
    display: block;
    height: auto;
    margin-left: 0px;

    &:first-child {
      margin-top: 0;
    }

    &:hover {
      background: transparent;
      border-right-color: ${({ theme }) => theme.colors.hoveredTabKeyline};
    }

    ${({ isTabSelected }) => isTabSelected && css`
      border-right-color: ${({ theme }) => theme.colors.primary};
      background-color: transparent;

      &:hover {
        border-right-color: ${({ theme }) => theme.colors.primary};
        background-color: transparent;
      }
    `}

    ${({ tabHasWarning, theme }) => tabHasWarning && css`
      border-right-color: ${theme.colors.warning};
      :hover {
        border-right-color: ${theme.colors.warning};
      }
    `}

    ${({ tabHasError, theme }) => tabHasError && css`
      border-right-color: ${theme.colors.error};
      :hover {
        border-right-color: ${theme.colors.error};
      }
    `}
  `}

  ${({ tabHasWarning, theme }) => tabHasWarning && css`
    border-bottom-color: ${theme.colors.warning};
    :hover {
      border-bottom-color: ${theme.colors.warning};
    }
  `}

  ${({ tabHasError, theme }) => tabHasError && css`
    border-bottom-color: ${theme.colors.error};
    :hover {
      border-bottom-color: ${theme.colors.error};
    }
  `}
`;

StyledTabTitle.propTypes = {
  position: PropTypes.oneOf(['top', 'left'])
};

StyledTabTitle.defaultProps = {
  theme: BaseTheme,
  position: 'top'
};

export default StyledTabTitle;

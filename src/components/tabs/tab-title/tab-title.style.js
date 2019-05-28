import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import TabTitleClassicStyle from './tab-title-classic.style';

const StyledTabTitle = styled.li`
  background-color: transparent;
  border-bottom: 2px solid ${({ theme }) => theme.disabled.background};
  color: ${({ theme }) => theme.disabled.disabled};
  display: inline-block;
  font-weight: bold;
  height: 100%;
  margin-left: 2px;
  padding: 11px 15px 10px;

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
      box-shadow: 0 0 6px ${({ theme }) => theme.colors.focus};        
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
    margin-top: 2px;

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

    ${({ tabHasWarning }) => tabHasWarning && css`
      border-right-color: ${({ theme }) => theme.colors.warning};
    `}

    ${({ tabHasError }) => tabHasError && css`
      border-right-color: ${({ theme }) => theme.colors.error};
    `}
  `}

  ${({ tabHasWarning }) => tabHasWarning && css`
    border-bottom-color: ${({ theme }) => theme.colors.warning};
  `}

  ${({ tabHasError }) => tabHasError && css`
    border-bottom-color: ${({ theme }) => theme.colors.error};
  `}

  ${TabTitleClassicStyle}
`;

StyledTabTitle.propTypes = {
  position: PropTypes.oneOf(['top', 'left'])
};

StyledTabTitle.defaultProps = {
  theme: BaseTheme,
  position: 'top'
};

export default StyledTabTitle;

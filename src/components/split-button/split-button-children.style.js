import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import StyledButton from '../button/button.style';
import colors from './split-button-colors.style';
import { THEMES } from '../../style/themes';

const StyledSplitButtonChildrenContainer = styled.div`
  position: absolute;
  right: 0;
  ${styleChildrenContainer}
  
  ${StyledButton} {
    ${applyStylingToChildButtons}
    color: ${colors.white};
    display: block;
    margin-left: 0;
    margin-top: 3px;
    margin-bottom: 3px;
    min-width: 100%;
    z-index: 10;
    & + & {
      margin-top: 3px;
    }
  }

  ${({ displayButtons }) => (!displayButtons ? 'display: none' : undefined)}
`;

function styleChildrenContainer({ theme }) {
  if (theme.name === THEMES.classic) {
    return `
      max-width: 100%;
      background-color: ${colors.classic.secondary};
      min-width: 100%;
      width: 100%;
    `;
  }
  return `
    background-color: ${theme.colors.secondary};
    min-width: 75%;
    padding-top: 2px;
    white-space: nowrap;
  `;
}

function applyStylingToChildButtons({ theme }) {
  if (theme.name === THEMES.classic) {
    return css`
      background-color: ${colors.classic.secondary};
      border: 1px solid ${colors.classic.secondary};
      display: block;
      font-size: 14px;
      height: 31px;
      letter-spacing: 0;
      padding: 0 18px;
      text-align: left;
      &:focus {
        background-color: ${colors.classic.tertiary};
      }
      &:hover {
        background-color: ${colors.classic.tertiary};
      }
    `;
  }
  return css`
    background-color: ${theme.colors.secondary};
    border: 1px solid ${theme.colors.secondary};
    &:focus {
      background-color: ${theme.colors.tertiary};
    }
    &:hover {
      background-color: ${theme.colors.tertiary};
    }
  `;
}

StyledSplitButtonChildrenContainer.propTypes = {
  displayButtons: PropTypes.bool
};

StyledSplitButtonChildrenContainer.defaultProps = {
  displayButtons: false,
  theme: BaseTheme
};

export default StyledSplitButtonChildrenContainer;

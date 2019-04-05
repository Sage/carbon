import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../button/button.style';
import colors from './split-button-colors.style';
// import OptionsHelper from '../../utils/helpers/options-helper';

const StyledSplitButtonChildrenContainer = styled.div`
  max-width: 100%;
  position: absolute;
  right: 0;
  ${styleChildrenContainer}
  
  ${StyledButton}{
    ${applyStylingToChildButtons}
    color: ${colors.white};
    margin-left: 0;
    margin-top: 3px;
    min-width: 100%;
    z-index: 10;
    text-align: left;
  }
  
  .active-child {
    ${applyScrollStyling}
  }

  ${({ displayButtons }) => (!displayButtons ? 'display: none' : undefined)}
`;

function styleChildrenContainer({ theme }) {
  if (theme.name === 'classic') {
    return `
      background-color: ${colors.classic.secondary};
      min-width: 100%;
      width: 100%;
    `;
  }
  return `
    background-color: ${theme.colors.secondary};
    min-width: 75%;
    width: 75%;
  `;
}

function applyStylingToChildButtons({ theme }) {
  if (theme.name === 'classic') {
    return css`
      background-color: ${colors.classic.secondary};
      border: 1px solid ${colors.classic.secondary};
      &:hover {
        background-color: ${colors.classic.tertiary};
      }
      & span {
        text-align: left;
      }
    `;
  }
  return css`
    background-color: ${theme.colors.secondary};
    border: 1px solid ${theme.colors.secondary};
    &:hover {
      background-color: ${theme.colors.tertiary};
    }
  `;
}

function applyScrollStyling({ theme }) {
  if (theme.name === 'classic') {
    return css`
      background-color: ${colors.classic.tertiary};
      box-shadow: 0 0 6px rgba(25,99,246,.6);
      outline: none;
    `;
  }
  return css`
    background-color: ${theme.colors.tertiary};
    outline: solid 3px ${theme.colors.warning};
  `;
}

StyledSplitButtonChildrenContainer.propTypes = {
  displayButtons: PropTypes.bool
};

StyledSplitButtonChildrenContainer.defaultProps = {
  displayButtons: false
};

export default StyledSplitButtonChildrenContainer;

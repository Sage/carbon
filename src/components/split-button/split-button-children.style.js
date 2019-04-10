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
  
  ${StyledButton} {
    ${applyStylingToChildButtons}
    color: ${colors.white};
    margin-left: 0;
    margin-top: 3px;
    padding-bottom: 5px;
    padding-top: 5px;
    min-width: 100%;
    z-index: 10;
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
      display: block;
      background-color: ${colors.classic.secondary};
      border: 1px solid ${colors.classic.secondary};
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
  displayButtons: false
};

export default StyledSplitButtonChildrenContainer;

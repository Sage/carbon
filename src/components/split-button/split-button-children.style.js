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
    min-width: 100%;
    padding: 5px 18px;
    z-index: 10;
    text-align: left;
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
      border-color: ${colors.classic.secondary};
      &:hover {
        background-color: ${colors.classic.tertiary};
      }
      & span {
        margin-left: -24px;
      }
    `;
  }
  return css`
    background-color: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary};
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

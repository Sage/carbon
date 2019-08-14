import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const StyledCard = styled.div`
  ${({ border, theme }) => {
    return css`
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadows.cards};
      margin-bottom: 32px;
      position: relative;
      transition: all 0.3s ease-in-out;

      ${border && css`
        border: 1px solid ${theme.colors.border};
      `}

      ${!border && css`
        border: none;
      `}
    `;
  }
}`;

StyledCard.defaultProps = {
  border: true,
  theme: baseTheme
};

StyledCard.propTypes = {
  border: propTypes.bool
};

export default StyledCard;

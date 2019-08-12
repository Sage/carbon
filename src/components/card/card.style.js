import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const CardStyle = styled.div`
  ${({ border, theme }) => {
    return css`
        ${border && css`
          border: 1px solid ${theme.colors.border}
      `}
    `;
  }
}`;

CardStyle.defaultProps = {
  border: true,
  theme: baseTheme
};

CardStyle.propTypes = {
  border: propTypes.bool
};

export default CardStyle;

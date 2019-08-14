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

const StyledCardHeader = styled.div`
  ${() => {
    return css`
      padding: 32px 32px 0;
      margin-bottom: 24px;
    `;
  }
}`;

const StyledCardDescription = styled.div`
${() => {
    return css`
      text-align: center;
      margin-bottom: 32px;
  `;
  }
}`;

const StyledCardFooter = styled.div`
${({ theme }) => {
    return css`
      background-color: ${theme.card.footerBackground};
      border-top: ${theme.card.footerBorder};
      height: 56px;
      line-height: 56px;
      padding: 0;
      text-align: center;
    `;
  }
}`;

export {
  StyledCard,
  StyledCardHeader,
  StyledCardDescription,
  StyledCardFooter
};

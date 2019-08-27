import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';

const CardContentConfig = (theme) => {
  return {
    header: {
      primary: `
        font-size: 22px;
        font-weight: 700;
        line-height: 26px;
        margin: 0;
      `,
      secondary: `
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        margin: 0;
      `
    },
    middle: {
      primary: `
        color: ${theme.card.middlePrimary};
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.48px;
        margin-bottom: 10px;
      `,
      secondary: `
        color: ${theme.card.middleSecondary};
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
      `,
      tertiary: `
        color: ${theme.card.middleTertiary};
        font-size: 12px;
        text-transform: uppercase;
      `
    }
  };
};
const applyContentStyle = ({ theme, positionType, styleType }) => {
  if (positionType === 'footer') {
    return `
      line-height: 30px;
      margin: 0;
      color: ${theme.card.footerText};
      font-weight: 600;
      padding: 12px 0;
    `;
  }

  return CardContentConfig(theme)[positionType][styleType];
};

const StyledCardContent = styled.div`
  ${applyContentStyle}
`;

const StyledCardSection = styled.div`
  ${({ align }) => {
    return css`
      width: 100%;
      ${align && css`
        text-align: ${align};
      `}
      ${!align && css`
        text-align: center;
      `}
    `;
  }
}`;

StyledCardSection.defaultProps = {
  theme: BaseTheme
};

export {
  StyledCardSection,
  StyledCardContent
};

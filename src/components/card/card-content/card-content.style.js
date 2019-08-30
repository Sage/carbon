import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';

// const CardContentConfig = ({ card }) => {
//   return {
//     header: `
//         font-size: 22px;
//         font-weight: 700;
//         line-height: 26px;
//         margin: 0;
//       `,
// secondary: `
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 21px;
//   margin: 0;
// `
// },
// middle: `
//     color: ${card.middlePrimary};
//     font-size: 24px;
//     font-weight: 700;
//     margin-bottom: 10px;
//   `
//   secondary: `
//     color: ${card.middleSecondary};
//     font-size: 14px;
//     font-weight: 700;
//     margin-bottom: 8px;
//   `,
//   tertiary: `
//     color: ${card.middleTertiary};
//     font-size: 12px;
//     text-transform: uppercase;
//   `
// }
//   };
// };

// const applyContentStyle = ({ theme, positionType, styleType }) => {
//   if (positionType === 'footer') {
//     return `
//       line-height: 30px;
//       margin: 0;
//       color: ${theme.card.footerText};
//       font-weight: 600;
//       padding: 12px 0;
//     `;
//   }

//   return CardContentConfig(theme)[positionType][styleType];
// };

const StyledCardContent = styled.div`
  width: 100%;
  ${({ align, positionType, theme }) => css`
    text-align: ${align};

    ${positionType === 'header' && css`
      &&& {
        font-size: 22px;
        font-weight: 700;
        line-height: 26px;
        margin: 0;
      }
    `}

    ${positionType === 'middle' && css`
      &&& {
        color: ${theme.card.middlePrimary};
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
      }
    `}

    ${positionType === 'footer' && css`
      &&& {
        line-height: 30px;
        margin: 0;
        color: ${theme.card.footerText};
        font-weight: 600;
        padding: 12px 0;
      }
    `}
  `}
`;

StyledCardContent.defaultProps = {
  align: 'center',
  theme: BaseTheme
};

export default StyledCardContent;

import styled, { css } from 'styled-components';
import BaseTheme from '../../../style/themes/base';

// states: {
//   error: {
//     color: palette.errorRed
//   },
//   warning: {
//     color: palette.gold
//   }
// },
// sizes: {
//   small: {
//     width: '32px'
//   },
//   medium: {
//     width: '40px'
//   },
//   large: {
//     width: '48px'
//   }
// }

const InputIconToggleStyle = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;

  ${({ error, theme }) => error && css`
    color: ${theme.colors.error};
  `}
  ${({ warning, theme }) => warning && css`
    color: ${theme.colors.warning};
  `}
  ${({ info, theme }) => info && css`
    color: ${theme.colors.info};
  `}
  ${({ size }) => {
    if (size === 'small') return css`width: 32px;`;
    if (size === 'large') return css`width: 48px;`;
    return css`width: 40px;`;
  }}
`;

InputIconToggleStyle.defaultProps = {
  theme: BaseTheme,
  large: true
};

export default InputIconToggleStyle;

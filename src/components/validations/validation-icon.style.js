import styled, { css } from 'styled-components';
import BaseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';

const ValidationIconStyle = styled.div`
  color: ${({ type, theme }) => theme.colors[type]};
  display: flex;
  align-items: center;

  ${({ theme }) => {
    if (theme.name === THEMES.classic) {
      return css`
        margin-right: -2px;
        margin-top: -1px;

        .carbon-icon:before {
          font-size: 20px;
        }
      `;
    }
    return null;
  }}
`;

ValidationIconStyle.defaultProps = {
  type: 'error',
  theme: BaseTheme
};

export default ValidationIconStyle;

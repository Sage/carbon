import styled, { css } from 'styled-components';
import BaseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';
import { StyledIcon } from '../icon/icon.style';

const ValidationIconStyle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;

  ${StyledIcon}:before {
    color: ${({ type, theme }) => theme.colors[type]};
  }

  ${({ theme }) => {
    if (theme.name === THEMES.classic) {
      return css`
        margin-right: -2px;
        margin-top: -1px;

        ${StyledIcon}:before {
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

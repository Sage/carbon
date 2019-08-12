import styled, { css } from 'styled-components';
import BaseTheme from '../../style/themes/base';
import { isClassic } from '../../utils/helpers/style-helper';

const ValidationIconStyle = styled.div`
  color: ${({ type, theme }) => theme.colors[type]};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 5px;

  ${({ theme }) => isClassic(theme) && css`
    margin-right: -2px;
    margin-top: -1px;

    .carbon-icon:before {
      font-size: 20px;
    }
  `};
`;

ValidationIconStyle.defaultProps = {
  type: 'error',
  theme: BaseTheme
};

export default ValidationIconStyle;

import styled, { css } from 'styled-components';
import BaseTheme from '../../style/themes/base';
import StyledIcon from '../icon/icon.style';
import { isClassic } from '../../utils/helpers/style-helper';

const ValidationIconStyle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 5px;

  ${StyledIcon}:before {
    color: ${({ type, theme }) => theme.colors[type]};
  }

  ${({ theme }) => isClassic(theme) && css`
    margin-right: -2px;
    margin-top: -1px;

    ${StyledIcon}:before {
      font-size: 20px;
    }
  `}
`;

ValidationIconStyle.defaultProps = {
  type: 'error',
  theme: BaseTheme
};

export default ValidationIconStyle;

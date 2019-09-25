import styled, { css } from 'styled-components';
import BaseTheme from '../../style/themes/base';
import StyledIcon from '../icon/icon.style';
import { isClassic } from '../../utils/helpers/style-helper';

const ValidationIconStyle = styled.div`
  ${({ theme }) => css`
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 1px;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 8px;
    border: 0;
    outline: none;

    ${!isClassic(theme) && css`
      ${StyledIcon}:focus {
        outline: 2px solid ${theme.colors.focus};
      }
    `}

    ${StyledIcon}:before {
      color: ${({ validationType }) => theme.colors[validationType]};
    }

    ${isClassic(theme) && css`
      &:focus {
        outline: none;
      }

      ${StyledIcon}:before {
        font-size: 20px;
      }
    `}
  `}
`;

ValidationIconStyle.defaultProps = {
  validationType: 'error',
  theme: BaseTheme,
  showOutline: true
};

export default ValidationIconStyle;

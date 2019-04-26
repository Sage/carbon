import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  height: 47px;
  font-weight: 900;

  input:checked ~ & {
    color: ${theme.colors.white};
    background-color: #1573e6;
  }

  input:focus ~ & {
    outline: 0;
  }  
  
  &:hover {
    border-color: #1e499f;
    color: ${theme.colors.white};
    background-color: #1e499f;
  }

  ${({ size }) => size === 'small' && css`
    height: auto;
    padding: 5px 8px;
    font-weight: 700;
    font-size: 12px;
  `};

  ${({ size, buttonIcon, buttonIconSize }) => buttonIcon && size === 'large' && buttonIconSize === 'large' && css`
    height: auto;
    padding-top: 15px;
    padding-bottom: 15px;
  `};
`;

import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const StyledButtonToggleClassicLabel = ({ theme }) => theme.name === THEMES.classic && css`
  height: auto;
  min-width: auto;
  padding: 15px 25px;
  font-weight: 900;
  border: 1px solid #ccd6db;

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

    .carbon-button-toggle__button-icon {
      margin-right: 3px;
    }
  `};
`;

const StyledButtonToggleClassicIcon = ({ theme }) => theme.name === THEMES.classic && css`
  display: inline;

  ${({ buttonIconSize }) => buttonIconSize === 'large' && css`
    display: block;

    .carbon-icon {
      margin-bottom: 0;
    }
  `};

  ${({ buttonIcon, buttonIconSize }) => buttonIcon && buttonIconSize === 'large' && css`
      margin-right: 3px;
  `};
`;

export {
  StyledButtonToggleClassicLabel,
  StyledButtonToggleClassicIcon
};

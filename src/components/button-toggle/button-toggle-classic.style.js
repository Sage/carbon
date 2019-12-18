import { css } from 'styled-components';
import StyledIcon from '../icon/icon.style';
import { isClassic } from '../../utils/helpers/style-helper';

const StyledButtonToggleClassicLabel = ({ theme }) => isClassic(theme) && css`
  height: auto;
  min-width: auto;
  padding: 15px 25px;
  font-weight: 900;
  border: 1px solid #ccd6db;

  input:checked ~ & {
    color: ${theme.colors.white};
    background-color: #1573e6;

    ${StyledIcon} {
      color: ${theme.colors.white};
    }
  }

  input:focus ~ & {
    outline: 0;
  }  
  
  &:hover {
    border-color: #1e499f;
    color: ${theme.colors.white};
    background-color: #1e499f;

    ${StyledIcon} {
      color: ${theme.colors.white};
    }
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

const iconFontSizes = {
  smallIcon: 16,
  largeIcon: 60
};

function applyIconStyle(id) {
  return `
    font-size: ${`${iconFontSizes[id]}px`};
    line-height: ${`${iconFontSizes[id]}px`};
  `;
}

const StyledButtonToggleClassicIcon = ({ theme }) => isClassic(theme) && css`
  display: inline;

  ${({ buttonIconSize }) => buttonIconSize === 'large' && css`
    display: block;

    ${StyledIcon} {
      margin-bottom: 0;
      ::before {
        ${applyIconStyle(`${buttonIconSize}Icon`)}
      }
    }

    ${buttonIconSize === 'large' && css`
      .carbon-icon__svg--credit-card-slash {
        margin-left: 10px;
      }
    `}
  `};

  ${({ buttonIcon, buttonIconSize }) => buttonIcon && buttonIconSize === 'large' && css`
      margin-right: 3px;
  `};
`;

export {
  StyledButtonToggleClassicLabel,
  StyledButtonToggleClassicIcon
};

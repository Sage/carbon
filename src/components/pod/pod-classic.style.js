import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledIcon from '../icon/icon.style';
import StyledLink from '../link/link.style';

const blockBackgrounds = {
  primary: 'white',
  secondary: '#f2f5f6',
  tertiary: '#e6ebed',
  transparent: 'transparent',
  tile: 'white'
};

const styledBlockClassic = ({
  theme, podTheme, contentTriggersEdit, isHovered, isFocused, internalEditButton
}) => isClassic(theme)
  && css`
    background-color: ${blockBackgrounds[podTheme]};
    border: 1px solid #ccd6db;
    ${({ noBorder }) => noBorder && 'border: none'};

    ${() => {
    if (isHovered || isFocused) {
      if (internalEditButton) {
        return podTheme === 'tile' ? 'background-color: transparent' : '';
      }

      if (contentTriggersEdit) {
        return css`
            background-color: #004b87;
            * {
              color: white;
            }
          `;
      }

      return 'background-color: #d9e0e4';
    }
    return '';
  }}
  `;

const styledHeaderClassic = ({ theme }) => isClassic(theme) && 'margin-bottom: 15px';

const styledFooterClassic = ({ theme, podTheme }) => isClassic(theme)
  && css`
    background-color: #f2f5f6;
    ${podTheme === 'tile' && 'border-top: 1px solid #ccd6db'};
  `;

const editBackgrounds = {
  primary: 'white',
  secondary: '#f2f5f6',
  tertiary: '#e6ebed',
  transparent: 'transparent',
  tile: 'white'
};

const styledEditActionClassic = ({
  theme, podTheme, isHovered, isFocused, internalEditButton
}) => isClassic(theme)
  && css`
  && {
    background-color: ${editBackgrounds[podTheme]};
    border-color: ccd6db;
    margin-left: 2px;
    border-radius: 4px;
    color: #255bc7;

    ${(isHovered || isFocused)
      && !internalEditButton
      && css`
        background-color: #004b87;
        color: white;

        ${StyledLink},
        ${StyledIcon} {
          color: white;
        }
      `}
  }
  `;

export {
  styledBlockClassic, styledHeaderClassic, styledEditActionClassic, styledFooterClassic
};

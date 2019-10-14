import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';

const blockBackgrounds = {
  primary: 'white',
  secondary: '#f2f5f6',
  tertiary: '#e6ebed',
  transparent: 'transparent',
  tile: 'white'
};

const styledBlockClassic = ({
  theme, podTheme, contentTriggersEdit, isHovered, internalEditButton
}) => isClassic(theme)
  && css`
    background-color: ${blockBackgrounds[podTheme]};
    border: 1px solid #ccd6db;

    ${() => {
    if (isHovered) {
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
  theme, podTheme, isHovered, internalEditButton
}) => isClassic(theme)
  && css`
    background-color: ${editBackgrounds[podTheme]};
    border-color: ccd6db;
    margin-left: 2px;
    border-radius: 4px;
    color: #255bc7;

    ${isHovered
      && !internalEditButton
      && css`
        background-color: #004b87;
        color: white;

        [data-component='icon'] {
          color: white;
        }
      `}
  `;

export { styledBlockClassic, styledEditActionClassic, styledFooterClassic };

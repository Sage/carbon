import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledIcon from '../icon/icon.style';

const blockBackgrounds = {
  primary: 'white',
  secondary: '#f2f5f6',
  tertiary: '#e6ebed',
  transparent: 'transparent',
  tile: 'white'
};

const styledBlockClassic = ({
  theme, podType, contentTriggersEdit, isHovered, isFocused, internalEditButton, noBorder
}) => isClassic(theme) && css`
  background-color: ${blockBackgrounds[podType]};
  border: 1px solid #ccd6db;

  ${noBorder && 'border: none'};

  ${(isHovered || isFocused) && css`
    background-color: #d9e0e4;
    ${internalEditButton && podType === 'tile' && 'background-color: transparent;'}
    ${contentTriggersEdit && css`
      background-color: #004b87;
      * {
        color: white;
      }
    `}
  `}
`;

const styledHeaderClassic = ({ theme }) => isClassic(theme) && 'margin-bottom: 15px';

const styledFooterClassic = ({ theme, podType }) => isClassic(theme)
  && css`
    background-color: #f2f5f6;
    ${podType === 'tile' && 'border-top: 1px solid #ccd6db'};
  `;

const editBackgrounds = {
  primary: 'white',
  secondary: '#f2f5f6',
  tertiary: '#e6ebed',
  transparent: 'transparent',
  tile: 'white'
};

const styledEditActionClassic = ({
  theme, podType, isHovered, isFocused, internalEditButton
}) => isClassic(theme) && css`
  background-color: ${editBackgrounds[podType]};
  border-color: ccd6db;
  margin-left: 2px;
  border-radius: 4px;
  color: #255bc7;

  ${(isHovered || isFocused) && !internalEditButton && css`
    background-color: #004b87;
    color: white;

    ${StyledIcon},
    ${StyledIcon}:hover,
    a:hover ${StyledIcon},
    button:hover ${StyledIcon} {
      color: white;
    }
  `}
`;

export {
  styledBlockClassic, styledHeaderClassic, styledEditActionClassic, styledFooterClassic
};

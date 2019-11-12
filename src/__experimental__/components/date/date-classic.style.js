import { css } from 'styled-components';
import { isClassic } from '../../../utils/helpers/style-helper';
import InputPresentationStyle from '../input/input-presentation.style';
import InputIconToggleStyle from '../input-icon-toggle/input-icon-toggle.style';
import StyledIcon from '../../../components/icon/icon.style';

const dateClassicStyle = ({ theme }) => isClassic(theme) && css`
  & ${InputPresentationStyle} {
    width: 125px;
    
    &:focus {
      & ${InputIconToggleStyle} {
        background-color: #1e499f;
        border-color: #1e499f;
      }
      ${StyledIcon} {
        color: #FFFFFF;
      }
    }
    &:hover {
      & ${InputIconToggleStyle} {
        background-color: #255BC7;
        border-color: #255BC7; 
      }
      ${StyledIcon} {
        color: #FFFFFF;
      }
    }
  }

  &&& ${InputIconToggleStyle} {
    border-left: 1px solid #bfccd2;
    box-sizing: border-box;
    width: 31px;
    &:hover {
      background-color: #1e499f;
      border-color: #1e499f;  
      ${StyledIcon} {
        color: #FFFFFF;
      }
    }
  }
  
`;

export default dateClassicStyle;

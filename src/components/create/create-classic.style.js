import { css } from 'styled-components';
import StyledIcon from '../icon/icon.style';
import { isClassic } from '../../utils/helpers/style-helper';

export default ({ theme }) => isClassic(theme) && css`
  border: 1px dashed #99adb6;
  background-color: transparent;
    
  ${StyledIcon}::before {
    font-size: 16px;
  }

  :hover{
    background: #fff;
  }

  :focus {
    color: #255BC7;
    border: 1px dashed #99adb6;
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import LabelStyle from '../label/label.style';
import InputPresentationStyle from '../input/input-presentation.style';
import InputStyle from '../input/input.style';

export default ({
  theme, type
}) => theme.name === THEMES.classic && css`
  background-color: #e6ebed;
  border-left: 1px solid #bfccd2;
  box-sizing: border-box;
  color: #003349;
  cursor: pointer;
  margin-right: -5.5px;
  width: ${type === 'dropdown' ? '20px' : '31px'};

  ${InputPresentationStyle}:hover &,
  ${LabelStyle}:hover + ${InputPresentationStyle} & {
    background-color: #1963f6;
    border-color: #1963f6;
    color: #fff;
  }

  ${InputStyle}:focus ~ & {
    background-color: #004b87;
    border-color: #004b87;
    color: #fff;
  }
`;

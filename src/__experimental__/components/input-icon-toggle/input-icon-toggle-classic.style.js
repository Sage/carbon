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
  margin-right: -6.5px;
  width: ${type === 'dropdown' ? '20px' : '31px'};

  ${InputPresentationStyle}:hover &,
  ${LabelStyle}:hover + ${InputPresentationStyle} & {
    background-color: ${theme.colors.hover};
    border-color: ${theme.colors.hover};
    color: #fff;
  }

  ${InputStyle}:focus ~ &,
  ${InputPresentationStyle} &:hover {
    background-color: ${theme.colors.focus};
    border-color: ${theme.colors.focus};
    color: #fff;
  }
`;

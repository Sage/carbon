import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import LabelStyle from '../label/label.style';
import InputPresentationStyle from '../input/input-presentation.style';
import InputStyle from '../input/input.style';

export default ({
  theme, type
}) => theme.name === THEMES.classic && css`
  background-color: ${theme.colors.iconBackground};
  border-left: 1px solid ${theme.colors.iconBorder};
  box-sizing: border-box;
  color: ${theme.colors.iconColor};
  cursor: pointer;
  margin-right: -5.5px;
  width: ${type === 'dropdown' ? '20px' : '31px'};

  ${InputPresentationStyle}:hover &,
  ${LabelStyle}:hover + ${InputPresentationStyle} & {
    background-color: ${theme.colors.iconHover};
    border-color: ${theme.colors.iconHover};
    color: ${theme.colors.iconColorAlt};
  }

  ${InputStyle}:focus ~ &,
  ${InputPresentationStyle} &:hover {
    background-color: ${theme.colors.iconFocus};
    border-color: ${theme.colors.iconFocus};
    color: ${theme.colors.iconColorAlt};
  }
`;

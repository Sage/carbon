import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import InputPresentationStyle from '../input/input-presentation.style';
import InputIconToggleStyle from '../input-icon-toggle/input-icon-toggle.style';

const dateClassicStyle = ({ theme }) => theme.name === THEMES.classic && css`
  & ${InputPresentationStyle} {
    width: 120px;
  }

  & ${InputIconToggleStyle} {
    border-left: 1px solid #bfccd2;
    box-sizing: border-box;
    margin-right: -7px;
    width: 31px;
  }
`;

export default dateClassicStyle;

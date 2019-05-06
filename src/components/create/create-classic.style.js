import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
        border: 1px dashed #99adb6;
        background-color: transparent;
        font-size: 14px;
`;

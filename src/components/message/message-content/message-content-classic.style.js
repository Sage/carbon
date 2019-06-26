import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import classicThemeColors from '../message-classic-theme-colors';

export default ({ theme, variant }) => theme.name === THEMES.classic && css`
     padding: 15px 20px;

    .carbon-content__title {
        color: ${classicThemeColors[variant].main};
    }
`;

import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import classicThemeColors from '../message-classic-theme-colors';

export default ({ theme, messageType }) => theme.name === THEMES.classic && css`
    .carbon-content__title {
        color: ${classicThemeColors[messageType].main};
    }
`;

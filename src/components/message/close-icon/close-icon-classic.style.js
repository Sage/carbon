import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import classicThemeColors from '../message-classic-theme-colors';

export default ({ theme, messageType }) => theme.name === THEMES.classic && css`
    background-color: ${classicThemeColors[messageType].backgroundColor};
`;

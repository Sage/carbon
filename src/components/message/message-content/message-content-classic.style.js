import { css } from 'styled-components';
import classicThemeColors from '../message-classic-theme-colors';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({ theme, variant }) => isClassic(theme) && css`
     padding: 15px 20px;

    .carbon-content__title {
        color: ${classicThemeColors[variant].main};
    }
`;

import { css } from 'styled-components';
import { THEMES } from '../../style/themes';


export default ({ theme }) => theme.name === THEMES.classic && css`
    color: rgba(0, 0, 0, 0.85);
`;

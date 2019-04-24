import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

const sidebarHeaderClassicStyle = ({ theme }) => theme.name === THEMES.classic && css`
    border-bottom: solid 4px #e4e9ec;
    box-shadow: none;
`;
export default sidebarHeaderClassicStyle;

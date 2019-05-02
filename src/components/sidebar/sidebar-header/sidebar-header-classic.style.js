import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

const sidebarHeaderClassicStyle = ({ theme }) => theme.name === THEMES.classic && css`
    border-bottom: solid 4px #e4e9ec;
    padding: 20px;
    font-size: 14px;
    font-weight: normal;
    box-shadow: none;
    color: rgba(0,0,0,.85);
    width: 100%;
    top: -20px;
    margin-left: -20px;

`;
export default sidebarHeaderClassicStyle;

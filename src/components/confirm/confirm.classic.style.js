import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import StyledButton from '../button/button.style';


export default ({ theme }) => theme.name === THEMES.classic && css`
    margin-top: 20px;

    ${StyledButton} {
        margin-left: 10px;
    }
`;

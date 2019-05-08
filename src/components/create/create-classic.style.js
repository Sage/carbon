import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
    border: 1px dashed #99adb6;
    background-color: transparent;
    
    .carbon-icon::before {
        font-size:16px;
    }

    :hover{
        background: #fff;
    }

    :focus {
        color: #255BC7;
        border: 1px dashed #99adb6;
        outline: -webkit-focus-ring-color auto 5px;
    }
`;

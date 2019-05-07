import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const sidebarClassicStyle = ({ theme }) => theme.name === THEMES.classic && css`
    background-color: #e6ebed;
    padding: 20px;
    
    ${({ position }) => position === 'right' && css`
        border-left: 1px solid #ccd6db;
        box-shadow: -10px 0 15px rgba(0,0,0,.05);
        right: 0;
    `}

    ${({ position }) => position === 'left' && css`
        border-right: 1px solid #ccd6db;
        box-shadow: 10px 0 15px rgba(0,0,0,.05);
        left: 0;
    `}
`;

const sidebarCloseClassicStyle = ({ theme }) => theme.name === THEMES.classic && css`
    color: rgba(0, 0, 0, 0.85);
    top: 15px;
    
    &:hover {
        color: #255BC7;
    };
`;

export { sidebarClassicStyle, sidebarCloseClassicStyle };

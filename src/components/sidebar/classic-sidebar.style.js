import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const sidebarClassicStyle = ({ theme }) => theme.name === THEMES.classic && css`
    background-color: #e6ebed;

     ${({ position }) => position === 'right' && css`
         border-left: 1px solid #ccd6db;
    `};

    ${({ position }) => position === 'left' && css`
        border-right: 1px solid #ccd6db;
    `};
`;

const sidebarCloseClassicStyle = ({ theme }) => theme.name === THEMES.classic && css`
    color: rgba(0, 0, 0, 0.85);

    &:hover {
        color: #255BC7;
    };
`;

export { sidebarClassicStyle, sidebarCloseClassicStyle };

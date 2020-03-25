import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledIconButton from '../icon-button/icon-button.style';

const sidebarClassicStyle = ({ theme }) => isClassic(theme) && css`
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

    ${StyledIconButton} {
      top: 15px;
    }
`;

export default sidebarClassicStyle;

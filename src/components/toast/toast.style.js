import styled from 'styled-components';
import { classicToastStyle, classicToastTypeStyle } from './toast-classic.style';

const ToastStyle = styled.div`
    ${classicToastStyle};
`;

const ToastTypeStyle = styled.div`
    ${classicToastTypeStyle}
`;

export { ToastStyle, ToastTypeStyle };

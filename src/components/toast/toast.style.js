import styled from 'styled-components';
import { classicToastStyle, classicToastTypeStyle, classicToastContentStyle } from './toast-classic.style';

const ToastStyle = styled.div`
    ${classicToastStyle};
`;

const ToastTypeStyle = styled.div`
    ${classicToastTypeStyle};
`;

const ToastContentStyle = styled.div`
    ${classicToastContentStyle};
`;

export { ToastStyle, ToastTypeStyle, ToastContentStyle };

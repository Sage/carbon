import styled from 'styled-components';
import { classicToastStyle, classicToastTypeStyle, classicToastContentStyle } from './toast-classic.style';
import MessageStyle from '../message/message.style';
import MessageContentStyle from '../message/message-content/message-content.style';
import TypeIcon from '../message/type-icon/type-icon.style';

const ToastStyle = styled(MessageStyle)`
margin-top: 30px;
position: fixed;
right: 30px;
top: 0;
${classicToastStyle}   

`;

const ToastTypeStyle = styled(TypeIcon)`
    ${classicToastTypeStyle};
`;

const ToastContentStyle = styled(MessageContentStyle)`
    ${({ isDismiss }) => (isDismiss ? 'padding-right:50px' : '')};

    ${classicToastContentStyle};
`;

export { ToastStyle, ToastTypeStyle, ToastContentStyle };

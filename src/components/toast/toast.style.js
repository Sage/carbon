import styled, { css } from 'styled-components';
import { classicToastStyle, classicToastTypeStyle, classicToastContentStyle } from './toast-classic.style';
import MessageStyle from '../message/message.style';
import MessageContentStyle from '../message/message-content/message-content.style';
import TypeIcon from '../message/type-icon/type-icon.style';

const ToastStyle = styled(MessageStyle)`
  width: 300px;
  margin-top: 30px;
  position: fixed;
  right: 30px;
  top: 0;
  box-shadow: 0 15px 20px 0 rgba(2,18,36, 0.2);

  ${classicToastStyle}   
`;

const ToastTypeStyle = styled(TypeIcon)`
    ${classicToastTypeStyle};
`;

const ToastContentStyle = styled(MessageContentStyle)`
    padding: 10px 20px 10px 20px;

    ${({ isDismiss }) => isDismiss && css`
        padding-right: 50px;
    `}

    ${classicToastContentStyle};
`;

export { ToastStyle, ToastTypeStyle, ToastContentStyle };

import styled, { css } from 'styled-components';
import {
  classicToastStyle,
  classicToastTypeStyle,
  classicToastContentStyle
} from './toast-classic.style';
import MessageStyle from '../message/message.style';
import MessageContentStyle from '../message/message-content/message-content.style';
import TypeIcon from '../message/type-icon/type-icon.style';
import { THEMES } from '../../style/themes';

const animationName = '.toast';
const ToastStyle = styled(MessageStyle)`
  width: 300px;
  margin-top: 30px;
  position: fixed;
  right: ${({ isCenter }) => (isCenter ? '50%' : '30px')};
  top: 0;
  box-shadow: 0 15px 20px 0 rgba(2, 18, 36, 0.2);
  transform:  ${({ isCenter }) => (isCenter ? 'translateX(50%)' : '')}; 

  ${({ theme }) => theme.name !== THEMES.classic && css`
    &${animationName}-appear,
    &${animationName}-enter {
      opacity: 0;
      transform: ${({ isCenter }) => (isCenter ? 'translateX(50%) scale(0) ' : 'scale(0)')};
    }

    &${animationName}-appear.toast-appear-active,
    &${animationName}-enter.toast-enter-active {
      opacity: 1;
      transform: ${({ isCenter }) => (isCenter ? 'translateX(50%) scale(1)' : 'scale(1)')};
      transition: all 300ms 1000ms cubic-bezier(0.250, 0.250, 0.000, 1.500);
    }

    &${animationName}-leave.toast-leave-active {
      opacity: 0;
      margin-top: -30px;
      transition: all 300ms cubic-bezier(0.960, -0.335, 0.750, 0.750);
    }
  `}
  
  ${classicToastStyle}
`;

const ToastTypeStyle = styled(TypeIcon)`
  ${classicToastTypeStyle};
`;

const ToastContentStyle = styled(MessageContentStyle)`
  padding: 10px 20px 10px 20px;
  
  ${({ isDismiss }) => isDismiss
    && css`
      padding-right: 50px;
    `}

  ${classicToastContentStyle};
`;

export { ToastStyle, ToastTypeStyle, ToastContentStyle };

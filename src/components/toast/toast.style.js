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
  box-shadow: 0 10px 30px 0 rgba(0,20,29,.1), 0 30px 60px 0 rgba(0,20,29,.1);
  line-height: 21px;
  margin-top: 30px;
  max-width: 300px;
  position: fixed;
  right: ${({ isCenter }) => (isCenter ? '50%' : '30px')};
  top: 0;
  transform:  ${({ isCenter }) => (isCenter ? 'translateX(50%)' : '')}; 

  ${({ theme }) => theme.name !== THEMES.classic && css`
    &${animationName}-appear,
    &${animationName}-enter {
      opacity: 0;
      transform: ${({ isCenter }) => (isCenter ? 'translateX(50%) scale(0.5)' : 'scale(0.5)')};
    }

    &${animationName}-appear.toast-appear-active,
    &${animationName}-enter.toast-enter-active {
      opacity: 1;
      transform: ${({ isCenter }) => (isCenter ? 'translateX(50%) scale(1) translateY(0)' : 'scale(1)')};
      transition: all 300ms cubic-bezier(0.250, 0.250, 0.000, 1.500);
    }

    &${animationName}-leave.toast-leave-active {
      opacity: 0;
      transform: translateY(-20px) translateX(50%);
      transition: all 150ms ease-out;
    }
  `}
  
  ${classicToastStyle}
`;

const ToastTypeStyle = styled(TypeIcon)`
  ${classicToastTypeStyle};
`;

const ToastContentStyle = styled(MessageContentStyle)`
  padding: 8px 16px 8px 16px;
  
  ${({ isDismiss }) => isDismiss
    && css`
      padding-right: 48px;
    `}

  ${classicToastContentStyle};
`;

export { ToastStyle, ToastTypeStyle, ToastContentStyle };

import styled, { css } from "styled-components";

import MessageStyle from "../message/message.style";
import MessageContentStyle from "../message/message-content/message-content.style";
import TypeIcon from "../message/type-icon/type-icon.style";
import StyledIconButton from "../icon-button/icon-button.style";
import Portal from "../portal/portal";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const StyledPortal = styled(Portal)<{
  align?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  isCenter?: boolean;
  isNotice?: boolean;
}>`
  ${({ theme, isCenter, isNotice, align, alignY }) => css`
    position: fixed;
    top: 0;

    z-index: ${theme.zIndex.notification};

    ${isCenter &&
    css`
      margin-left: 50%;
      transform: translateX(-50%);
    `}

    ${align === "left" &&
    css`
      left: 0;
      transform: translateX(50%);
    `}

    ${align === "center" &&
    css`
      margin-left: 50%;
      transform: translateX(-50%);
    `}

    ${align === "right" &&
    css`
      right: 0;
      transform: translateX(-50%);
    `}

    ${isNotice &&
    css`
      bottom: 0;
      top: auto;
      width: 100%;
    `}    

    ${alignY === "top" &&
    css`
      top: 0;
      bottom: auto;
    `}

    ${alignY === "center" &&
    css`
      top: 50%;
      transform: translate(${align === "left" ? "50%" : "-50%"}, -50%);
    `}

    ${alignY === "bottom" &&
    css`
      bottom: 0;
      top: auto;
      display: flex;
      flex-direction: column-reverse;
    `}
  `}
`;

StyledPortal.defaultProps = {
  theme: baseTheme,
};

const animationName = ".toast";
const alternativeAnimationName = ".toast-alternative";
const ToastStyle = styled(MessageStyle)<{
  align?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  maxWidth?: string;
  isCenter?: boolean;
  isNotice?: boolean;
  isNotification?: boolean;
}>`
  ${({ maxWidth, isCenter, align, isNotification, alignY, isNotice }) => css`
    box-shadow: 0 10px 30px 0 rgba(0, 20, 29, 0.1),
      0 30px 60px 0 rgba(0, 20, 29, 0.1);
    line-height: 22px;
    margin-top: ${(alignY === "top" && isNotice) || alignY === "center"
      ? "0"
      : "30px"};
    margin-bottom: ${alignY === "bottom" && !isNotice ? "30px" : "0"};
    max-width: ${!maxWidth ? "300px" : maxWidth};
    position: relative;
    margin-right: ${isCenter || align === "right" ? "auto" : "30px"};
    margin-left: ${isCenter || align === "left" ? "auto" : "30px"};

    ${isNotification &&
    css`
      border: 1px solid var(--colorsSemanticInfo500);
    `}
  `}

  :focus {
    outline: none;
  }

  &${animationName}-appear, &${animationName}-enter {
    opacity: 0;
    transform: scale(0.5);
  }

  &${animationName}-appear${animationName}-appear-active,
    &${animationName}-enter${animationName}-enter-active {
    opacity: 1;
    transform: ${({ isCenter }) =>
      isCenter ? " scale(1) translateY(0)" : "scale(1)"};
    transition: all 300ms cubic-bezier(0.25, 0.25, 0, 1.5);
  }

  &${animationName}-exit${animationName}-exit-active {
    opacity: 0;

    ${({ alignY }) =>
      alignY === "bottom" ? "margin-bottom: -40px" : "margin-top: -40px"};
    transition: all 150ms ease-out;
  }

  ${StyledIconButton} {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }

  ${({ isNotice, alignY }) =>
    isNotice &&
    css`
      background-color: var(--colorsUtilityMajor400);
      border: none;
      color: var(--colorsSemanticNeutralYang100);
      margin-right: 0;
      max-width: 100%;

      ${StyledIconButton} {
        right: 55px;
      }

      ${StyledIconButton} ${StyledIcon} {
        color: var(--colorsSemanticNeutralYang100);
      }

      &${alternativeAnimationName}-appear, &${alternativeAnimationName}-enter {
        ${alignY === "top" ? "top: -40px" : "bottom: -40px"};
        opacity: 0;
      }

      &${alternativeAnimationName}-exit {
        ${alignY === "top" ? "top: 0" : "bottom: 0"};
        opacity: 1;
      }

      &${alternativeAnimationName}-appear${alternativeAnimationName}-appear-active,
        &${alternativeAnimationName}-enter${alternativeAnimationName}-enter-active {
        ${alignY === "top" ? "top: 0" : "bottom: 0"};
        opacity: 1;
        transition: all 400ms ease;
      }

      &${alternativeAnimationName}-exit${alternativeAnimationName}-exit-active {
        ${alignY === "top" ? "top: -40px" : "bottom: -40px"};
        opacity: 0;
        transition: all 200ms ease;
      }
    `}
`;

const ToastContentStyle = styled(MessageContentStyle)<{
  isNotice?: boolean;
  isDismiss?: boolean;
}>`
  padding: 8px 16px 8px 16px;

  ${({ isNotice }) =>
    isNotice &&
    css`
      display: flex;
      align-items: center;
      padding: 11px 40px;
    `}

  ${({ isDismiss, isNotice }) =>
    isDismiss &&
    css`
      padding-right: ${isNotice ? "88px" : "48px"};
    `}
`;

const ToastWrapper = styled.div<{
  align?: "left" | "center" | "right";
  isCenter?: boolean;
  isNotice?: boolean;
}>`
  ${({ align }) =>
    align &&
    css`
      position: relative;
      width: auto;
      height: auto;
      justify-content: ${align};
      display: flex;
    `}

  ${({ isCenter }) =>
    isCenter &&
    css`
      position: relative;
      width: auto;
      height: auto;
      justify-content: center;
      display: flex;
    `}

  ${({ isNotice }) =>
    isNotice &&
    css`
      display: block;
    `}
`;

export { ToastStyle, TypeIcon, ToastContentStyle, ToastWrapper, StyledPortal };

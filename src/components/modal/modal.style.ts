import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";

const backgroundOpacity = "0.6";

type TransitionProps = {
  transitionTime: number;
};

const StyledModalBackground = styled.div<TransitionProps>`
  background-color: rgba(0, 20, 29, 0.6);
  bottom: 0;
  left: 0;
  opacity: ${backgroundOpacity};
  position: fixed;
  right: 0;
  top: 0;

  ${({ transitionTime }) => css`
    &.modal-background-enter,
    .modal-background-appear {
      opacity: 0;
    }

    &.modal-background-enter.modal-background-enter-active,
    &.modal-background-appear.modal-background-appear-active {
      opacity: ${backgroundOpacity};
      transition: opacity ${transitionTime}ms ease-out;
    }

    &.modal-background-exit {
      opacity: ${backgroundOpacity};
    }

    &.modal-background-exit.modal-background-exit-active {
      opacity: 0;
      transition: opacity ${transitionTime}ms 100ms ease-out;
    }
  `};
`;

const StyledModal = styled.div<
  TransitionProps & { topModalOverride?: boolean }
>`
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: ${({ theme, topModalOverride }) =>
    `${topModalOverride ? theme.zIndex.notification : theme.zIndex.modal}`};

  ${({ transitionTime }) => css`
    .fade-enter,
    .fade-appear {
      opacity: 0;
    }

    .fade-enter.fade-enter-active,
    .fade-appear.fade-appear-active {
      opacity: 1;
      transition: all ${transitionTime}ms 100ms ease-out;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit.fade-exit-active {
      opacity: 0;
      transition: all ${transitionTime}ms ease-out;
    }

    .slide-from-left-enter {
      visibility: hidden;
      position: absolute;
      left: -100%;
    }

    .slide-from-left-enter.slide-from-left-enter-active {
      visibility: visible;
      left: 0;
      transition: all ${transitionTime}ms ease;
    }

    .slide-from-left-exit {
      visibility: visible;
      position: relative;
      left: 0;
    }

    .slide-from-left-exit.slide-from-left-exit-active {
      visibility: hidden;
      left: -100%;
      transition: all ${transitionTime}ms ease;
    }

    .slide-from-right-enter {
      visibility: hidden;
      position: absolute;
      left: 100%;
    }

    .slide-from-right-enter.slide-from-right-enter-active {
      visibility: visible;
      left: 0;
      transition: all ${transitionTime}ms ease;
    }

    .slide-from-right-exit {
      visibility: visible;
      position: relative;
      left: 0;
    }

    .slide-from-right-exit.slide-from-right-exit-active {
      visibility: hidden;
      left: 100%;
      transition: all ${transitionTime}ms ease;
    }
  `}
`;

StyledModal.defaultProps = {
  theme: baseTheme,
};
export { StyledModal, StyledModalBackground };

import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";

const backgroundOpacity = "0.6";

const StyledModalBackground = styled.div`
  background-color: rgba(0, 20, 29, 0.6);
  bottom: 0;
  left: 0;
  opacity: ${backgroundOpacity};
  position: fixed;
  right: 0;
  top: 0;

  ${({ transitionName, transitionTime }) => css`
    &.${transitionName}-enter, .${transitionName}-appear {
      opacity: 0;
    }

    &.${transitionName}-enter.${transitionName}-enter-active,
      &.${transitionName}-appear.${transitionName}-appear-active {
      opacity: ${backgroundOpacity};
      transition: opacity ${transitionTime}ms ease-out;
    }

    &.${transitionName}-exit {
      opacity: ${backgroundOpacity};
    }

    &.${transitionName}-exit.${transitionName}-exit-active {
      opacity: 0;
      transition: opacity ${transitionTime}ms 100ms ease-out;
    }
  `};
`;

const StyledModal = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.modal};

  ${({ transitionName, transitionTime }) => css`
    .${transitionName}-enter, .${transitionName}-appear {
      opacity: 0;
    }

    .${transitionName}-enter.${transitionName}-enter-active,
      .${transitionName}-appear.${transitionName}-appear-active {
      opacity: 1;
      transition: all ${transitionTime}ms 100ms ease-out;
    }

    .${transitionName}-exit {
      opacity: 1;
    }

    .${transitionName}-exit.${transitionName}-exit-active {
      opacity: 0;
      transition: all ${transitionTime}ms ease-out;
    }
  `}
`;

StyledModal.defaultProps = {
  theme: baseTheme,
};
export { StyledModal, StyledModalBackground };

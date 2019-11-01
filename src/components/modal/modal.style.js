import styled, { css } from 'styled-components';

const backgroundOpacity = '0.6';
const backgroundAnimationLength = '300ms';
const initialPosition = '50px';
const animationLength = '300ms';

const StyledModalBackground = styled.div`
  background-color: rgba(0, 20, 29, 0.6);
  bottom: 0;
  left: 0;
  opacity: ${backgroundOpacity};
  position: fixed;
  right: 0;
  top: 0;

  ${({ transitionName }) => css`
    .${transitionName}-enter,
    .${transitionName}-appear {
      opacity: 0;
    }

    .${transitionName}-enter.${transitionName}-enter-active,
    .${transitionName}-appear.${transitionName}-appear-active {
      opacity: ${backgroundOpacity};
      transition: opacity ${backgroundAnimationLength} ease-out;
    }

    .${transitionName}-leave {
      opacity: ${backgroundOpacity};
    }

    .${transitionName}-leave.${transitionName}-leave-active {
      opacity: 0;
      transition: opacity ${backgroundAnimationLength} 100ms ease-out;
    }
  `}
`;

const StyledModal = styled.div`
  ${({ transitionName }) => css`
    .${transitionName}-enter,
    .${transitionName}-appear {
      opacity: 0;
      margin-top: ${initialPosition};
    }

    .${transitionName}-enter.${transitionName}-enter-active,
    .${transitionName}-appear.${transitionName}-appear-active {
      opacity: 1;
      margin-top: 0;
      transition: all ${animationLength} 100ms ease-out;
    }

    .${transitionName}-leave {
      opacity: 1;
      margin-top: 0;
    }

    .${transitionName}-leave.${transitionName}-leave-active {
      opacity: 0;
      margin-top: ${initialPosition};
      transition: all ${animationLength} ease-out;
    }
  `}
`;

export { StyledModal, StyledModalBackground };

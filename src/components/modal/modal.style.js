import styled from 'styled-components';

const backgroundOpacity = '0.6';
const backgroundAnimationLength = '300ms';
const initialPosition = '50px';
const animationLength = '300ms';
const backgroundTransitionName = 'modal-background';
const modalTransitionName = 'modal';

const StyledModalBackground = styled.div`
  background-color: #F2F5F6;
  bottom: 0;
  left: 0;
  opacity: ${backgroundOpacity};
  position: fixed;
  right: 0;
  top: 0;

  .${backgroundTransitionName}-enter,
  .${backgroundTransitionName}-appear {
    opacity: 0;
  }

  .${backgroundTransitionName}-enter.${backgroundTransitionName}-enter-active,
  .${backgroundTransitionName}-appear.${backgroundTransitionName}-appear-active {
    opacity: ${backgroundOpacity};
    transition: opacity ${backgroundAnimationLength} ease-out;
  }

  .${backgroundTransitionName}-leave {
    opacity: ${backgroundOpacity};
  }

  .${backgroundTransitionName}-leave.${backgroundTransitionName}-leave-active {
    opacity: 0;
    transition: opacity ${backgroundAnimationLength} 100ms ease-out;
  }
`;

const StyledModal = styled.div`
  .${modalTransitionName}-enter,
  .${modalTransitionName}-appear {
    opacity: 0;
    margin-top: ${initialPosition};
  }

  .${modalTransitionName}-enter.${modalTransitionName}-enter-active,
  .${modalTransitionName}-appear.${modalTransitionName}-appear-active {
    opacity: 1;
    margin-top: 0;
    transition: all ${animationLength} 100ms ease-out;
  }

  .${modalTransitionName}-leave {
    opacity: 1;
    margin-top: 0;
  }

  .${modalTransitionName}-leave.${modalTransitionName}-leave-active {
    opacity: 0;
    margin-top: ${initialPosition};
    transition: all ${animationLength} ease-out;
  }
`;

export { StyledModal, StyledModalBackground };

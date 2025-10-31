import styled, { keyframes } from "styled-components";

const animateStar = keyframes`
  0% {
    transform: translate3d(0px, 0px, 0px) scale(0.3);
    opacity: 0;
  }
  10% {
    transform: translate3d(0px, 0px, 0px) scale(0.3);
    opacity: 0;
  }
  20% {
    transform: translate3d(0px, 0px, 0px) scale(0.6);
    opacity: 1;
  }
  35% {
    transform: translate3d(0px, 0px, 0px) scale(0.6);
    opacity: 1;
  }
  55% {
    transform: translate3d(16px, -12px, 0px) scale(1.4);
    opacity: 1;
  }
  60% {
    transform: translate3d(16px, -12px, 0px) scale(1.4);
    opacity: 1;
  }
  90% {
    transform: translate3d(0px, -24px, 0px) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate3d(0px, -24px, 0px) scale(0.6);
    opacity: 0;
  }
`;

const animateStopTop = keyframes`
  0% { stop-color: #13a038; }
  10% { stop-color: #13a038; }
  50% { stop-color: #0092db; }
  90% { stop-color: #8f49fe; }
  100% { stop-color: #8f49fe; }
`;

const animateStopBottom = keyframes`
  0% { stop-color: #13a038; }
  10% { stop-color: #13a038; }
  50% { stop-color: #13a038; }
  90% { stop-color: #0092db; }
  100% { stop-color: #0092db; }
`;

const time = "3s";

export const StyledStarSVG = styled.svg`
  animation: ${animateStar} ${time} ease-in-out forwards infinite;
  height: var(--sizing200);
  opacity: 0;
  width: var(--sizing200);
`;

export const GradientStopTop = styled.stop`
  animation: ${animateStopTop} ${time} ease-in-out forwards infinite;
`;

export const GradientStopBottom = styled.stop`
  animation: ${animateStopBottom} ${time} ease-in-out forwards infinite;
`;

export const StyledLoaderStarContainer = styled.div`
  bottom: 0;
  height: var(--sizing200);
  left: 0;
  position: absolute;
  width: var(--sizing200);

  &.star-1 {
    .ai-star-path {
      fill: url(#gradient1);
    }

    ${StyledStarSVG} {
      animation-delay: -2s;
    }

    #gradient1 {
      ${GradientStopTop} {
        animation-delay: -2s;
      }
      ${GradientStopBottom} {
        animation-delay: -2s;
      }
    }
  }

  &.star-2 {
    .ai-star-path {
      fill: url(#gradient2);
    }

    ${StyledStarSVG} {
      animation-delay: -1s;
    }

    #gradient2 {
      ${GradientStopTop} {
        animation-delay: -1s;
      }
      ${GradientStopBottom} {
        animation-delay: -1s;
      }
    }
  }

  &.star-3 {
    .ai-star-path {
      fill: url(#gradient3);
    }

    ${StyledStarSVG} {
      animation-delay: 0s;
    }

    #gradient3 {
      ${GradientStopTop} {
        animation-delay: 0s;
      }
      ${GradientStopBottom} {
        animation-delay: 0s;
      }
    }
  }
`;

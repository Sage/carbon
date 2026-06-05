import styled, { keyframes } from "styled-components";

const star1Scale = keyframes`
  0% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 1, 1);
  }
  10.5% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  21% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 0, 0.83, 0);
  }
  63.1% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 0.83, 1);
  }
  84.1% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  94.6% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0, 0, 0.83, 0);
  }
  100% {
    transform: scale(0);
  }
`;

const star2Scale = keyframes`
  0% { transform: scale(0); }
  10.5% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 1, 1);
  }
  21% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  31.5% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 0, 0.83, 0);
  }
  70.1% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 0.83, 1);
  }
  84.1% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  99.9% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0, 0, 0.83, 0);
  }
  100% { transform: scale(0); }
`;

const star3Scale = keyframes`
  0% { transform: scale(0); }
  21% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 1, 1);
  }
  31.5% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  42% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 0, 0.83, 0);
  }
  73.6% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 0.83, 1);
  }
  84.1% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  99.9% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0, 0, 0.83, 0);
  }
  100% { transform: scale(0); }
`;

const star4Scale = keyframes`
  0% { transform: scale(0); }
  31.4% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 1, 1);
  }
  41.9% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  52.4% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0, 0, 0.83, 0);
  }
  100% { transform: scale(0); }
`;

const star5Scale = keyframes`
  0% { transform: scale(0); }
  42% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 1, 1);
  }
  52.6% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  63.1% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0, 0, 0.83, 0);
  }
  100% { transform: scale(0); }
`;

const star6Scale = keyframes`
  0% { transform: scale(0); }
  52.6% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0.17, 1, 1, 1);
  }
  63.1% {
    transform: scale(1.1);
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
  73.6% {
    transform: scale(0);
    animation-timing-function: cubic-bezier(0, 0, 0.83, 0);
  }
  100% { transform: scale(0); }
`;

const duration = "4.55s";

const starScaleStyles = `
  transform-box: fill-box;
  transform-origin: center center;
`;

export const StyledLoaderStarRoot = styled.div`
  position: relative;
  display: inline-block;
  width: 35px;
  height: 35px;
`;

export const StyledStarSVG = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

export const StyledStar1Scale = styled.path`
  ${starScaleStyles}
  animation: ${star1Scale} ${duration} linear infinite;
`;

export const StyledStar2Scale = styled.path`
  ${starScaleStyles}
  animation: ${star2Scale} ${duration} linear infinite;
`;

export const StyledStar3Scale = styled.path`
  ${starScaleStyles}
  animation: ${star3Scale} ${duration} linear infinite;
`;

export const StyledStar4Scale = styled.path`
  ${starScaleStyles}
  animation: ${star4Scale} ${duration} linear infinite;
`;

export const StyledStar5Scale = styled.path`
  ${starScaleStyles}
  animation: ${star5Scale} ${duration} linear infinite;
`;

export const StyledStar6Scale = styled.path`
  ${starScaleStyles}
  animation: ${star6Scale} ${duration} linear infinite;
`;

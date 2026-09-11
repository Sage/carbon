import styled, { css, keyframes } from "styled-components";

const star1Scale = keyframes`
  0% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  10.6% { transform: scale(1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  21.2% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 0, 0.83, 0); }
  62.8% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 1, 0.83, 1); }
  83.9% { transform: scale(1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  94.5% { transform: scale(0); animation-timing-function: cubic-bezier(0, 0, 0.83, 0); }
  100% { transform: scale(0); }
`;

const star2Scale = keyframes`
  0%, 10.6% { transform: scale(0); }
  10.6% { animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  21.2% { transform: scale(1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  31.4% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 0, 0.83, 0); }
  69.7% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 1, 0.83, 1); }
  83.9% { transform: scale(1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  99.6%, 100% { transform: scale(0); animation-timing-function: cubic-bezier(0, 0, 0.83, 0); }
`;

const star3Scale = keyframes`
  0%, 21.2% { transform: scale(0); }
  21.2% { animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  31.4% { transform: scale(1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  42% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 0, 0.83, 0); }
  73.4% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 1, 0.83, 1); }
  83.9% { transform: scale(0.9); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  99.6%, 100% { transform: scale(0); animation-timing-function: cubic-bezier(0, 0, 0.83, 0); }
`;

const star4Scale = keyframes`
  0%, 31.4% { transform: scale(0); }
  31.4% { animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  42% { transform: scale(1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  52.6%, 100% { transform: scale(0); animation-timing-function: cubic-bezier(0, 0, 0.83, 0); }
`;

const star5Scale = keyframes`
  0%, 42% { transform: scale(0); }
  42% { animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  52.6% { transform: scale(1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  62.8%, 100% { transform: scale(0); animation-timing-function: cubic-bezier(0, 0, 0.83, 0); }
`;

const star6Scale = keyframes`
  0%, 52.6% { transform: scale(0); }
  52.6% { animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  62.8% { transform: scale(1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  73.4%, 100% { transform: scale(0); animation-timing-function: cubic-bezier(0, 0, 0.83, 0); }
`;

interface StarScaleProps {
  $animationTime: number;
  $hasMotion?: boolean;
}

const starScaleStyles = (
  animation: ReturnType<typeof keyframes>,
) => css<StarScaleProps>`
  fill: white;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${animation} ${({ $animationTime }) => $animationTime}s linear
    infinite;
  animation-play-state: ${({ $hasMotion }) =>
    $hasMotion ? "running" : "paused"};
  animation-delay: ${({ $animationTime, $hasMotion }) =>
    $hasMotion ? "0s" : `-${$animationTime * 0.84}s`};
`;

export const StyledLoaderStarRoot = styled.div`
  display: inline-block;
  height: var(--global-size-s);
  position: relative;
  width: var(--global-size-s);
`;

export const StyledStarSVG = styled.svg`
  height: 100%;
  inset: 0;
  overflow: visible;
  position: absolute;
  width: 100%;
`;

export const StyledStar1Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(star1Scale)}
`;
export const StyledStar2Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(star2Scale)}
`;
export const StyledStar3Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(star3Scale)}
`;
export const StyledStar4Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(star4Scale)}
`;
export const StyledStar5Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(star5Scale)}
`;
export const StyledStar6Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(star6Scale)}
`;

import styled, { css, keyframes } from "styled-components";

const firstStarScale = keyframes`
  0% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  15.29% { transform: scale(1.1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  30.64%, 100% { transform: scale(0); }
`;

const starScale = keyframes`
  0% { transform: scale(0); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  15.29% { transform: scale(1.1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  30.64%, 100% { transform: scale(0); }
`;

const lastStarScale = keyframes`
  0% { transform: scale(0); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  14.79% { transform: scale(1.1); animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); }
  24.03%, 100% { transform: scale(0); }
`;

interface StarScaleProps {
  $animationTime: number;
  $hasMotion?: boolean;
}

const starScaleStyles = (
  animation: ReturnType<typeof keyframes>,
  delay = 0,
) => css<StarScaleProps>`
  transform: scale(0);
  transform-box: fill-box;
  transform-origin: center;
  ${({ $animationTime, $hasMotion }) =>
    $hasMotion
      ? css`
          animation: ${animation} ${$animationTime}s linear infinite;
          animation-delay: ${($animationTime ??
            /* istanbul ignore next */ 3.159) * delay}s;
        `
      : css`
          animation: none;
          opacity: 1;
          transform: scale(1);
        `}
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
  ${starScaleStyles(firstStarScale)}
`;
export const StyledStar2Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(starScale, 0.1529)}
`;
export const StyledStar3Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(starScale, 0.3061)}
`;
export const StyledStar4Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(starScale, 0.4536)}
`;
export const StyledStar5Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(starScale, 0.6068)}
`;
export const StyledStar6Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(lastStarScale, 0.7597)}
`;

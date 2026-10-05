import styled, { css, keyframes } from "styled-components";

const star1Scale = keyframes`
  0% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  15.29% { transform: scale(1.1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  30.64%, 100% { transform: scale(0); }
`;

const star2Scale = keyframes`
  0%, 15.29% { transform: scale(0); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  30.64% { transform: scale(1.1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  45.36%, 100% { transform: scale(0); }
`;

const star3Scale = keyframes`
  0%, 30.61% { transform: scale(0); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  45.36% { transform: scale(1.1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  60.68%, 100% { transform: scale(0); }
`;

const star4Scale = keyframes`
  0%, 45.35% { opacity: 0; transform: scale(0); }
  45.36% { opacity: 1; transform: scale(0); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  60.68% { opacity: 1; transform: scale(1.1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  75.69%, 100% { opacity: 1; transform: scale(0); }
`;

const star5Scale = keyframes`
  0%, 60.67% { opacity: 0; transform: scale(0); }
  60.68% { opacity: 1; transform: scale(0); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  75.97% { opacity: 1; transform: scale(1.1); animation-timing-function: cubic-bezier(1, 0, 0, 1); }
  90.76%, 100% { opacity: 1; transform: scale(0); }
`;

const star6Scale = keyframes`
  0%, 75.96% { opacity: 0; transform: scale(0); }
  75.97% { opacity: 1; transform: scale(0); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  90.76% { opacity: 1; transform: scale(1.1); animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); }
  100% { opacity: 1; transform: scale(0.117); }
`;

interface StarScaleProps {
  $animationTime: number;
  $hasMotion?: boolean;
}

const starScaleStyles = (
  animation: ReturnType<typeof keyframes>,
) => css<StarScaleProps>`
  transform-box: fill-box;
  transform-origin: center;
  ${({ $animationTime, $hasMotion }) =>
    $hasMotion
      ? css`
          animation: ${animation} ${$animationTime}s linear infinite;
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

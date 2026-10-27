import styled, { css, keyframes } from "styled-components";

const firstStarScale = keyframes`
  0% { transform: scale(0); animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  15.29% { transform: scale(1.1); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  30.64%, 100% { transform: scale(0); }
`;

const secondStarScale = keyframes`
  0%, 15.29% { transform: scale(0); }
  15.29% { animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  30.64% { transform: scale(1.1); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  45.36%, 100% { transform: scale(0); }
`;

const thirdStarScale = keyframes`
  0%, 30.61% { transform: scale(0); }
  30.61% { animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  45.36% { transform: scale(1.1); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  60.68%, 100% { transform: scale(0); }
`;

const fourthStarScale = keyframes`
  0% { transform: scale(0); opacity: 1; animation-timing-function: cubic-bezier(0.17, 1, 0.83, 1); }
  15.32% { transform: scale(1.1); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  30.33%, 100% { transform: scale(0); opacity: 1; }
`;

const fifthStarScale = keyframes`
  0% { transform: scale(0); opacity: 1; animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  15.29% { transform: scale(1.1); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  30.07%, 100% { transform: scale(0); opacity: 1; }
`;

const sixthStarScale = keyframes`
  0% { transform: scale(0); opacity: 1; animation-timing-function: cubic-bezier(0.17, 1, 1, 1); }
  14.79% { transform: scale(1.1); animation-timing-function: cubic-bezier(0.78, 0, 0.22, 1); }
  24.03%, 100% { transform: scale(0.117); opacity: 1; animation-timing-function: ease-in-out; }
`;

interface StarScaleProps {
  $animationTime: number;
  $hasMotion?: boolean;
}

const starScaleStyles = (
  animation: ReturnType<typeof keyframes>,
  delay = 0,
  hideUntilReveal = false,
) => css<StarScaleProps>`
  transform: scale(0);
  transform-box: fill-box;
  transform-origin: center;
  ${({ $animationTime, $hasMotion }) =>
    $hasMotion
      ? css`
          opacity: ${hideUntilReveal ? 0 : 1};
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
  ${starScaleStyles(secondStarScale)}
`;
export const StyledStar3Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(thirdStarScale)}
`;
export const StyledStar4Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(fourthStarScale, 0.4536, true)}
`;
export const StyledStar5Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(fifthStarScale, 0.6068, true)}
`;
export const StyledStar6Scale = styled.path<StarScaleProps>`
  ${starScaleStyles(sixthStarScale, 0.7597, true)}
`;

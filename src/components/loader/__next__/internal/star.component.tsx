import React from "react";

import {
  StyledLoaderStarRoot,
  StyledStar1Scale,
  StyledStar2Scale,
  StyledStar3Scale,
  StyledStar4Scale,
  StyledStar5Scale,
  StyledStar6Scale,
  StyledStarSVG,
} from "./star.style";

const SMALL_STAR_PATH =
  "M 3.53 -0.69 C 4.16 -0.44 4.16 0.44 3.53 0.69 L 1.79 1.38 C 1.6 1.45 1.45 1.6 1.38 1.79 L 0.69 3.53 C 0.44 4.16 -0.44 4.16 -0.69 3.53 L -1.38 1.79 C -1.45 1.6 -1.6 1.45 -1.79 1.38 L -3.53 0.69 C -4.16 0.44 -4.16 -0.44 -3.53 -0.69 L -1.79 -1.38 C -1.6 -1.45 -1.45 -1.6 -1.38 -1.79 L -0.69 -3.53 C -0.44 -4.16 0.44 -4.16 0.69 -3.53 L 1.38 -1.79 C 1.45 -1.6 1.6 -1.45 1.79 -1.38 L 3.53 -0.69 Z";
const MEDIUM_STAR_PATH =
  "M 5.29 -1.04 L 2.69 -2.06 C 2.4 -2.18 2.18 -2.4 2.06 -2.69 L 1.04 -5.29 C 0.67 -6.24 -0.67 -6.24 -1.04 -5.29 L -2.06 -2.69 C -2.18 -2.4 -2.4 -2.18 -2.69 -2.06 L -5.29 -1.04 C -6.24 -0.67 -6.24 0.67 -5.29 1.04 L -2.69 2.06 C -2.4 2.18 -2.18 2.4 -2.06 2.69 L -1.04 5.29 C -0.67 6.24 0.67 6.24 1.04 5.29 L 2.06 2.69 C 2.18 2.4 2.4 2.18 2.69 2.06 L 5.29 1.04 C 6.24 0.67 6.24 -0.67 5.29 -1.04 Z";
const LARGE_STAR_PATH =
  "M 8.82 -1.73 L 4.48 -3.44 C 4.01 -3.63 3.63 -4.01 3.44 -4.48 L 1.73 -8.82 C 1.11 -10.39 -1.11 -10.39 -1.73 -8.82 L -3.44 -4.48 C -3.63 -4.01 -4.01 -3.63 -4.48 -3.44 L -8.82 -1.73 C -10.39 -1.11 -10.39 1.11 -8.82 1.73 L -4.48 3.44 C -4.01 3.63 -3.63 4.01 -3.44 4.48 L -1.73 8.82 C -1.11 10.39 1.11 10.39 1.73 8.82 L 3.44 4.48 C 3.63 4.01 4.01 3.63 4.48 3.44 L 8.82 1.73 C 10.39 1.11 10.39 -1.11 8.82 -1.73 Z";

interface StarProps {
  animationTime: number;
  gradientId: string;
  hasMotion?: boolean;
  maskId: string;
}

const Star = ({
  animationTime,
  gradientId,
  hasMotion,
  maskId,
}: StarProps): JSX.Element => (
  <StyledLoaderStarRoot data-component="star" role="presentation">
    <StyledStarSVG
      data-role="sparkle-svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          data-role="star-gradient"
          id={gradientId}
          x1="8"
          y1="29.856"
          x2="24"
          y2="2.144"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            data-role="sparkle-gradient-stop"
            offset="0%"
            stopColor="var(--mode-color-ai-alt-stop-1)"
          />
          <stop
            data-role="sparkle-gradient-stop"
            offset="40%"
            stopColor="var(--mode-color-ai-alt-stop-2)"
          />
          <stop
            data-role="sparkle-gradient-stop"
            offset="90%"
            stopColor="var(--mode-color-ai-alt-stop-3)"
          />
        </linearGradient>
        <mask data-role="star-mask" id={maskId}>
          <g transform="translate(26.25 27.63)">
            <StyledStar4Scale
              data-role="sparkle-star"
              d={SMALL_STAR_PATH}
              $animationTime={animationTime}
              $hasMotion={hasMotion}
            />
          </g>
          <g transform="translate(11.88 18.99)">
            <StyledStar5Scale
              data-role="sparkle-star"
              d={LARGE_STAR_PATH}
              $animationTime={animationTime}
              $hasMotion={hasMotion}
            />
          </g>
          <g transform="translate(24.5 6.62)">
            <StyledStar6Scale
              data-role="sparkle-star"
              d={MEDIUM_STAR_PATH}
              $animationTime={animationTime}
              $hasMotion={hasMotion}
            />
          </g>
          <g transform="translate(5.5 27.81)">
            <StyledStar1Scale
              data-role="sparkle-star"
              d={SMALL_STAR_PATH}
              $animationTime={animationTime}
              $hasMotion={hasMotion}
            />
          </g>
          <g transform="translate(20.63 18.93)">
            <StyledStar2Scale
              data-role="sparkle-star"
              d={LARGE_STAR_PATH}
              $animationTime={animationTime}
              $hasMotion={hasMotion}
            />
          </g>
          <g transform="translate(7.62 6)">
            <StyledStar3Scale
              data-role="sparkle-star"
              d={MEDIUM_STAR_PATH}
              $animationTime={animationTime}
              $hasMotion={hasMotion}
            />
          </g>
        </mask>
      </defs>
      <rect
        width="32"
        height="32"
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
      />
    </StyledStarSVG>
  </StyledLoaderStarRoot>
);

Star.displayName = "Star";
export default Star;

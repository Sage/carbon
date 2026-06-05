import React from "react";

import {
  StyledLoaderStarRoot,
  StyledStarSVG,
  StyledStar1Scale,
  StyledStar2Scale,
  StyledStar3Scale,
  StyledStar4Scale,
  StyledStar5Scale,
  StyledStar6Scale,
} from "./star.style";

// Sparkle paths centered at (0,0); each group is translated to its position.
// Path shapes and positions sourced from the SparkleAltV3a Lottie export.
const SMALL_STAR_PATH =
  "M 3.53 -0.69 C 4.16 -0.44 4.16 0.44 3.53 0.69 L 1.79 1.38 C 1.6 1.45 1.45 1.6 1.38 1.79 L 0.69 3.53 C 0.44 4.16 -0.44 4.16 -0.69 3.53 L -1.38 1.79 C -1.45 1.6 -1.6 1.45 -1.79 1.38 L -3.53 0.69 C -4.16 0.44 -4.16 -0.44 -3.53 -0.69 L -1.79 -1.38 C -1.6 -1.45 -1.45 -1.6 -1.38 -1.79 L -0.69 -3.53 C -0.44 -4.16 0.44 -4.16 0.69 -3.53 L 1.38 -1.79 C 1.45 -1.6 1.6 -1.45 1.79 -1.38 L 3.53 -0.69 Z";
const LARGE_STAR_PATH =
  "M 8.82 -1.73 L 4.48 -3.44 C 4.01 -3.63 3.63 -4.01 3.44 -4.48 L 1.73 -8.82 C 1.11 -10.39 -1.11 -10.39 -1.73 -8.82 L -3.44 -4.48 C -3.63 -4.01 -4.01 -3.63 -4.48 -3.44 L -8.82 -1.73 C -10.39 -1.11 -10.39 1.11 -8.82 1.73 L -4.48 3.44 C -4.01 3.63 -3.63 4.01 -3.44 4.48 L -1.73 8.82 C -1.11 10.39 1.11 10.39 1.73 8.82 L 3.44 4.48 C 3.63 4.01 4.01 3.63 4.48 3.44 L 8.82 1.73 C 10.39 1.11 10.39 -1.11 8.82 -1.73 Z";
const MEDIUM_STAR_PATH =
  "M 5.29 -1.04 L 2.69 -2.06 C 2.4 -2.18 2.18 -2.4 2.06 -2.69 L 1.04 -5.29 C 0.67 -6.24 -0.67 -6.24 -1.04 -5.29 L -2.06 -2.69 C -2.18 -2.4 -2.4 -2.18 -2.69 -2.06 L -5.29 -1.04 C -6.24 -0.67 -6.24 0.67 -5.29 1.04 L -2.69 2.06 C -2.4 2.18 -2.18 2.4 -2.06 2.69 L -1.04 5.29 C -0.67 6.24 0.67 6.24 1.04 5.29 L 2.06 2.69 C 2.18 2.4 2.4 2.18 2.69 2.06 L 5.29 1.04 C 6.24 0.67 6.24 -0.67 5.29 -1.04 Z";

const Star = (): JSX.Element => {
  return (
    <StyledLoaderStarRoot data-component="star" role="presentation">
      <StyledStarSVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35 35"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="star-gradient" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop
              offset="0%"
              stopColor="var(--mode-color-ai-alt-stop-1, #00D639)"
            />
            <stop
              offset="40%"
              stopColor="var(--mode-color-ai-alt-stop-2, #00D6DE)"
            />
            <stop
              offset="90%"
              stopColor="var(--mode-color-ai-alt-stop-3, #9D60FF)"
            />
          </linearGradient>
          <mask id="star-mask">
            {/* star-4: small, bottom-right */}
            <g transform="translate(27.75, 29.5)">
              <StyledStar4Scale fill="white" d={SMALL_STAR_PATH} />
            </g>
            {/* star-5: large, middle-left */}
            <g transform="translate(13.375, 20.6791)">
              <StyledStar5Scale fill="white" d={LARGE_STAR_PATH} />
            </g>
            {/* star-6: medium, top-right */}
            <g transform="translate(26, 7.5)">
              <StyledStar6Scale fill="white" d={MEDIUM_STAR_PATH} />
            </g>
            {/* star-1: small, bottom-left */}
            <g transform="translate(7.125, 29.5)">
              <StyledStar1Scale fill="white" d={SMALL_STAR_PATH} />
            </g>
            {/* star-2: large, middle-right */}
            <g transform="translate(22.125, 20.6791)">
              <StyledStar2Scale fill="white" d={LARGE_STAR_PATH} />
            </g>
            {/* star-3: medium, top-left */}
            <g transform="translate(9.125, 7.5)">
              <StyledStar3Scale fill="white" d={MEDIUM_STAR_PATH} />
            </g>
          </mask>
        </defs>
        <rect
          fill="url(#star-gradient)"
          width="35"
          height="35"
          mask="url(#star-mask)"
        />
      </StyledStarSVG>
    </StyledLoaderStarRoot>
  );
};

Star.displayName = "Star";
export default Star;

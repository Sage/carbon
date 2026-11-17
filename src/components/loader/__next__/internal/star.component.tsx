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
}

interface GradientProps {
  id: string;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  endColor: string;
}

const StarGradient = ({ id, x1, y1, x2, y2, endColor }: GradientProps) => (
  <linearGradient
    data-role="star-gradient"
    id={id}
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
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
    <stop data-role="sparkle-gradient-stop" offset="90%" stopColor={endColor} />
  </linearGradient>
);

const Star = ({
  animationTime,
  gradientId,
  hasMotion,
}: StarProps): JSX.Element => {
  const star2GradientId = `${gradientId}-2`;
  const star3GradientId = `${gradientId}-3`;
  const star4GradientId = `${gradientId}-4`;
  const star5GradientId = `${gradientId}-5`;
  const star6GradientId = `${gradientId}-6`;

  return (
    <StyledLoaderStarRoot data-component="star" role="presentation">
      <StyledStarSVG
        data-role="sparkle-svg"
        viewBox="0 0 35 35"
        aria-hidden="true"
      >
        <defs>
          <StarGradient
            id={star2GradientId}
            x1="-12.625"
            y1="8.321"
            x2="5.375"
            y2="-3.17896"
            endColor="var(--mode-color-ai-stop-3)"
          />
          <StarGradient
            id={star3GradientId}
            x1="-9.125"
            y1="6.5"
            x2="9.875"
            y2="-8"
            endColor="var(--mode-color-ai-stop-3)"
          />
          <StarGradient
            id={star4GradientId}
            x1="-30.25"
            y1="5.5"
            x2="6.75"
            y2="-29"
            endColor="var(--mode-color-ai-alt-stop-3)"
          />
          <StarGradient
            id={star5GradientId}
            x1="-7.8208"
            y1="-5.875"
            x2="15.6792"
            y2="13.625"
            endColor="var(--mode-color-ai-stop-3)"
          />
          <StarGradient
            id={star6GradientId}
            x1="-19.5"
            y1="-20.5"
            x2="3"
            y2="3"
            endColor="var(--mode-color-ai-stop-3)"
          />
        </defs>
        <g data-role="sparkle-star-group" transform="translate(7.125 29.5)">
          <StyledStar1Scale
            data-role="sparkle-star"
            d={SMALL_STAR_PATH}
            fill="var(--mode-color-ai-alt-stop-1)"
            $animationTime={animationTime}
            $hasMotion={hasMotion}
          />
        </g>
        <g data-role="sparkle-star-group" transform="translate(22.125 20.679)">
          <StyledStar2Scale
            data-role="sparkle-star"
            d={LARGE_STAR_PATH}
            fill={`url(#${star2GradientId})`}
            $animationTime={animationTime}
            $hasMotion={hasMotion}
          />
        </g>
        <g data-role="sparkle-star-group" transform="translate(9.125 7.5)">
          <StyledStar3Scale
            data-role="sparkle-star"
            d={MEDIUM_STAR_PATH}
            fill={`url(#${star3GradientId})`}
            $animationTime={animationTime}
            $hasMotion={hasMotion}
          />
        </g>
        <g data-role="sparkle-star-group" transform="translate(27.75 29.5)">
          <StyledStar4Scale
            data-role="sparkle-star"
            d={SMALL_STAR_PATH}
            fill={`url(#${star4GradientId})`}
            $animationTime={animationTime}
            $hasMotion={hasMotion}
          />
        </g>
        <g
          data-role="sparkle-star-group"
          transform="translate(3.375 30.679) rotate(-90) translate(10 10)"
        >
          <StyledStar5Scale
            data-role="sparkle-star"
            d={LARGE_STAR_PATH}
            fill={`url(#${star5GradientId})`}
            $animationTime={animationTime}
            $hasMotion={hasMotion}
          />
        </g>
        <g
          data-role="sparkle-star-group"
          transform="translate(20 13.5) rotate(-90) translate(6 6)"
        >
          <StyledStar6Scale
            data-role="sparkle-star"
            d={MEDIUM_STAR_PATH}
            fill={`url(#${star6GradientId})`}
            $animationTime={animationTime}
            $hasMotion={hasMotion}
          />
        </g>
      </StyledStarSVG>
    </StyledLoaderStarRoot>
  );
};

Star.displayName = "Star";
export default Star;

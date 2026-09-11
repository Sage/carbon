import React, { useContext, useRef } from "react";

import { LoaderProps } from "../loader.component";
import {
  StyledRingCircleSvg,
  StyledLoaderLabel,
  StyledRingLoaderWrapper,
  StyledRingArc,
  StyledRingRotator,
  StyledRingTrack,
} from "../loader.style";

import useLocale from "../../../../hooks/__internal__/useLocale";
import ButtonContext from "../../../button/__next__/button.context";
import guid from "../../../../__internal__/utils/helpers/guid";

const calculateDefaultAnimationTime = (
  animationTime: LoaderProps["animationTime"],
) => {
  if (animationTime) {
    return animationTime;
  }

  return 0.783;
};

const RingLoader = ({
  inverse,
  size,
  variant,
  hasMotion,
  isTracked,
  animationTime,
  loaderLabel,
  showLabel,
  isSuccess,
  isError,
}: LoaderProps) => {
  const locale = useLocale();
  const { isInsideButton } = useContext(ButtonContext);
  const generatedId = useRef(guid()).current;
  const gradientId = `loader-ring-gradient-${generatedId}`;

  const isAiRingVariant = variant === "ai-stacked" || variant === "ai-inline";
  const usesAiGradient = isAiRingVariant && !isSuccess && !isError;
  const ringVariant =
    isInsideButton || variant === "inline" || variant === "ai-inline"
      ? "inline"
      : "stacked";
  const ringSize = isInsideButton
    ? "extra-small"
    : size && ["extra-small", "small", "large"].includes(size)
      ? size
      : "medium";

  return (
    <StyledRingLoaderWrapper
      loaderVariant={ringVariant}
      data-role="ring-loader-container"
    >
      <StyledRingCircleSvg
        inverse={inverse}
        role="presentation"
        size={ringSize}
        variant={ringVariant}
        hasMotion={hasMotion}
        isTracked={isTracked}
        animationTime={calculateDefaultAnimationTime(animationTime)}
        viewBox="0 0 64 64"
        isSuccess={isSuccess}
        isError={isError}
        isGradientVariant={usesAiGradient}
      >
        {usesAiGradient && (
          <defs>
            <linearGradient
              data-role="ai-ring-gradient"
              id={gradientId}
              x1="4.3"
              y1="48"
              x2="59.7"
              y2="16"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--mode-color-ai-alt-stop-1)" />
              <stop offset="40%" stopColor="var(--mode-color-ai-alt-stop-2)" />
              <stop offset="90%" stopColor="var(--mode-color-ai-alt-stop-3)" />
            </linearGradient>
          </defs>
        )}
        <StyledRingTrack
          data-role="outer-arc"
          inverse={inverse}
          size={ringSize}
        />
        <StyledRingRotator
          data-role="ring-rotator"
          size={ringSize}
          hasMotion={hasMotion}
          isTracked={isTracked}
          animationTime={calculateDefaultAnimationTime(animationTime)}
        >
          <StyledRingArc
            data-role="inner-arc"
            pathLength="1"
            size={ringSize}
            inverse={inverse}
            hasMotion={hasMotion}
            isTracked={isTracked}
            animationTime={calculateDefaultAnimationTime(animationTime)}
            isSuccess={isSuccess}
            isError={isError}
            isGradientVariant={usesAiGradient}
            gradientId={usesAiGradient ? gradientId : undefined}
          />
        </StyledRingRotator>
      </StyledRingCircleSvg>
      {showLabel && (
        <StyledLoaderLabel
          inverse={inverse}
          data-role="loader-label"
          variant="span"
          loaderVariant={ringVariant}
          loaderType="ring"
          $size={ringSize}
          $isInsideButton={isInsideButton}
        >
          {loaderLabel || locale?.loader.loading()}
        </StyledLoaderLabel>
      )}
    </StyledRingLoaderWrapper>
  );
};

export default RingLoader;

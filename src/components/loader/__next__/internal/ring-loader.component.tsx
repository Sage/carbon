import React from "react";

import { LoaderProps } from "../loader.component";
import {
  StyledRingCircleSvg,
  StyledLoaderLabel,
  StyledRingLoaderWrapper,
  StyledGradientFill,
} from "../loader.style";

import useLocale from "../../../../hooks/__internal__/useLocale";

const calculateDefaultAnimationTime = (
  animationTime: LoaderProps["animationTime"],
) => {
  if (animationTime) {
    return animationTime;
  }

  return 0.8;
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

  const isAiRingVariant = variant === "ai-stacked" || variant === "ai-inline";
  const ringVariant =
    variant === "inline" || variant === "ai-inline" ? "inline" : "stacked";
  const ringSize =
    size && ["extra-small", "small", "large"].includes(size) ? size : "medium";

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
        viewBox="0 0 24 24"
        isSuccess={isSuccess}
        isError={isError}
        isGradientVariant={isAiRingVariant}
      >
        {isAiRingVariant && (
          <defs>
            <mask id="ai-ring-mask">
              <rect width="24" height="24" fill="black" />
              <circle data-role="gradient-mask-arc" />
            </mask>
          </defs>
        )}
        <circle data-role="outer-arc" />
        {isAiRingVariant ? (
          <foreignObject
            x="0"
            y="0"
            width="24"
            height="24"
            mask="url(#ai-ring-mask)"
          >
            <StyledGradientFill data-role="gradient-fill" />
          </foreignObject>
        ) : (
          <circle data-role="inner-arc" />
        )}
      </StyledRingCircleSvg>
      {showLabel && (
        <StyledLoaderLabel
          inverse={inverse}
          data-role="loader-label"
          variant="span"
          loaderVariant={ringVariant}
          loaderType="ring"
          $size={ringSize}
        >
          {loaderLabel || locale?.loader.loading()}
        </StyledLoaderLabel>
      )}
    </StyledRingLoaderWrapper>
  );
};

export default RingLoader;

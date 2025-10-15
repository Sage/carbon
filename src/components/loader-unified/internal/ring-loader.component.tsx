import React from "react";

import { LoaderProps } from "../loader.component";
import {
  StyledRingCircleSvg,
  StyledLoaderLabel,
  StyledRingLoaderWrapper,
} from "../loader.style";

import useLocale from "../../../hooks/__internal__/useLocale";

const calculateDefaultAnimationTime = (
  animationTime: LoaderProps["animationTime"],
) => {
  if (animationTime) {
    return animationTime;
  }

  return 1.6;
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
  isInsideButton,
  isActive,
}: LoaderProps) => {
  const locale = useLocale();

  const ringVariant =
    variant && ["stacked", "inline"].includes(variant) ? variant : "stacked";
  const ringSize =
    size && ["extra-small", "small", "large"].includes(size) ? size : "medium";

  return (
    <StyledRingLoaderWrapper
      loaderVariant={variant}
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
        isInsideButton={isInsideButton}
        isActive={isActive}
      >
        <circle data-role="outer-arc" />
        <circle data-role="inner-arc" />
      </StyledRingCircleSvg>

      {showLabel && (
        <StyledLoaderLabel
          inverse={inverse}
          data-role="ring-loader-label"
          variant="span"
          loaderVariant={ringVariant}
          loaderType="ring"
          size={ringSize}
        >
          {loaderLabel || locale?.loader.loading()}
        </StyledLoaderLabel>
      )}
    </StyledRingLoaderWrapper>
  );
};

export default RingLoader;

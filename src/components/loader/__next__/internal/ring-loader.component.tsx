import React from "react";

import { LoaderProps } from "../loader.component";
import {
  StyledRingCircleSvg,
  StyledLoaderLabel,
  StyledRingLoaderWrapper,
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
  isInsideTypicalButton,
  isInsideDestructiveButton,
  isInsidePrimaryButton,
}: LoaderProps & {
  isInsideTypicalButton?: boolean;
  isInsideDestructiveButton?: boolean;
  isInsidePrimaryButton?: boolean;
}) => {
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
        isInsideTypicalButton={isInsideTypicalButton}
        isInsideDestructiveButton={isInsideDestructiveButton}
        isInsidePrimaryButton={isInsidePrimaryButton}
        isSuccess={isSuccess}
        isError={isError}
      >
        <circle data-role="outer-arc" />
        <circle data-role="inner-arc" />
      </StyledRingCircleSvg>

      {showLabel && (
        <StyledLoaderLabel
          inverse={inverse}
          data-role="loader-label"
          variant="span"
          loaderVariant={ringVariant}
          loaderType="ring"
          size={ringSize}
          isInsideTypicalButton={isInsideTypicalButton}
          isInsideDestructiveButton={isInsideDestructiveButton}
          isInsidePrimaryButton={isInsidePrimaryButton}
        >
          {loaderLabel || locale?.loader.loading()}
        </StyledLoaderLabel>
      )}
    </StyledRingLoaderWrapper>
  );
};

export default RingLoader;

import React from "react";

import { LoaderProps } from "../loader.component";
import { StyledSpinnerCircleSvg, StyledSpinnerLabel } from "../loader.style";
import Locale from "../../../locales";

const calculateDefaultAnimationTime = (
  animationTime: LoaderProps["animationTime"],
  isGradientVariant: boolean,
) => {
  if (animationTime) {
    return animationTime;
  }
  return isGradientVariant ? 2 : 1;
};

const SpinnerLoader = ({
  size,
  variant,
  hasMotion,
  isTracked,
  animationTime,
  locale,
  showSpinnerLabel,
  spinnerLabel,
}: Omit<LoaderProps, "loaderType"> & {
  locale: Locale;
}) => {
  const isGradientVariant =
    variant === "gradient-white" || variant === "gradient-grey";
  const isLabelDark = variant !== "inverse" && variant !== "gradient-white";

  return (
    <>
      <StyledSpinnerCircleSvg
        role="presentation"
        size={size}
        variant={variant}
        hasMotion={hasMotion}
        isTracked={isTracked}
        isGradientVariant={isGradientVariant}
        animationTime={calculateDefaultAnimationTime(
          animationTime,
          isGradientVariant,
        )}
        viewBox="0 0 24 24"
      >
        <circle data-role="outer-arc" />
        <circle data-role="inner-arc" />
      </StyledSpinnerCircleSvg>
      {showSpinnerLabel && (
        <StyledSpinnerLabel
          data-role="visible-label"
          variant="span"
          fontWeight="400"
          size={size}
          color={
            isLabelDark
              ? "var(--colorsUtilityYin090);"
              : "var(--colorsActionMajorYang100);"
          }
          fontSize={
            size === "extra-large" ? "var(--sizing200)" : "var(--sizing175)"
          }
          lineHeight={
            size === "extra-large" ? "var(--sizing300)" : "var(--sizing250)"
          }
        >
          {spinnerLabel || locale?.loaderSpinner.loading()}
        </StyledSpinnerLabel>
      )}
    </>
  );
};

export default SpinnerLoader;

import React from "react";

import { LoaderProps } from "../loader.component";
import { InnerBar, OuterBar, StyledLoaderLabel } from "../loader.style";

import useLocale from "../../../../hooks/__internal__/useLocale";
import { getAnimationTime } from "./loader.utils";

const StandaloneLoader = ({
  size,
  variant,
  inverse,
  loaderLabel,
  showLabel,
  animationTime,
  hasMotion,
}: LoaderProps) => {
  const locale = useLocale();

  const standaloneVariant =
    variant === "typical" || variant === "ai" ? variant : "typical";
  const standaloneSize = size === "small" || size === "large" ? size : "medium";

  return (
    <>
      <OuterBar
        data-role="outer-bar"
        size={standaloneSize}
        variant={standaloneVariant}
        inverse={!!inverse}
      >
        <InnerBar
          data-role="inner-bar"
          size={standaloneSize}
          variant={standaloneVariant}
          inverse={!!inverse}
          animationTime={getAnimationTime(animationTime, 0.983)}
          hasMotion={hasMotion}
        />
      </OuterBar>

      {showLabel && (
        <StyledLoaderLabel
          inverse={inverse}
          data-role="loader-label"
          variant="span"
          loaderVariant={variant}
          loaderType="standalone"
          $size={size}
        >
          {loaderLabel || locale?.loader.loading()}
        </StyledLoaderLabel>
      )}
    </>
  );
};

export default StandaloneLoader;

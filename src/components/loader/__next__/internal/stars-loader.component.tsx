import React from "react";

import Star from "./star.component";
import {
  StyledStars,
  StyledLoaderLabel,
  StyledStarLoaderWrapper,
} from "../loader.style";
import useLocale from "../../../../hooks/__internal__/useLocale";
import { LoaderProps } from "../loader.component";
import { getAnimationTime, useGeneratedId } from "./loader.utils";

const StarsLoader = ({
  animationTime,
  hasMotion,
  loaderLabel,
  showLabel,
}: LoaderProps) => {
  const locale = useLocale();
  const generatedId = useGeneratedId();
  const resolvedAnimationTime = getAnimationTime(animationTime, 3.159);

  return (
    <StyledStarLoaderWrapper>
      <StyledStars>
        <Star
          animationTime={resolvedAnimationTime}
          gradientId={`loader-star-gradient-${generatedId}`}
          hasMotion={hasMotion}
        />
      </StyledStars>

      {showLabel && (
        <StyledLoaderLabel
          data-role="loader-label"
          variant="span"
          loaderType="star"
        >
          {loaderLabel || locale?.loader.loading()}
        </StyledLoaderLabel>
      )}
    </StyledStarLoaderWrapper>
  );
};

export default StarsLoader;

import React, { useRef } from "react";

import Star from "./star.component";
import {
  StyledStars,
  StyledLoaderLabel,
  StyledStarLoaderWrapper,
} from "../loader.style";
import useLocale from "../../../../hooks/__internal__/useLocale";
import { LoaderProps } from "../loader.component";
import guid from "../../../../__internal__/utils/helpers/guid";

const StarsLoader = ({
  animationTime = 4.55,
  hasMotion,
  loaderLabel,
  showLabel,
}: LoaderProps) => {
  const locale = useLocale();
  const generatedId = useRef(guid()).current;

  return (
    <StyledStarLoaderWrapper>
      <StyledStars>
        <Star
          animationTime={animationTime}
          gradientId={`loader-star-gradient-${generatedId}`}
          hasMotion={hasMotion}
          maskId={`loader-star-mask-${generatedId}`}
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

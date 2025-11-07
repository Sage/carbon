import React from "react";

import Star from "./star.component";
import {
  StyledStars,
  StyledLoaderLabel,
  StyledStarLoaderWrapper,
} from "../loader.style";
import useLocale from "../../../../hooks/__internal__/useLocale";
import { LoaderProps } from "../loader.component";

const StarsLoader = ({ loaderLabel, showLabel }: LoaderProps) => {
  const locale = useLocale();

  return (
    <StyledStarLoaderWrapper>
      <StyledStars>
        <Star starContainerClassName="star-1" gradientId="gradient1" />
        <Star starContainerClassName="star-2" gradientId="gradient2" />
        <Star starContainerClassName="star-3" gradientId="gradient3" />
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

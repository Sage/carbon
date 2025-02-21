import React from "react";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import {
  StyledLoaderStarWrapper,
  StyledLabel,
  StyledStars,
} from "./loader-star.style";
import useLocale from "../../hooks/__internal__/useLocale";
import useMediaQuery from "../../hooks/useMediaQuery";
import Star from "./internal/star.component";
import Typography from "../typography";

export interface LoaderStarProps extends TagProps {
  /**
   * The loaderStarLabel prop allows a specific label to be set.
   * This label will be present if the user has `reduce-motion` enabled and will also be available to assistive technologies.
   * By default the label will be `Loading...`.
   */
  loaderStarLabel?: string;
}
const LoaderStar = ({
  loaderStarLabel,
  ...rest
}: LoaderStarProps): JSX.Element => {
  const locale = useLocale();

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  const label = (
    <StyledLabel data-role="visible-label" variant="span" fontWeight="400">
      {loaderStarLabel || locale.loaderStar.loading()}
    </StyledLabel>
  );

  return (
    <StyledLoaderStarWrapper
      role="status"
      {...tagComponent("loader-star", rest)}
    >
      {reduceMotion ? (
        label
      ) : (
        <>
          <StyledStars>
            <Star starContainerClassName="star-1" gradientId="gradient1" />
            <Star starContainerClassName="star-2" gradientId="gradient2" />
            <Star starContainerClassName="star-3" gradientId="gradient3" />
          </StyledStars>
          <Typography data-role="hidden-label" variant="span" screenReaderOnly>
            {loaderStarLabel || locale.loaderStar.loading()}
          </Typography>
        </>
      )}
    </StyledLoaderStarWrapper>
  );
};

LoaderStar.displayName = "LoaderStar";
export default LoaderStar;

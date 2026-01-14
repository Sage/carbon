import React from "react";
import { MarginProps } from "styled-system";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../../hooks/__internal__/useLocale";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { filterStyledSystemMarginProps } from "../../../style/utils";

import { StyledLoader, StyledLabel } from "./loader.style";
import StandaloneLoader from "./internal/standalone-loader.component";
import RingLoader from "./internal/ring-loader.component";
import StarsLoader from "./internal/stars-loader.component";

type LOADER_VARIANTS = "typical" | "ai" | "stacked" | "inline";

type LOADER_SIZES = "extra-small" | "small" | "medium" | "large";

type LOADER_TYPES = "standalone" | "ring" | "star";

type CommonLoaderProps = {
  /** Specify a label for the loader*/
  loaderLabel?: string;
  /** Specify if the label should be visible or not */
  showLabel?: boolean;
  /** If set to `false` all motion will be suspended */
  hasMotion?: boolean;
  /** If set to `true` the animation type will become tracked, this is used specifically for when wait times are predictable */
  isTracked?: boolean;
  /** Specify a custom animation time for the loader */
  animationTime?: number;
  /** Toggle the inverse color scheme */
  inverse?: boolean;
  /** The loader type can be specified in order to change the loader */
  loaderType?: LOADER_TYPES;
  /** The size prop allows a specific size to be set ranging from `extra-small` to `large` */
  size?: LOADER_SIZES;
  /** Toggle between the different Loader variants */
  variant?: LOADER_VARIANTS;
  /** Enable the success state for the ring loader when it is tracked */
  isSuccess?: boolean;
  /** Enable the error state for the ring loader when it is tracked */
  isError?: boolean;
};

export type LoaderProps = MarginProps & TagProps & CommonLoaderProps;

const Loader = ({
  animationTime,
  hasMotion = true,
  isTracked = false,
  loaderLabel,
  showLabel = true,
  loaderType = "standalone",
  size,
  variant,
  inverse = false,
  isSuccess = false,
  isError = false,
  ...rest
}: LoaderProps) => {
  const l = useLocale();

  const allowMotion = useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  const loaderContent = (() => {
    switch (loaderType) {
      case "star":
        return StarsLoader({ loaderLabel, showLabel, loaderType });
      case "ring":
        return RingLoader({
          inverse,
          size,
          variant,
          hasMotion,
          isTracked,
          animationTime,
          loaderLabel,
          showLabel,
          loaderType,
          isSuccess,
          isError,
        });
      default:
        return StandaloneLoader({
          size,
          variant,
          inverse,
          loaderLabel,
          showLabel,
          loaderType,
          animationTime,
          hasMotion,
        });
    }
  })();

  return (
    <StyledLoader
      role="status"
      {...tagComponent("loader", rest)}
      {...filterStyledSystemMarginProps(rest)}
      {...(!showLabel && { "aria-label": loaderLabel || l.loader.loading() })}
    >
      {allowMotion ? (
        loaderContent
      ) : (
        <StyledLabel inverse={inverse}>
          {loaderLabel || l.loader.loading()}
        </StyledLabel>
      )}
    </StyledLoader>
  );
};

export default Loader;

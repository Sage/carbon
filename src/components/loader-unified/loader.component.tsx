import React from "react";
import { MarginProps } from "styled-system";

import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import useMediaQuery from "../../hooks/useMediaQuery";
import { filterStyledSystemMarginProps } from "../../style/utils";

import StyledLoader from "../loader/loader.style";
import StandaloneLoader from "./internal/standalone-loader.component";
import RingLoader from "./internal/ring-loader.component";
import StarsLoader from "./internal/stars-loader.component";

type LOADER_VARIANTS = "typical" | "ai" | "stacked" | "inline";

type LOADER_SIZES = "extra-small" | "small" | "medium" | "large";

type LOADER_TYPES = "standalone" | "ring" | "star";

type CommonLoaderProps = {
  isInsideTypicalButton?: boolean;
  isInsideDestructiveButton?: boolean;
  isInsidePrimaryButton?: boolean;
  loaderLabel?: string;
  showLabel?: boolean;
  hasMotion?: boolean;
  isTracked?: boolean;
  animationTime?: number;
  inverse?: boolean;
  loaderType?: LOADER_TYPES;
  size?: LOADER_SIZES;
  variant?: LOADER_VARIANTS;
  isSuccess?: boolean;
  isError?: boolean;
};

export type LoaderProps = MarginProps & TagProps & CommonLoaderProps;

export const Loader = ({
  animationTime,
  hasMotion = true,
  isTracked = false,
  loaderLabel,
  showLabel = true,
  loaderType = "standalone",
  size,
  variant,
  inverse = false,
  isInsideTypicalButton = false,
  isInsideDestructiveButton = false,
  isInsidePrimaryButton = false,
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
          isInsideTypicalButton,
          isInsideDestructiveButton,
          isInsidePrimaryButton,
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
      {allowMotion ? loaderContent : loaderLabel || l.loader.loading()}
    </StyledLoader>
  );
};

export default Loader;

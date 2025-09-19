import React from "react";
import { MarginProps } from "styled-system";

import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import useMediaQuery from "../../hooks/useMediaQuery";
import { filterStyledSystemMarginProps } from "../../style/utils";

import { StyledLoaderPlaceholder } from "./loader.style";
import StyledLoader from "../loader/loader.style";
import Typography from "../typography";
import DotsLoader from "./internal/dots-loader.component";
import BarsLoader from "./internal/bars-loader.component";
import SpinnerLoader from "./internal/spinner-loader.component";
import StarsLoader from "./internal/stars-loader.component";

type LOADER_VARIANTS =
  | "action"
  | "neutral"
  | "inverse"
  | "gradient-grey"
  | "gradient-white"
  | "default"
  | "gradient";

type LOADER_SIZES =
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";

export type LoaderSizes = LOADER_SIZES[number];
export type LoaderVariants = LOADER_VARIANTS[number];

export interface LoaderProps extends MarginProps, TagProps {
  size?: LoaderSizes;
  isInsideButton?: boolean;
  isActive?: boolean;
  variant?: LoaderVariants;
  loaderLabel?: string;
  spinnerLabel?: string;
  showSpinnerLabel?: boolean;
  hasMotion?: boolean;
  isTracked?: boolean;
  animationTime?: number;
  loaderStarLabel?: string;
  loaderType: "dots" | "bar" | "spinner" | "star";
}

export const Loader = ({
  animationTime,
  hasMotion = true,
  isActive = true,
  isInsideButton = false,
  isTracked = false,
  loaderLabel,
  loaderStarLabel,
  loaderType = "dots",
  showSpinnerLabel = true,
  size = "medium",
  spinnerLabel,
  variant = "default",
  ...rest
}: LoaderProps) => {
  const l = useLocale();

  const allowMotion = useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  if (allowMotion === undefined) {
    return <StyledLoaderPlaceholder />;
  }

  const loaderContent = (() => {
    switch (loaderType) {
      case "bar":
        return BarsLoader(size);
      case "star":
        return StarsLoader();
      case "spinner":
        return SpinnerLoader({
          size,
          variant,
          hasMotion,
          isTracked,
          animationTime,
          showSpinnerLabel,
          spinnerLabel,
          locale: l,
        });
      case "dots":
      default:
        return DotsLoader({ isActive, isInsideButton, size, variant });
    }
  })();

  return (
    <StyledLoader
      {...tagComponent("loader", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      {allowMotion ? (
        <div>
          {loaderContent}

          {loaderType !== "spinner" && (
            <Typography
              data-role="hidden-label"
              variant="span"
              screenReaderOnly
            >
              {loaderLabel || l.loader.loading()}
            </Typography>
          )}
        </div>
      ) : (
        loaderLabel || l.loader.loading()
      )}
    </StyledLoader>
  );
};

export default Loader;

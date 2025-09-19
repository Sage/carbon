import React from "react";
import { MarginProps } from "styled-system";

import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import useMediaQuery from "../../hooks/useMediaQuery";
import { filterStyledSystemMarginProps } from "../../style/utils";

import {
  InnerBar,
  OuterBar,
  StyledLoaderDot,
  StyledLoaderPlaceholder,
  StyledSpinnerCircleSvg,
  StyledSpinnerLabel,
  StyledStars,
} from "./loader.style";
import StyledLoader from "../loader/loader.style";
import Typography from "../typography";
import Star from "./internal/star.component";
import Locale from "../../locales";

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

const calculateDefaultAnimationTime = (
  animationTime: LoaderProps["animationTime"],
  isGradientVariant: boolean,
) => {
  if (animationTime) {
    return animationTime;
  }
  return isGradientVariant ? 2 : 1;
};

const Dots = ({
  isActive,
  isInsideButton,
  size,
  variant,
}: Pick<LoaderProps, "size" | "variant" | "isActive" | "isInsideButton">) => {
  return (
    <>
      {["#13A038", "#0092DB", "#8F49FE"].map((color) => (
        <StyledLoaderDot
          data-role="loader-square"
          key={color}
          backgroundColor={
            variant === "gradient"
              ? /* istanbul ignore next */ color
              : "var(--colorsActionMajor500)"
          }
          isActive={isActive}
          isInsideButton={isInsideButton}
          size={size}
          variant={variant}
        />
      ))}
    </>
  );
};

const Bars = (size: LoaderProps["size"]) => (
  <OuterBar data-role="outer-bar" size={size}>
    <InnerBar data-role="inner-bar" size={size} />
  </OuterBar>
);

const Stars = () => (
  <StyledStars>
    <Star starContainerClassName="star-1" gradientId="gradient1" />
    <Star starContainerClassName="star-2" gradientId="gradient2" />
    <Star starContainerClassName="star-3" gradientId="gradient3" />
  </StyledStars>
);

const renderSpinnerLabel = ({
  size,
  spinnerLabel,
  locale,
  variant,
}: {
  size: LoaderProps["size"];
  spinnerLabel: LoaderProps["spinnerLabel"];
  locale: Locale;
  variant: LoaderProps["variant"];
}) => {
  const isLabelDark = variant !== "inverse" && variant !== "gradient-white";

  return (
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
  );
};

const Spinner = ({
  size,
  variant,
  hasMotion,
  isTracked,
  animationTime,
  isGradientVariant,
}: Omit<LoaderProps, "loaderType"> & { isGradientVariant: boolean }) => (
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
);

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

  const RenderComponent = () => {
    if (loaderType === "bar") return Bars(size);
    if (loaderType === "star") return Stars();
    if (loaderType === "spinner") {
      const isGradientVariant =
        variant === "gradient-white" || variant === "gradient-grey";
      return Spinner({
        size,
        variant,
        hasMotion,
        isTracked,
        animationTime,
        isGradientVariant,
      });
    }
    // default to dots
    return Dots({ isActive, isInsideButton, size, variant });
  };

  return (
    <StyledLoader
      {...tagComponent("loader", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      {allowMotion ? (
        <div>
          <RenderComponent />

          {loaderType === "spinner" && showSpinnerLabel ? (
            renderSpinnerLabel({ size, spinnerLabel, locale: l, variant })
          ) : (
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

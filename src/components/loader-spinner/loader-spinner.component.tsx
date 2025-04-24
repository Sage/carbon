import React from "react";
import { MarginProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import {
  LoaderSpinnerSizes,
  LoaderSpinnerVariants,
} from "./loader-spinner.config";
import {
  StyledSpinnerWrapper,
  StyledLabel,
  StyledSpinnerCircleSvg,
} from "./loader-spinner.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import useMediaQuery from "../../hooks/useMediaQuery";
import Typography from "../typography";

export interface LoaderSpinnerProps extends MarginProps, TagProps {
  /**
   * Use the spinnerLabel prop to override the default `"Loading..."` label with
   * any custom string
   */
  spinnerLabel?: string;
  /**
   * The size prop allows a specific size to be set, ranging from
   * `extra-small` to `extra-large`
   */
  size?: LoaderSpinnerSizes;
  /**
   * If set to `false` no visual label will be displayed, however
   * a visually hidden label will still be available for assistive technologies
   */
  showSpinnerLabel?: boolean;
  /**
   * The variant prop can be used to change the appearance of the component.
   * Typically both the outer and inner spinner will change color,
   * however there will still be sufficient contrast between them
   */
  variant?: LoaderSpinnerVariants;
  /** If set to `false` all motion will be suspended */
  hasMotion?: boolean;
  /**
   * If set to `true` the animation type will become tracked, this is
   * used specifically for when wait times are predictable
   */
  isTracked?: boolean;
  /**
   * The total animation time (in seconds). Default animation is time `1` second.
   * For any gradient variants the default animation time is `2` seconds
   */
  animationTime?: number;
}

export const LoaderSpinner = ({
  spinnerLabel,
  size = "medium",
  showSpinnerLabel = true,
  variant = "action",
  isTracked = false,
  hasMotion = true,
  animationTime,
  ...rest
}: LoaderSpinnerProps) => {
  const locale = useLocale();

  const allowMotion = useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  if (allowMotion === undefined) {
    return null;
  }

  const isLabelDark = variant !== "inverse" && variant !== "gradient-white";

  const renderSpinnerLabel = (
    <StyledLabel
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
      {spinnerLabel || locale.loaderSpinner.loading()}
    </StyledLabel>
  );

  const isGradientVariant =
    variant === "gradient-white" || variant === "gradient-grey";

  const calculateDefaultAnimationTime = () => {
    if (animationTime) {
      return animationTime;
    }
    return isGradientVariant ? 2 : 1;
  };

  return (
    <StyledSpinnerWrapper
      size={size}
      role="status"
      {...tagComponent("loader-spinner", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      {allowMotion ? (
        <>
          <StyledSpinnerCircleSvg
            role="presentation"
            size={size}
            variant={variant}
            hasMotion={hasMotion}
            isTracked={isTracked}
            isGradientVariant={isGradientVariant}
            animationTime={calculateDefaultAnimationTime()}
            viewBox="0 0 24 24"
          >
            <circle data-role="outer-arc" />
            <circle data-role="inner-arc" />
          </StyledSpinnerCircleSvg>

          {showSpinnerLabel ? (
            renderSpinnerLabel
          ) : (
            <Typography
              data-role="hidden-label"
              variant="span"
              screenReaderOnly
            >
              {spinnerLabel || locale.loaderSpinner.loading()}
            </Typography>
          )}
        </>
      ) : (
        renderSpinnerLabel
      )}
    </StyledSpinnerWrapper>
  );
};

export default LoaderSpinner;

import React from "react";
import { MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import StyledLoader from "./loader.style";
import StyledLoaderSquare, {
  StyledLoaderSquareProps,
} from "./loader-square.style";

export interface LoaderProps
  extends Omit<StyledLoaderSquareProps, "backgroundColor">,
    MarginProps,
    TagProps {
  /** Toggle between the default variant and gradient variant */
  variant?: string;
  /** Specify a custom accessible name for the Loader component */
  "aria-label"?: string;
}

export const Loader = ({
  variant = "default",
  "aria-label": ariaLabel,
  size = "medium",
  isInsideButton,
  isActive = true,
  ...rest
}: LoaderProps) => {
  const l = useLocale();

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  const loaderSquareProps = {
    isInsideButton,
    isActive,
    size,
    variant,
  };

  // FE-6368 has been raised for the below, changed hex values for design tokens (when added)
  return (
    <StyledLoader
      aria-label={ariaLabel || l.loader.loading()}
      role="progressbar"
      {...tagComponent("loader", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      {reduceMotion ? (
        l.loader.loading()
      ) : (
        <>
          {["#13A038", "#0092DB", "#8F49FE"].map((color) => (
            <StyledLoaderSquare
              data-role="loader-square"
              key={color}
              backgroundColor={
                variant === "gradient"
                  ? /* istanbul ignore next */ color
                  : "var(--colorsActionMajor500)"
              }
              {...loaderSquareProps}
            />
          ))}
        </>
      )}
    </StyledLoader>
  );
};

export default Loader;

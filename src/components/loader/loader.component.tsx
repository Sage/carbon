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
  StyledLoaderPlaceholder,
} from "./loader-square.style";
import Typography from "../typography";

/**
 * @deprecated `Loader` has been deprecated. See the Carbon documentation for migration details.
 */
export interface LoaderProps
  extends Omit<StyledLoaderSquareProps, "backgroundColor">,
    MarginProps,
    TagProps {
  /** Toggle between the default variant and gradient variant */
  variant?: string;
  /**
   * Specify a custom accessible label for the Loader.
   * This label is visible to users who have enabled the reduce motion setting in their operating system. It is also available to assistive technologies.
   */
  loaderLabel?: string;
}

/**
 * @deprecated `Loader` has been deprecated. See the Carbon documentation for migration details.
 */
export const Loader = ({
  variant = "default",
  size = "medium",
  isInsideButton = false,
  isActive = true,
  loaderLabel,
  ...rest
}: LoaderProps) => {
  const l = useLocale();

  const allowMotion = useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  if (allowMotion === undefined) {
    return <StyledLoaderPlaceholder />;
  }

  const loaderSquareProps = {
    isInsideButton,
    isActive,
    size,
    variant,
  };

  // FE-6368 has been raised for the below, changed hex values for design tokens (when added)
  return (
    <StyledLoader
      {...tagComponent("loader", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      {allowMotion ? (
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
          <Typography data-role="hidden-label" variant="span" screenReaderOnly>
            {loaderLabel || l.loader.loading()}
          </Typography>
        </>
      ) : (
        loaderLabel || l.loader.loading()
      )}
    </StyledLoader>
  );
};

export default Loader;

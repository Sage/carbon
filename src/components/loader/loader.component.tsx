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
import Typography from "../typography";
import Logger from "../../__internal__/utils/logger";

export interface LoaderProps
  extends Omit<StyledLoaderSquareProps, "backgroundColor">,
    MarginProps,
    TagProps {
  /** Toggle between the default variant and gradient variant */
  variant?: string;
  /**
   * Specify a custom accessible name for the Loader component
   * @deprecated - use `loaderLabel` prop instead
   */
  "aria-label"?: string;
  /**
   * Specify a custom accessible label for the Loader.
   * This label is visible to users who have enabled the reduce motion setting in their operating system. It is also available to assistive technologies.
   */
  loaderLabel?: string;
}

let deprecateAriaLabelWarnTriggered = false;

export const Loader = ({
  variant = "default",
  "aria-label": ariaLabel,
  size = "medium",
  isInsideButton,
  isActive = true,
  loaderLabel,
  ...rest
}: LoaderProps) => {
  if (!deprecateAriaLabelWarnTriggered && ariaLabel) {
    deprecateAriaLabelWarnTriggered = true;
    Logger.deprecate(
      "The aria-label prop in Loader is deprecated and will soon be removed, please use the `loaderLabel` prop instead to provide an accessible label.",
    );
  }

  const l = useLocale();

  const allowMotion = useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  if (allowMotion === undefined) {
    return null;
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
        loaderLabel || ariaLabel || l.loader.loading()
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
          <Typography data-role="hidden-label" variant="span" screenReaderOnly>
            {loaderLabel || ariaLabel || l.loader.loading()}
          </Typography>
        </>
      )}
    </StyledLoader>
  );
};

export default Loader;

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
  extends StyledLoaderSquareProps,
    MarginProps,
    TagProps {
  /** Specify a custom accessible name for the Loader component */
  "aria-label"?: string;
}

export const Loader = ({
  "aria-label": ariaLabel,
  size = "medium",
  isInsideButton,
  isActive = true,
  ...rest
}: LoaderProps) => {
  const l = useLocale();

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)"
  );

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
          <StyledLoaderSquare
            isInsideButton={isInsideButton}
            isActive={isActive}
            size={size}
          />
          <StyledLoaderSquare
            isInsideButton={isInsideButton}
            isActive={isActive}
            size={size}
          />
          <StyledLoaderSquare
            isInsideButton={isInsideButton}
            isActive={isActive}
            size={size}
          />
        </>
      )}
    </StyledLoader>
  );
};

export default Loader;

import React from "react";
import { MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

import StyledLoaderBar, {
  InnerBar,
  StyledLoader,
  StyledLoaderBarProps,
} from "./loader-bar.style";

export interface LoaderBarProps
  extends StyledLoaderBarProps,
    MarginProps,
    TagProps {}

export const LoaderBar = ({ size = "medium", ...rest }: LoaderBarProps) => {
  const l = useLocale();

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  return (
    <StyledLoader
      aria-label={l.loader.loading()}
      role="progressbar"
      {...tagComponent("loader-bar", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      {reduceMotion ? (
        l.loader.loading()
      ) : (
        <StyledLoaderBar data-role="outer-bar" size={size}>
          <InnerBar data-role="inner-bar" size={size} />
        </StyledLoaderBar>
      )}
    </StyledLoader>
  );
};

LoaderBar.DisplayName = "Loader Bar";
export default LoaderBar;

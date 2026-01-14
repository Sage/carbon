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

const LoaderBar = ({ size = "medium", ...rest }: LoaderBarProps) => {
  const l = useLocale();

  const allowMotion = useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  if (allowMotion === undefined) {
    return null;
  }

  return (
    <StyledLoader
      aria-label={l.loader.loading()}
      role="progressbar"
      {...tagComponent("loader-bar", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      {allowMotion ? (
        <StyledLoaderBar data-role="outer-bar" size={size}>
          <InnerBar data-role="inner-bar" size={size} />
        </StyledLoaderBar>
      ) : (
        l.loader.loading()
      )}
    </StyledLoader>
  );
};

LoaderBar.DisplayName = "Loader Bar";
export default LoaderBar;

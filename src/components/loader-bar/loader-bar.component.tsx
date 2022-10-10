import React from "react";
import { MarginProps } from "styled-system";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledLoaderBar, {
  InnerBar,
  StyledLoader,
  StyledLoaderBarProps,
} from "./loader-bar.style";

export interface LoaderBarProps extends StyledLoaderBarProps, MarginProps {}

export const LoaderBar = ({ size = "medium", ...rest }: LoaderBarProps) => {
  return (
    <StyledLoader {...rest} {...tagComponent("loader-bar", rest)}>
      <StyledLoaderBar size={size}>
        <InnerBar size={size} />
      </StyledLoaderBar>
    </StyledLoader>
  );
};

LoaderBar.DisplayName = "Loader Bar";
export default LoaderBar;

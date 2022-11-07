import React from "react";
import { MarginProps } from "styled-system";
import { Expand } from "../../__internal__/utils/helpers/types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledLoader from "./loader.style";
import StyledLoaderSquare, {
  StyledLoaderSquareProps,
} from "./loader-square.style";

export interface LoaderProps
  extends StyledLoaderSquareProps,
    Expand<MarginProps> {
  /** Specify an aria-label for the Loader component */
  "aria-label"?: string;
}

export const Loader = ({
  "aria-label": ariaLabel = "loader",
  isInsideButton,
  isActive = true,
  size = "medium",
  ...rest
}: LoaderProps) => {
  return (
    <StyledLoader
      aria-label={ariaLabel}
      role="progressbar"
      {...tagComponent("loader", rest)}
      {...rest}
    >
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
    </StyledLoader>
  );
};

export default Loader;

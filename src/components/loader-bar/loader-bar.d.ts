import { MarginProps } from "styled-system";

export interface LoaderBarProps extends MarginProps {
  /** Size of the loaderBar. */
  size?: "small" | "medium" | "large";
}

declare function LoaderBar(props: LoaderBarProps): JSX.Element;

export default LoaderBar;

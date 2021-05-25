import { MarginProps } from "styled-system";

export interface LoaderProps extends MarginProps {
  /** Size of the loader. */
  size?: "small" | "large";
  /** Applies white color. */
  isInsideButton?: boolean;
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive?: boolean;
}

declare function Loader(props: LoaderProps): JSX.Element;

export default Loader;

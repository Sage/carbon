import { MarginProps } from "styled-system";

export interface LoaderProps extends MarginProps {
  /** Specify an aria-label for the Loader component */
  "aria-label"?: string;
  /** Size of the loader. */
  size?: "small" | "medium" | "large";
  /** Applies white color. */
  isInsideButton?: boolean;
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive?: boolean;
}

declare function Loader(props: LoaderProps): JSX.Element;

export default Loader;

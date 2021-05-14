import { MarginProps } from "styled-system";
import * as OptionsHelper from "../../utils/helpers/options-helper/options-helper";

export interface LoaderProps extends MarginProps {
  /** Size of the loader. */
  size?: OptionsHelper.SizesType;
  /** Applies white color. */
  isInsideButton?: boolean;
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive?: boolean;
}

declare function Loader(props: LoaderProps): JSX.Element;

export default Loader;

import * as React from "react";
import { SpacingProps, TintValueType} from "../../utils/helpers/options-helper";

export interface VerticalDividerPropTypes extends SpacingProps {
  h?: number | string;
  displayInline?: boolean;
  tint?: TintValueType;
}

declare function VerticalDivider(props: VerticalDividerPropTypes): JSX.Element;

export default VerticalDivider;

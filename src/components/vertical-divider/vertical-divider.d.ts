import * as React from "react";
import { SpacingProps, TintValueType} from "../../utils/helpers/options-helper";

export interface VerticalDividerPropTypes extends SpacingProps {
  h?: number | string;
  displayInline?: boolean;
  tint?: TintValueType;
}

declare const VerticalDivider: React.FunctionComponent<VerticalDividerPropTypes>;

export default VerticalDivider;

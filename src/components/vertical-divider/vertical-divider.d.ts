import * as React from "react";
import { SpaceProps } from "styled-system";
import * as OptionsHelper from "../../utils/helpers/options-helper";

export interface VerticalDividerPropTypes extends SpaceProps {
  h?: number | string;
  displayInline?: boolean;
  tint?: OptionsHelper.TintValueType;
}

declare function VerticalDivider(props: VerticalDividerPropTypes): JSX.Element;

export default VerticalDivider;

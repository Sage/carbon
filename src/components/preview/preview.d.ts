import * as React from "react";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";

export interface PreviewProps extends MarginSpacingProps {
  children?: React.ReactNode;
  height?: string;
  lines?: number;
  loading?: boolean;
  width?: string;
}

declare const Preview: React.FunctionComponent<PreviewProps>;

export default Preview;

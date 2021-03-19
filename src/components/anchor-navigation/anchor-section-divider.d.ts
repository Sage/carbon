import * as React from "react";

export interface AnchorSectionDividerProps {
  /** Allows to override existing component styles */
  styleOverride?: () => object | object;
}

declare const AnchorSectionDivider: React.FunctionComponent<AnchorSectionDividerProps>;
export default AnchorSectionDivider;

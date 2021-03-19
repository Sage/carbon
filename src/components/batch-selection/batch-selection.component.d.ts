import * as React from "react";

export interface BatchSelectionProps {
  /** Color of the background, transparent if not defined */
  colorTheme?: "dark" | "light" | "transparent-base" | "transparent-white";
  /** Content to be rendered after selected count */
  children: React.ReactNode;
  /** If true disables all user interaction */
  disabled?: boolean;
  /** Number of selected elements */
  selectedCount: number;
}

declare const BatchSelection: React.FunctionComponent<BatchSelectionProps>;

export default BatchSelection;

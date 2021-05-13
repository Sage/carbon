import * as React from "react";

export interface BatchSelectionProps {
  /** Content to be rendered after selected count */
  children: React.ReactNode;
  /** Color of the background, transparent if not defined */
  colorTheme?: "dark" | "light" | "white" | "transparent";
  /** If true disables all user interaction */
  disabled?: boolean;
  /** Hidden if true */
  hidden?: boolean;
  /** Number of selected elements */
  selectedCount: number;
}

declare function BatchSelection(props: BatchSelectionProps): JSX.Element;

export default BatchSelection;

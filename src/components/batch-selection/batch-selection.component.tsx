import React from "react";

import useLocale from "../../hooks/__internal__/useLocale";
import {
  StyledBatchSelection,
  StyledSelectionCount,
} from "./batch-selection.style";
import BatchSelectionContext from "./__internal__/batch-selection.context";

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

export const BatchSelection = ({
  disabled = false,
  children,
  colorTheme = "transparent",
  selectedCount,
  hidden,
}: BatchSelectionProps) => {
  const l = useLocale();

  return (
    <StyledBatchSelection
      colorTheme={colorTheme}
      data-component="batch-selection"
      disabled={disabled}
      hidden={hidden}
    >
      <StyledSelectionCount data-element="selection-count">
        {l.batchSelection.selected(selectedCount)}
      </StyledSelectionCount>
      <BatchSelectionContext.Provider
        value={{ batchSelectionDisabled: disabled }}
      >
        {children}
      </BatchSelectionContext.Provider>
    </StyledBatchSelection>
  );
};

export default BatchSelection;

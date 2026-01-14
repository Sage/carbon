import React from "react";

import useLocale from "../../hooks/__internal__/useLocale";
import {
  StyledBatchSelection,
  StyledSelectionCount,
} from "./batch-selection.style";
import BatchSelectionContext from "./__internal__/batch-selection.context";
import { TagProps } from "../../__internal__/utils/helpers/tags";

export interface BatchSelectionProps extends TagProps {
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

const BatchSelection = ({
  disabled = false,
  children,
  colorTheme = "transparent",
  selectedCount,
  hidden,
  "data-element": dataElement,
  "data-role": dataRole,
}: BatchSelectionProps) => {
  const l = useLocale();

  return (
    <StyledBatchSelection
      colorTheme={colorTheme}
      data-component="batch-selection"
      data-element={dataElement}
      data-role={dataRole}
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

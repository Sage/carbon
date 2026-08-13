import React from "react";

import { DataGridCellParams } from "../../data-grid.types";
import { StyledCellContent, StyledCheckbox } from "../data-grid.style";

interface DataGridCellContentProps<T extends object> {
  params: DataGridCellParams<T>;
  rowIndex: number;
}

/** The resting content for each built-in cell variation. */
const DataGridCellContent = <T extends object>({
  params,
  rowIndex,
}: DataGridCellContentProps<T>) => {
  const { column, value } = params;
  const type = column.type ?? "text";

  return (
    <StyledCellContent cellType={type}>
      {column.renderCell?.(params) ??
        (type === "checkbox" ? (
          <StyledCheckbox
            type="checkbox"
            checked={Boolean(value)}
            readOnly
            aria-label={`${column.headerName}, row ${rowIndex + 1}`}
            tabIndex={-1}
          />
        ) : column.type === "dropdown" ? (
          <>
            <span>
              {column.options.find((option) => option.value === value)?.label ??
                String(value ?? "")}
            </span>
            <span aria-hidden="true">▾</span>
          </>
        ) : (
          String(value ?? "")
        ))}
    </StyledCellContent>
  );
};

export default DataGridCellContent;

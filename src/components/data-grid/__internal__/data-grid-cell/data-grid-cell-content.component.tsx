import React from "react";

import { Checkbox } from "../../../checkbox";
import Icon from "../../../icon";
import { DataGridCellParams } from "../../data-grid.types";
import { StyledCellContent } from "../data-grid.style";

interface DataGridCellContentProps<T extends object> {
  params: DataGridCellParams<T>;
  rowIndex: number;
  align: "left" | "center" | "right";
  readOnly: boolean;
}

/** The resting content for each built-in cell variation. */
const DataGridCellContent = <T extends object>({
  params,
  rowIndex,
  align,
  readOnly,
}: DataGridCellContentProps<T>) => {
  const { column, value } = params;
  const type = column.type ?? "text";

  return (
    <StyledCellContent $cellType={type} $align={align}>
      {column.renderCell?.(params) ??
        (type === "checkbox" ? (
          <Checkbox
            checked={Boolean(value)}
            onChange={() => undefined}
            aria-label={`${column.headerName}, row ${rowIndex + 1}`}
            tabIndex={-1}
            size="medium"
            disabled={readOnly}
          />
        ) : column.type === "dropdown" ? (
          <>
            <span>
              {column.options.find((option) => option.value === value)?.label ??
                String(value ?? "")}
            </span>
            {!readOnly && <Icon type="dropdown" aria-hidden />}
          </>
        ) : (
          String(value ?? "")
        ))}
    </StyledCellContent>
  );
};

export default DataGridCellContent;

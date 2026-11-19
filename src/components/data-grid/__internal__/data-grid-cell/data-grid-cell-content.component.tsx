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
  const content = column.renderCell?.(params) ?? null;
  const isCheckbox = type === "checkbox" && content === null;

  return (
    <StyledCellContent
      $cellType={type}
      $align={align}
      role={isCheckbox ? "checkbox" : undefined}
      aria-checked={isCheckbox ? Boolean(value) : undefined}
      aria-readonly={isCheckbox && readOnly ? true : undefined}
      aria-label={
        isCheckbox
          ? `${column.headerAriaLabel ?? column.headerName}, row ${rowIndex + 1}`
          : undefined
      }
    >
      {content ??
        (type === "checkbox" ? (
          <Checkbox
            checked={Boolean(value)}
            onChange={() => undefined}
            aria-hidden="true"
            {...{ inert: "" }}
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

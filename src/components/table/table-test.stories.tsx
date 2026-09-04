import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableFoot,
} from ".";
import Button from "../button/__next__";
import { TableRowProps } from "./table-row/table-row.component";
import { TableCellProps } from "./table-cell/table-cell.component";
import { TableHeaderCellProps } from "./table-header/table-header.component";
import { ActionPopover, ActionPopoverItem, Checkbox } from "../..";

export default {
  title: "Table/Test",
  includeStories: [
    "Prominent",
    "SubtleWhite",
    "SubtleGrey",
    "StickyColumns",
    "StickyRows",
    "Draggable",
    "Selectable",
    "NoHorizontalBorders",
    "SmallHorizontalBorders",
    "MediumHorizontalBorders",
    "LargeHorizontalBorders",
    "NoVerticalBorders",
    "SmallVerticalBorders",
    "MediumVerticalBorders",
    "LargeVerticalBorders",
    "NoOuterBorders",
    "Expandable",
    "ZebraStriped",
    "SortableColumnHeaders",
    "MultiRowColumnHeaders",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {}
};

interface RowProps extends Partial<TableRowProps> {
  rowCount: number;
};

interface CellProps {
  cellCount: number;
  cellType: "th" | "td";
  moveCell?: (fromRow: number, toRow: number) => void;
};

type CellRenderProps = CellProps & (Partial<TableCellProps> | Partial<TableHeaderCellProps>);

const renderRows = (prefix = "", rowProps: RowProps, cellProps: CellRenderProps) => {
  const { rowCount } = rowProps;
  const { cellCount, cellType } = cellProps;
  const shouldRenderTd = cellType === "td";
  return Array.from({ length: rowCount }, (_, i) => (
    <TableRow key={`row-${i}`} {...rowProps} id={`${prefix}row-${i}`}>
      {Array.from({ length: cellCount }, (_, j) => (
        shouldRenderTd ? (
          <TableCell key={`cell-${j}`} id={`${prefix}cell-${j}`} {...cellProps}>
            {prefix} Cell {i + 1}-{j + 1}
          </TableCell>
        ) : (
          <TableHeader key={`cell-${j}`} id={`${prefix}cell-${j}`} {...cellProps}>
            {prefix} Cell {i + 1}-{j + 1}
          </TableHeader>
        )
      ))}
    </TableRow>
  ));
};

export const Prominent = () => {
  return (
    <Table variant="prominent">
      <TableHead>
        {renderRows("Header", { rowCount: 1 }, { cellCount: 8, cellType: "th", width: "90px" })}
      </TableHead>
      <TableBody>
        {renderRows("Body", { rowCount: 12 }, { cellCount: 8, cellType: "td" })}
      </TableBody>
      <TableFoot>
        {renderRows("Footer", { rowCount: 1 }, { cellCount: 8, cellType: "td" })}
      </TableFoot>
    </Table>
  );
};

export const SubtleWhite = () => {
  return (
    <Table variant="subtle-white">
      <TableHead>
        {renderRows("Header", { rowCount: 1 }, { cellCount: 8, cellType: "th", width: "90px" })}
      </TableHead>
      <TableBody>
        {renderRows("Body", { rowCount: 12 }, { cellCount: 8, cellType: "td" })}
      </TableBody>
      <TableFoot>
        {renderRows("Footer", { rowCount: 1 }, { cellCount: 8, cellType: "td" })}
      </TableFoot>
    </Table>
  );
};

export const SubtleGrey = () => {
  return (
    <Table variant="subtle-grey">
      <TableHead>
        {renderRows("Header", { rowCount: 1 }, { cellCount: 8, cellType: "th", width: "90px" })}
      </TableHead>
      <TableBody>
        {renderRows("Body", { rowCount: 12 }, { cellCount: 8, cellType: "td" })}
      </TableBody>
      <TableFoot>
        {renderRows("Footer", { rowCount: 1 }, { cellCount: 8, cellType: "td" })}
      </TableFoot>
    </Table>
  );
};

export const StickyColumns = () => {
  return (
    <Table variant="prominent" maxWidth="400px" stickyColumn="both">
      <TableHead>
        {renderRows("Header", { rowCount: 1 }, { cellCount: 12, cellType: "th", width: "90px" })}
      </TableHead>
      <TableBody>
        {renderRows("Body", { rowCount: 12 }, { cellCount: 12, cellType: "td" })}
      </TableBody>
      <TableFoot>
        {renderRows("Footer", { rowCount: 1 }, { cellCount: 12, cellType: "td" })}
      </TableFoot>
    </Table>
  );
};

export const StickyRows = () => {
  return (
    <Table variant="prominent" stickyRow="both">
      <TableHead>
        {renderRows("Header", { rowCount: 1 }, { cellCount: 6, cellType: "th", width: "90px" })}
      </TableHead>
      <TableBody>
        {renderRows("Body", { rowCount: 30 }, { cellCount: 6, cellType: "td" })}
      </TableBody>
      <TableFoot>
        {renderRows("Footer", { rowCount: 1 }, { cellCount: 6, cellType: "td" })}
      </TableFoot>
    </Table>
  );
};

const updateRows = (rowToMove: string, target: "up" | "down" | "top" | "bottom", setter: React.Dispatch<React.SetStateAction<React.ReactNode[]>>) => {
    setter((prevRows) => {
      const rowIndex = prevRows.findIndex((row) => {
        if (!React.isValidElement(row)) return false;
        return row.props.id === rowToMove;
      });

      switch (target) {
        case "up":
          if (rowIndex > 0) {
            const newRows = [...prevRows];
            const temp = newRows[rowIndex - 1];
            newRows[rowIndex - 1] = newRows[rowIndex];
            newRows[rowIndex] = temp;
            return newRows;
          }
          return prevRows;
        case "down":
          if (rowIndex < prevRows.length - 1) {
            const newRows = [...prevRows];
            const temp = newRows[rowIndex + 1];
            newRows[rowIndex + 1] = newRows[rowIndex];
            newRows[rowIndex] = temp;
            return newRows;
          }
          return prevRows;
        case "top":
          if (rowIndex > 0) {
            const newRows = [...prevRows];
            const [row] = newRows.splice(rowIndex, 1);
            newRows.unshift(row);
            return newRows;
          }
          return prevRows;
        case "bottom":
          if (rowIndex < prevRows.length - 1) {
            const newRows = [...prevRows];
            const [row] = newRows.splice(rowIndex, 1);
            newRows.push(row);
            return newRows;
          }
          return prevRows;
        default:
          return prevRows;
      }
    });
  };

export const Draggable = () => {
  const [rows, setRows] = React.useState<React.ReactNode[]>([
    <TableRow key="row-1" id="draggable-table-row-1">
      <TableCell id="draggable-table-row-1-cell-1">Row 1 Data 1</TableCell>
      <TableCell id="draggable-table-row-1-cell-2">Row 1 Data 2</TableCell>
      <TableCell id="draggable-table-row-1-cell-3">Row 1 Data 3</TableCell>
      <TableCell id="draggable-table-row-1-cell-4">
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-1", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-1", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-1", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-1", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>,
    <TableRow key="row-2" id="draggable-table-row-2">
      <TableCell id="draggable-table-row-2-cell-1">Row 2 Data 1</TableCell>
      <TableCell id="draggable-table-row-2-cell-2">Row 2 Data 2</TableCell>
      <TableCell id="draggable-table-row-2-cell-3">Row 2 Data 3</TableCell>
      <TableCell id="draggable-table-row-2-cell-4">
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-2", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-2", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-2", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-2", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>,
    <TableRow key="row-3" id="draggable-table-row-3">
      <TableCell id="draggable-table-row-3-cell-1">Row 3 Data 1</TableCell>
      <TableCell id="draggable-table-row-3-cell-2">Row 3 Data 2</TableCell>
      <TableCell id="draggable-table-row-3-cell-3">Row 3 Data 3</TableCell>
      <TableCell id="draggable-table-row-3-cell-4">
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-3", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-3", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-3", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-3", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>,
    <TableRow key="row-4" id="draggable-table-row-4">
      <TableCell id="draggable-table-row-4-cell-1">Row 4 Data 1</TableCell>
      <TableCell id="draggable-table-row-4-cell-2">Row 4 Data 2</TableCell>
      <TableCell id="draggable-table-row-4-cell-3">Row 4 Data 3</TableCell>
      <TableCell id="draggable-table-row-4-cell-4">
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-4", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-4", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-4", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-4", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>,
    <TableRow key="row-5" id="draggable-table-row-5">
      <TableCell id="draggable-table-row-5-cell-1">Row 5 Data 1</TableCell>
      <TableCell id="draggable-table-row-5-cell-2">Row 5 Data 2</TableCell>
      <TableCell id="draggable-table-row-5-cell-3">Row 5 Data 3</TableCell>
      <TableCell id="draggable-table-row-5-cell-4">
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-5", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-5", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-5", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-5", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>
  ]);

  return (
    <Table variant="subtle-white" isDraggable>
      <TableHead>
        <TableRow id="draggable-table-row-head">
          <TableHeader id="draggable-table-header-1">Header 1</TableHeader>
          <TableHeader id="draggable-table-header-2">Header 2</TableHeader>
          <TableHeader id="draggable-table-header-3">Header 3</TableHeader>
          <TableHeader id="draggable-table-header-actions" width="1%">Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows}
      </TableBody>
      <TableFoot>
        <TableRow id="draggable-table-row-foot">
          <TableCell id="draggable-table-row-foot-cell-1" colSpan={4}>
            <div style={{ display: "flex", justifyContent: "center" }}>Footer</div>
          </TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  );
};

export const Selectable = () => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([
    "selectable-table-row-body-2"
  ]);

  const handleRowSelect = (rowId: string) => {
    if (rowId === "all") {
      if (selectedRows.length === 3) {
        setSelectedRows([]);
      } else {
        setSelectedRows(["selectable-table-row-body-1", "selectable-table-row-body-2", "selectable-table-row-body-3"]);
      }
      return;
    }

    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  return (
    <Table variant="prominent">
      <TableHead>
        <TableRow 
          id="selectable-table-row-head"
          isSelected={selectedRows.length === 3}
        >
          <TableHeader id="interaction-select-header-checkbox" width="80px">
            <Checkbox
              checked={selectedRows.length === 3}
              indeterminate={selectedRows.length > 0 && selectedRows.length < 3}
              onChange={() => handleRowSelect("all")}
              onClick={(ev) => ev.stopPropagation()}
              data-component="table-cell-select-checkbox"
              data-role="table-cell-select-checkbox"
              aria-labelledby="selectable-table-header-1 selectable-table-header-2 selectable-table-header-3"
            />
          </TableHeader>
          <TableHeader id="selectable-table-header-1">Header 1</TableHeader>
          <TableHeader id="selectable-table-header-2">Header 2</TableHeader>
          <TableHeader id="selectable-table-header-3">Header 3</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow 
          id="selectable-table-row-body-1"
          isSelected={selectedRows.includes("selectable-table-row-body-1")}
        >
          <TableCell id="selectable-table-row-body-1-checkbox">
            <Checkbox
              checked={selectedRows.includes("selectable-table-row-body-1")}
              onChange={() => handleRowSelect("selectable-table-row-body-1")}
              onClick={(ev) => ev.stopPropagation()}
              data-component="table-cell-select-checkbox"
              data-role="table-cell-select-checkbox"
              aria-labelledby="selectable-table-row-body-1-checkbox"
            />
          </TableCell>
          <TableCell id="selectable-table-row-body-1-cell-1">Data 1</TableCell>
          <TableCell id="selectable-table-row-body-1-cell-2">Data 2</TableCell>
          <TableCell id="selectable-table-row-body-1-cell-3">Data 3</TableCell>
        </TableRow>
        <TableRow 
          id="selectable-table-row-body-2"
          isSelected={selectedRows.includes("selectable-table-row-body-2")}
        >
          <TableCell id="selectable-table-row-body-2-checkbox">
            <Checkbox
              checked={selectedRows.includes("selectable-table-row-body-2")}
              onChange={() => handleRowSelect("selectable-table-row-body-2")}
              onClick={(ev) => ev.stopPropagation()}
              data-component="table-cell-select-checkbox"
              data-role="table-cell-select-checkbox"
              aria-labelledby="selectable-table-row-body-2-checkbox"
            />
          </TableCell>
          <TableCell id="selectable-table-row-body-2-cell-1">Data 4</TableCell>
          <TableCell id="selectable-table-row-body-2-cell-2">Data 5</TableCell>
          <TableCell id="selectable-table-row-body-2-cell-3">Data 6</TableCell>
        </TableRow>
        <TableRow 
          id="selectable-table-row-body-3"
          isSelected={selectedRows.includes("selectable-table-row-body-3")}
        >
          <TableCell id="selectable-table-row-body-3-checkbox">
            <Checkbox
              checked={selectedRows.includes("selectable-table-row-body-3")}
              onChange={() => handleRowSelect("selectable-table-row-body-3")}
              onClick={(ev) => ev.stopPropagation()}
              data-component="table-cell-select-checkbox"
              data-role="table-cell-select-checkbox"
              aria-labelledby="selectable-table-row-body-3-checkbox"
            />
          </TableCell>
          <TableCell id="selectable-table-row-body-3-cell-1">Data 7</TableCell>
          <TableCell id="selectable-table-row-body-3-cell-2">Data 8</TableCell>
          <TableCell id="selectable-table-row-body-3-cell-3">Data 9</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const HorizontalBordersTable = ({
  borderThickness,
}: {
  borderThickness: TableRowProps["borderThickness"];
}) => (
  <Table variant="prominent">
    <TableHead>
      <TableRow id={`${borderThickness}-cell-borders-row-head`}>
        <TableHeader id="horizontal-borders-table-header-1">Header 1</TableHeader>
        <TableHeader id="horizontal-borders-table-header-2">Header 2</TableHeader>
        <TableHeader id="horizontal-borders-table-header-3">Header 3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow
        id={`${borderThickness}-cell-borders-row-body-1`}
        borderThickness={borderThickness}
      >
        <TableCell id={`${borderThickness}-cell-borders-row-body-1-cell-1`}>Data 1</TableCell>
        <TableCell id={`${borderThickness}-cell-borders-row-body-1-cell-2`}>Data 2</TableCell>
        <TableCell id={`${borderThickness}-cell-borders-row-body-1-cell-3`}>Data 3</TableCell>
      </TableRow>
      <TableRow
        id={`${borderThickness}-cell-borders-row-body-2`}
        borderThickness={borderThickness}
      >
        <TableCell id={`${borderThickness}-cell-borders-row-body-2-cell-1`}>Data 4</TableCell>
        <TableCell id={`${borderThickness}-cell-borders-row-body-2-cell-2`}>Data 5</TableCell>
        <TableCell id={`${borderThickness}-cell-borders-row-body-2-cell-3`}>Data 6</TableCell>
      </TableRow>
      <TableRow
        id={`${borderThickness}-cell-borders-row-body-3`}
      >
        <TableCell id={`${borderThickness}-cell-borders-row-body-3-cell-1`}>Data 7</TableCell>
        <TableCell id={`${borderThickness}-cell-borders-row-body-3-cell-2`}>Data 8</TableCell>
        <TableCell id={`${borderThickness}-cell-borders-row-body-3-cell-3`}>Data 9</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const NoHorizontalBorders = () => (
  <HorizontalBordersTable borderThickness="none" />
);

export const SmallHorizontalBorders = () => (
  <HorizontalBordersTable borderThickness="small" />
);

export const MediumHorizontalBorders = () => (
  <HorizontalBordersTable borderThickness="medium" />
);

export const LargeHorizontalBorders = () => (
  <HorizontalBordersTable borderThickness="large" />
);

const VerticalBordersTable = ({
  borderThickness,
}: {
  borderThickness: TableCellProps["borderThickness"];
}) => (
  <Table variant="prominent">
    <TableHead>
      <TableRow id={`${borderThickness}-vertical-cell-borders-row-head`}>
        <TableHeader id={`${borderThickness}-vertical-borders-table-header-1`} borderThickness={borderThickness}>Header 1</TableHeader>
        <TableHeader id={`${borderThickness}-vertical-borders-table-header-2`} borderThickness={borderThickness}>Header 2</TableHeader>
        <TableHeader id={`${borderThickness}-vertical-borders-table-header-3`} borderThickness={borderThickness}>Header 3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow id={`${borderThickness}-vertical-cell-borders-row-body-1`}>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-1`} borderThickness={borderThickness}>Data 1</TableCell>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-2`} borderThickness={borderThickness}>Data 2</TableCell>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-3`} borderThickness={borderThickness}>Data 3</TableCell>
      </TableRow>
      <TableRow id={`${borderThickness}-vertical-cell-borders-row-body-2`}>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-4`} borderThickness={borderThickness}>Data 4</TableCell>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-5`} borderThickness={borderThickness}>Data 5</TableCell>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-6`} borderThickness={borderThickness}>Data 6</TableCell>
      </TableRow>
      <TableRow id={`${borderThickness}-vertical-cell-borders-row-body-3`}>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-7`} borderThickness={borderThickness}>Data 7</TableCell>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-8`} borderThickness={borderThickness}>Data 8</TableCell>
        <TableCell id={`${borderThickness}-vertical-borders-table-cell-9`} borderThickness={borderThickness}>Data 9</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const NoVerticalBorders = () => (
  <VerticalBordersTable borderThickness="none" />
);

export const SmallVerticalBorders = () => (
  <VerticalBordersTable borderThickness="small" />
);

export const MediumVerticalBorders = () => (
  <VerticalBordersTable borderThickness="medium" />
);

export const LargeVerticalBorders = () => (
  <VerticalBordersTable borderThickness="large" />
);

export const NoOuterBorders = () => (
  <Table variant="subtle-white" outerBorders="none">
    <TableHead>
      <TableRow id="no-outer-borders-row-head">
        <TableHeader id="no-outer-borders-table-header-1">Header 1</TableHeader>
        <TableHeader id="no-outer-borders-table-header-2">Header 2</TableHeader>
        <TableHeader id="no-outer-borders-table-header-3">Header 3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow id="no-outer-borders-row-body-1">
        <TableCell id="no-outer-borders-table-cell-1">Data 1</TableCell>
        <TableCell id="no-outer-borders-table-cell-2">Data 2</TableCell>
        <TableCell id="no-outer-borders-table-cell-3">Data 3</TableCell>
      </TableRow>
      <TableRow id="no-outer-borders-row-body-2">
        <TableCell id="no-outer-borders-table-cell-4">Data 4</TableCell>
        <TableCell id="no-outer-borders-table-cell-5">Data 5</TableCell>
        <TableCell id="no-outer-borders-table-cell-6">Data 6</TableCell>
      </TableRow>
      <TableRow id="no-outer-borders-row-body-3">
        <TableCell id="no-outer-borders-table-cell-7">Data 7</TableCell>
        <TableCell id="no-outer-borders-table-cell-8">Data 8</TableCell>
        <TableCell id="no-outer-borders-table-cell-9">Data 9</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const Expandable = () => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <Button onClick={() => setExpanded(p => !p)}>{expanded ? "Collapse" : "Expand"}</Button>
      <Table variant="prominent">
        <TableHead>
          <TableRow id="expandable-table-row-head">
            <TableHeader id="expandable-product">Product</TableHeader>
            <TableHeader id="expandable-type">Type</TableHeader>
            <TableHeader id="expandable-status">Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            id="expandable-table-row-1"
            isExpanded={expanded}
            subRows={
              <>
                <TableRow id="expandable-table-row-1-sub-row-1">
                  <TableCell id="expandable-table-row-1-sub-row-1-product">Product A1</TableCell>
                  <TableCell id="expandable-table-row-1-sub-row-1-type">Child product</TableCell>
                  <TableCell id="expandable-table-row-1-sub-row-1-status">Active</TableCell>
                </TableRow>
                <TableRow id="expandable-table-row-1-sub-row-2">
                  <TableCell id="expandable-table-row-1-sub-row-2-product">Product A2</TableCell>
                  <TableCell id="expandable-table-row-1-sub-row-2-type">Child product</TableCell>
                  <TableCell id="expandable-table-row-1-sub-row-2-status">Inactive</TableCell>
                </TableRow>
              </>
            }
          >
            <TableCell id="expandable-table-row-1-product">Product A</TableCell>
            <TableCell id="expandable-table-row-1-type">Parent product</TableCell>
            <TableCell id="expandable-table-row-1-status">Active</TableCell>
          </TableRow>
          <TableRow
            id="expandable-table-row-2"
            isExpanded={expanded}
            subRows={
              <>
                <TableRow id="expandable-table-row-2-sub-row-1">
                  <TableCell id="expandable-table-row-2-sub-row-1-product">Product A1</TableCell>
                  <TableCell id="expandable-table-row-2-sub-row-1-type">Child product</TableCell>
                  <TableCell id="expandable-table-row-2-sub-row-1-status">Active</TableCell>
                </TableRow>
                <TableRow id="expandable-table-row-2-sub-row-2">
                  <TableCell id="expandable-table-row-2-sub-row-2-product">Product A2</TableCell>
                  <TableCell id="expandable-table-row-2-sub-row-2-type">Child product</TableCell>
                  <TableCell id="expandable-table-row-2-sub-row-2-status">Inactive</TableCell>
                </TableRow>
              </>
            }  
          >
            <TableCell id="expandable-table-row-2-product">Product B</TableCell>
            <TableCell id="expandable-table-row-2-type">Standard product</TableCell>
            <TableCell id="expandable-table-row-2-status">Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export const ZebraStriped = () => (
  <Table isZebraStriped variant="prominent">
    <TableHead>
      <TableRow id="zebra-striped-table-row-head">
        <TableHeader id="zebra-striped-product">Product</TableHeader>
        <TableHeader id="zebra-striped-type">Type</TableHeader>
        <TableHeader id="zebra-striped-status">Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: 6 }, (_, index) => (
        <TableRow key={index} id={`zebra-striped-table-row-${index + 1}`}>
          <TableCell id={`zebra-striped-table-row-${index + 1}-product`}>{`Product ${index + 1}`}</TableCell>
          <TableCell id={`zebra-striped-table-row-${index + 1}-type`}>{index % 2 === 0 ? "Standard" : "Premium"}</TableCell>
          <TableCell id={`zebra-striped-table-row-${index + 1}-status`}>{index % 3 === 0 ? "Inactive" : "Active"}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const SortableColumnHeaders = () => {
  const [sortColumn, setSortColumn] = React.useState<"product" | "price">("product");
  const [sortDirection, setSortDirection] = React.useState<"ascending" | "descending">("ascending");
  const products = [
    { id: 1, product: "Product C", price: 25, status: "Active" },
    { id: 2, product: "Product A", price: 10, status: "Inactive" },
    { id: 3, product: "Product B", price: 40, status: "Active" },
  ];

  const handleSort = (column: "product" | "price") => {
    if (sortColumn === column) {
      setSortDirection((direction) =>
        direction === "ascending" ? "descending" : "ascending",
      );
      return;
    }

    setSortColumn(column);
    setSortDirection("ascending");
  };

  const sortedProducts = [...products].sort((firstProduct, secondProduct) => {
    const firstValue = firstProduct[sortColumn];
    const secondValue = secondProduct[sortColumn];
    const result = typeof firstValue === "string"
      ? firstValue.localeCompare(secondValue as string)
      : firstValue - (secondValue as number);

    return sortDirection === "ascending" ? result : -result;
  });

  return (
    <Table variant="prominent">
      <TableHead>
        <TableRow id="sortable-column-headers-row-head">
          <TableHeader
            id="sortable-column-headers-product"
            sortType={sortColumn === "product" ? sortDirection : "unsorted"}
            onSort={() => handleSort("product")}
            aria-sort={sortColumn === "product" ? sortDirection : "none"}
          >
            Product
          </TableHeader>
          <TableHeader
            id="sortable-column-headers-price"
            sortType={sortColumn === "price" ? sortDirection : "unsorted"}
            onSort={() => handleSort("price")}
            aria-sort={sortColumn === "price" ? sortDirection : "none"}
            sortAriaRoleDescription={`Sortable column header - currently ${sortColumn === "price" ? `sorted in ${sortDirection} order` : "unsorted"}`}
          >
            Price
          </TableHeader>
          <TableHeader id="sortable-column-headers-status">Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedProducts.map(({ id, product, price, status }) => (
          <TableRow key={id} id={`sortable-column-headers-row-${id}`}>
            <TableCell id={`sortable-column-headers-row-${id}-product`}>{product}</TableCell>
            <TableCell id={`sortable-column-headers-row-${id}-price`}>{`£${price}`}</TableCell>
            <TableCell id={`sortable-column-headers-row-${id}-status`}>{status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const MultiRowColumnHeaders = () => {
  const [sortColumn, setSortColumn] = React.useState<
    "retailPrice" | "wholesalePrice" | "inStock" | "reserved"
  >("retailPrice");
  const [sortDirection, setSortDirection] = React.useState<
    "ascending" | "descending"
  >("ascending");
  const products = [
    {
      id: 1,
      product: "Product A",
      retailPrice: 30,
      wholesalePrice: 20,
      inStock: 42,
      reserved: 5,
    },
    {
      id: 2,
      product: "Product B",
      retailPrice: 18,
      wholesalePrice: 12,
      inStock: 16,
      reserved: 2,
    },
    {
      id: 3,
      product: "Product C",
      retailPrice: 45,
      wholesalePrice: 32,
      inStock: 28,
      reserved: 8,
    },
  ];

  const handleSort = (
    column: "retailPrice" | "wholesalePrice" | "inStock" | "reserved",
  ) => {
    if (sortColumn === column) {
      setSortDirection((direction) =>
        direction === "ascending" ? "descending" : "ascending"
      );
      return;
    }

    setSortColumn(column);
    setSortDirection("ascending");
  };

  const sortedProducts = [...products].sort((firstProduct, secondProduct) => {
    const result = firstProduct[sortColumn] - secondProduct[sortColumn];
    return sortDirection === "ascending" ? result : -result;
  });

  const sortableHeaderProps = (
    column: "retailPrice" | "wholesalePrice" | "inStock" | "reserved",
  ) => ({
    sortType: sortColumn === column ? sortDirection : ("unsorted" as const),
    onSort: () => handleSort(column),
    "aria-sort": sortColumn === column ? sortDirection : ("none" as const),
  });
  const [variant, setVariant] = React.useState<"prominent" | "subtle-white" | "subtle-grey">("prominent");

  const toggleVariant = () => {
    setVariant((prevVariant) => {
      if (prevVariant === "prominent") return "subtle-white";
      if (prevVariant === "subtle-white") return "subtle-grey";
      return "prominent";
    });
  };

  return (
    <>
      <Button mb={1} onClick={toggleVariant}>Toggle variant ({variant})</Button>
      <Table stickyColumn="both" maxWidth="500px" variant={variant}>
        <TableHead>
          <TableRow id="multi-row-column-headers-row-head-1">
            <TableHeader id="multi-row-column-headers-product" width="100px" rowSpan={2} scope="col">
              Product
            </TableHeader>
            <TableHeader id="multi-row-column-headers-pricing" borderThickness={variant !== "prominent" ? "none" : undefined} colSpan={2} scope="colgroup">
              Pricing
            </TableHeader>
            <TableHeader id="multi-row-column-headers-inventory" borderThickness={variant !== "prominent" ? "none" : undefined} colSpan={2} scope="colgroup">
              Inventory
            </TableHeader>
            <TableHeader id="multi-row-column-headers-actions" width="95px" rowSpan={2} scope="col">
              Actions
            </TableHeader>
          </TableRow>
          <TableRow id="multi-row-column-headers-row-head-2">
            <TableHeader
              id="multi-row-column-headers-retail-price"
              variantType="alternate"
              scope="col"
              {...sortableHeaderProps("retailPrice")}
            >
              Retail
            </TableHeader>
            <TableHeader
              id="multi-row-column-headers-wholesale-price"
              variantType="alternate"
              scope="col"
              {...sortableHeaderProps("wholesalePrice")}
            >
              Wholesale
            </TableHeader>
            <TableHeader
              id="multi-row-column-headers-in-stock"
              variantType="alternate"
              scope="col"
              {...sortableHeaderProps("inStock")}
            >
              In stock
            </TableHeader>
            <TableHeader
              id="multi-row-column-headers-reserved"
              variantType="alternate"
              scope="col"
              {...sortableHeaderProps("reserved")}
            >
              Reserved
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProducts.map(
            ({ id, product, retailPrice, wholesalePrice, inStock, reserved }) => (
              <TableRow key={id} id={`multi-row-column-headers-row-${id}`}>
                <TableCell id={`multi-row-column-headers-row-${id}-product`}>{product}</TableCell>
                <TableCell id={`multi-row-column-headers-row-${id}-retail-price`}>{`£${retailPrice}`}</TableCell>
                <TableCell id={`multi-row-column-headers-row-${id}-wholesale-price`}>{`£${wholesalePrice}`}</TableCell>
                <TableCell id={`multi-row-column-headers-row-${id}-in-stock`}>{inStock}</TableCell>
                <TableCell id={`multi-row-column-headers-row-${id}-reserved`}>{reserved}</TableCell>
                <TableCell id={`multi-row-column-headers-row-${id}-actions`}>
                  <Button size="small">View</Button>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </>
  );
};

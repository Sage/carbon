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
import { ActionPopover, ActionPopoverItem } from "../..";

export default {
  title: "Table/Test",
  includeStories: [
    "TableTest",
    "StickyTableTest",
    "DraggableTableTest",
    "SelectableTable",
    "NoHorizontalBorders",
    "SmallHorizontalBorders",
    "MediumHorizontalBorders",
    "LargeHorizontalBorders",
    "NoVerticalBorders",
    "SmallVerticalBorders",
    "MediumVerticalBorders",
    "LargeVerticalBorders",
    "NoOuterBorders",
    "ExpandableTable",
    "ZebraStripedTable",
    "StickyHeaderAndFooterTable",
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

const subRows = (
  <>
    <TableRow id="table-row-body-1-sub">
      <TableCell><div>SubRow Data 1<div>SubRow Data 1</div><div>SubRow Data 1</div></div></TableCell>
      <TableCell>SubRow Data 2</TableCell>
      <TableCell>SubRow Data 3</TableCell>
      <TableCell>SubRow Data 4</TableCell>
      <TableCell>SubRow Data 5</TableCell>
      <TableCell>SubRow Data 6</TableCell>
      <TableCell>SubRow Data 7</TableCell>
      <TableCell>SubRow Data 8</TableCell>
      <TableCell>SubRow Data 9</TableCell>
      <TableCell>SubRow Data 10</TableCell>
      <TableCell>SubRow Data 11</TableCell>
      <TableCell>SubRow Data 12</TableCell>
    </TableRow>
    <TableRow id="table-row-body-2-sub">
      <TableCell><div>SubRow Data 1<div>SubRow Data 1</div><div>SubRow Data 1</div></div></TableCell>
      <TableCell>SubRow Data 2</TableCell>
      <TableCell>SubRow Data 3</TableCell>
      <TableCell>SubRow Data 4</TableCell>
      <TableCell>SubRow Data 5</TableCell>
      <TableCell>SubRow Data 6</TableCell>
      <TableCell>SubRow Data 7</TableCell>
      <TableCell>SubRow Data 8</TableCell>
      <TableCell>SubRow Data 9</TableCell>
      <TableCell>SubRow Data 10</TableCell>
      <TableCell>SubRow Data 11</TableCell>
      <TableCell>SubRow Data 12</TableCell>
    </TableRow>
  </>
)

export const TableTest = () => {
  return (
    <Table isZebraStriped variant="prominent">
      <TableHead>
        {renderRows("Header", { rowCount: 1 }, { cellCount: 12, cellType: "th", width: "90px" })}
      </TableHead>
      <TableBody>
        {renderRows("Body", { rowCount: 12, subRows: subRows }, { cellCount: 12, cellType: "td" })}
      </TableBody>
      <TableFoot>
        {renderRows("Footer", { rowCount: 1 }, { cellCount: 12, cellType: "td" })}
      </TableFoot>
    </Table>
  );
};

export const StickyTableTest = () => {
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

export const DraggableTableTest = () => {
  const [rows, setRows] = React.useState<React.ReactNode[]>([
    <TableRow key="row-1" id="draggable-table-row-1">
      <TableCell>Row 1 Data 1</TableCell>
      <TableCell>Row 1 Data 2</TableCell>
      <TableCell>Row 1 Data 3</TableCell>
      <TableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-1", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-1", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-1", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-1", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>,
    <TableRow key="row-2" id="draggable-table-row-2">
      <TableCell>Row 2 Data 1</TableCell>
      <TableCell>Row 2 Data 2</TableCell>
      <TableCell>Row 2 Data 3</TableCell>
      <TableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-2", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-2", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-2", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-2", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>,
    <TableRow key="row-3" id="draggable-table-row-3">
      <TableCell>Row 3 Data 1</TableCell>
      <TableCell>Row 3 Data 2</TableCell>
      <TableCell>Row 3 Data 3</TableCell>
      <TableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-3", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-3", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-3", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-3", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>,
    <TableRow key="row-4" id="draggable-table-row-4">
      <TableCell>Row 4 Data 1</TableCell>
      <TableCell>Row 4 Data 2</TableCell>
      <TableCell>Row 4 Data 3</TableCell>
      <TableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-4", "up", setRows)}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-4", "down", setRows)}>Move down</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-4", "top", setRows)}>Move to top</ActionPopoverItem>
          <ActionPopoverItem onClick={() => updateRows("draggable-table-row-4", "bottom", setRows)}>Move to bottom</ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>,
    <TableRow key="row-5" id="draggable-table-row-5">
      <TableCell>Row 5 Data 1</TableCell>
      <TableCell>Row 5 Data 2</TableCell>
      <TableCell>Row 5 Data 3</TableCell>
      <TableCell>
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
          <TableHeader>Header 1</TableHeader>
          <TableHeader>Header 2</TableHeader>
          <TableHeader>Header 3</TableHeader>
          <TableHeader width="1%">Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows}
      </TableBody>
      <TableFoot>
        <TableRow id="draggable-table-row-foot">
          <TableCell colSpan={4}>
            <div style={{ display: "flex", justifyContent: "center" }}>Footer</div>
          </TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  );
};

export const SelectableTable = () => {
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
          onRowSelect={() => handleRowSelect("all")}
          isSelected={selectedRows.length === 3}
        >
          <TableHeader>Header 1</TableHeader>
          <TableHeader>Header 2</TableHeader>
          <TableHeader>Header 3</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow 
          id="selectable-table-row-body-1"
          onRowSelect={() => handleRowSelect("selectable-table-row-body-1")}
          isSelected={selectedRows.includes("selectable-table-row-body-1")}
        >
          <TableCell>Data 1</TableCell>
          <TableCell>Data 2</TableCell>
          <TableCell>Data 3</TableCell>
        </TableRow>
        <TableRow 
          id="selectable-table-row-body-2"
          onRowSelect={() => handleRowSelect("selectable-table-row-body-2")}
          isSelected={selectedRows.includes("selectable-table-row-body-2")}
        >
          <TableCell>Data 4</TableCell>
          <TableCell>Data 5</TableCell>
          <TableCell>Data 6</TableCell>
        </TableRow>
        <TableRow 
          id="selectable-table-row-body-3"
          onRowSelect={() => handleRowSelect("selectable-table-row-body-3")}
          isSelected={selectedRows.includes("selectable-table-row-body-3")}
        >
          <TableCell>Data 7</TableCell>
          <TableCell>Data 8</TableCell>
          <TableCell>Data 9</TableCell>
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
        <TableHeader>Header 1</TableHeader>
        <TableHeader>Header 2</TableHeader>
        <TableHeader>Header 3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow
        id={`${borderThickness}-cell-borders-row-body-1`}
        borderThickness={borderThickness}
      >
        <TableCell>Data 1</TableCell>
        <TableCell>Data 2</TableCell>
        <TableCell>Data 3</TableCell>
      </TableRow>
      <TableRow
        id={`${borderThickness}-cell-borders-row-body-2`}
        borderThickness={borderThickness}
      >
        <TableCell>Data 4</TableCell>
        <TableCell>Data 5</TableCell>
        <TableCell>Data 6</TableCell>
      </TableRow>
      <TableRow
        id={`${borderThickness}-cell-borders-row-body-3`}
      >
        <TableCell>Data 7</TableCell>
        <TableCell>Data 8</TableCell>
        <TableCell>Data 9</TableCell>
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
        <TableHeader borderThickness={borderThickness}>Header 1</TableHeader>
        <TableHeader borderThickness={borderThickness}>Header 2</TableHeader>
        <TableHeader>Header 3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow id={`${borderThickness}-vertical-cell-borders-row-body-1`}>
        <TableCell borderThickness={borderThickness}>Data 1</TableCell>
        <TableCell borderThickness={borderThickness}>Data 2</TableCell>
        <TableCell>Data 3</TableCell>
      </TableRow>
      <TableRow id={`${borderThickness}-vertical-cell-borders-row-body-2`}>
        <TableCell borderThickness={borderThickness}>Data 4</TableCell>
        <TableCell borderThickness={borderThickness}>Data 5</TableCell>
        <TableCell>Data 6</TableCell>
      </TableRow>
      <TableRow id={`${borderThickness}-vertical-cell-borders-row-body-3`}>
        <TableCell borderThickness={borderThickness}>Data 7</TableCell>
        <TableCell borderThickness={borderThickness}>Data 8</TableCell>
        <TableCell>Data 9</TableCell>
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
        <TableHeader>Header 1</TableHeader>
        <TableHeader>Header 2</TableHeader>
        <TableHeader>Header 3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow id="no-outer-borders-row-body-1">
        <TableCell>Data 1</TableCell>
        <TableCell>Data 2</TableCell>
        <TableCell>Data 3</TableCell>
      </TableRow>
      <TableRow id="no-outer-borders-row-body-2">
        <TableCell>Data 4</TableCell>
        <TableCell>Data 5</TableCell>
        <TableCell>Data 6</TableCell>
      </TableRow>
      <TableRow id="no-outer-borders-row-body-3">
        <TableCell>Data 7</TableCell>
        <TableCell>Data 8</TableCell>
        <TableCell>Data 9</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const ExpandableTable = () => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <Button onClick={() => setExpanded(p => !p)}>{expanded ? "Collapse" : "Expand"}</Button>
      <Table variant="prominent">
        <TableHead>
          <TableRow id="expandable-table-row-head">
            <TableHeader>Product</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            id="expandable-table-row-1"
            isExpanded={expanded}
            subRows={
              <>
                <TableRow id="expandable-table-row-1-sub-row-1">
                  <TableCell>Product A1</TableCell>
                  <TableCell>Child product</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow id="expandable-table-row-1-sub-row-2">
                  <TableCell>Product A2</TableCell>
                  <TableCell>Child product</TableCell>
                  <TableCell>Inactive</TableCell>
                </TableRow>
              </>
            }
          >
            <TableCell>Product A</TableCell>
            <TableCell>Parent product</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow
            id="expandable-table-row-2"
            isExpanded={expanded}
            subRows={
              <>
                <TableRow id="expandable-table-row-2-sub-row-1">
                  <TableCell>Product A1</TableCell>
                  <TableCell>Child product</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow id="expandable-table-row-2-sub-row-2">
                  <TableCell>Product A2</TableCell>
                  <TableCell>Child product</TableCell>
                  <TableCell>Inactive</TableCell>
                </TableRow>
              </>
            }  
          >
            <TableCell>Product B</TableCell>
            <TableCell>Standard product</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export const ZebraStripedTable = () => (
  <Table isZebraStriped variant="prominent">
    <TableHead>
      <TableRow id="zebra-striped-table-row-head">
        <TableHeader>Product</TableHeader>
        <TableHeader>Type</TableHeader>
        <TableHeader>Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: 6 }, (_, index) => (
        <TableRow key={index} id={`zebra-striped-table-row-${index + 1}`}>
          <TableCell>{`Product ${index + 1}`}</TableCell>
          <TableCell>{index % 2 === 0 ? "Standard" : "Premium"}</TableCell>
          <TableCell>{index % 3 === 0 ? "Inactive" : "Active"}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const StickyHeaderAndFooterTable = () => (
  <Table variant="prominent" stickyRow="both">
    <TableHead>
      <TableRow id="sticky-rows-table-row-head">
        <TableHeader>Product</TableHeader>
        <TableHeader>Type</TableHeader>
        <TableHeader>Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: 35 }, (_, index) => (
        <TableRow key={index} id={`sticky-rows-table-row-${index + 1}`}>
          <TableCell>{`Product ${index + 1}`}</TableCell>
          <TableCell>{index % 2 === 0 ? "Standard" : "Premium"}</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFoot>
      <TableRow id="sticky-rows-table-row-foot">
        <TableCell>20 products</TableCell>
        <TableCell>All types</TableCell>
        <TableCell>Summary</TableCell>
      </TableRow>
    </TableFoot>
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
            sortType={sortColumn === "product" ? sortDirection : "unsorted"}
            onSort={() => handleSort("product")}
            aria-sort={sortColumn === "product" ? sortDirection : "none"}
          >
            Product
          </TableHeader>
          <TableHeader
            sortType={sortColumn === "price" ? sortDirection : "unsorted"}
            onSort={() => handleSort("price")}
            aria-sort={sortColumn === "price" ? sortDirection : "none"}
          >
            Price
          </TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedProducts.map(({ id, product, price, status }) => (
          <TableRow key={id} id={`sortable-column-headers-row-${id}`}>
            <TableCell>{product}</TableCell>
            <TableCell>{`£${price}`}</TableCell>
            <TableCell>{status}</TableCell>
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
            <TableHeader width="100px" rowSpan={2} scope="col">
              Product
            </TableHeader>
            <TableHeader borderThickness={variant !== "prominent" ? "none" : undefined} colSpan={2} scope="colgroup">
              Pricing
            </TableHeader>
            <TableHeader borderThickness={variant !== "prominent" ? "none" : undefined} colSpan={2} scope="colgroup">
              Inventory
            </TableHeader>
            <TableHeader width="95px" rowSpan={2} scope="col">
              Actions
            </TableHeader>
          </TableRow>
          <TableRow id="multi-row-column-headers-row-head-2">
            <TableHeader
              variantType="alternate"
              scope="col"
              {...sortableHeaderProps("retailPrice")}
            >
              Retail
            </TableHeader>
            <TableHeader
              variantType="alternate"
              scope="col"
              {...sortableHeaderProps("wholesalePrice")}
            >
              Wholesale
            </TableHeader>
            <TableHeader
              variantType="alternate"
              scope="col"
              {...sortableHeaderProps("inStock")}
            >
              In stock
            </TableHeader>
            <TableHeader
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
                <TableCell>{product}</TableCell>
                <TableCell>{`£${retailPrice}`}</TableCell>
                <TableCell>{`£${wholesalePrice}`}</TableCell>
                <TableCell>{inStock}</TableCell>
                <TableCell>{reserved}</TableCell>
                <TableCell>
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

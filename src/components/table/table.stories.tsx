import React, { useEffect, useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeader,
  TableRow,
} from ".";
import { Checkbox } from "../checkbox";
import Pager, { type PagerProps } from "../pager";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import arrayMove from "../../__internal__/utils/helpers/array-move";

type Feature = "none" | "selectable" | "draggable" | "expandable";
type SortColumn = "product" | "price" | "type" | "status";
type SortDirection = "ascending" | "descending" | "unsorted";
type PlaygroundArgs = React.ComponentProps<typeof Table> & {
  feature: Feature;
  paginationEnabled: boolean;
  paginationCurrentPage: number;
  paginationPageSize: number;
  paginationVariant: PagerProps["variant"];
  paginationSize: PagerProps["size"];
  paginationInteractivePageNumber: boolean;
  paginationShowPageSizeSelection: boolean;
  paginationShowFirstAndLastButtons: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: "Table",
  component: Table,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    feature: {
      options: ["none", "selectable", "draggable", "expandable"],
      control: { type: "radio" },
    },
    variant: {
      options: ["prominent", "subtle-grey", "subtle-white"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    stickyRow: {
      options: ["none", "header", "footer", "both"],
      mapping: {
        none: undefined,
        header: "header",
        footer: "footer",
        both: "both",
      },
      control: { type: "radio" },
    },
    stickyColumn: {
      options: ["none", "first", "last", "both"],
      mapping: {
        none: undefined,
        first: "first",
        last: "last",
        both: "both",
      },
      control: { type: "radio" },
    },
    outerBorders: {
      options: ["none", "small"],
      control: { type: "radio" },
    },
    horizontalBorderThickness: {
      options: ["none", "small", "medium", "large"],
      control: { type: "radio" },
    },
    verticalBorderThickness: {
      options: ["none", "small", "medium", "large"],
      control: { type: "radio" },
    },
    maxWidth: {
      control: "text",
    },
    isZebraStriped: {
      control: "boolean",
    },
    paginationEnabled: {
      name: "enabled",
      control: "boolean",
      table: {
        category: "Pagination",
      },
    },
    paginationCurrentPage: {
      name: "currentPage",
      control: {
        type: "number",
        min: 1,
      },
      if: {
        arg: "paginationEnabled",
        truthy: true,
      },
      table: {
        category: "Pagination",
      },
    },
    paginationPageSize: {
      name: "pageSize",
      options: [5, 10, 25],
      control: "select",
      if: {
        arg: "paginationEnabled",
        truthy: true,
      },
      table: {
        category: "Pagination",
      },
    },
    paginationVariant: {
      name: "variant",
      options: ["default", "alternate"],
      control: "radio",
      if: {
        arg: "paginationEnabled",
        truthy: true,
      },
      table: {
        category: "Pagination",
      },
    },
    paginationSize: {
      name: "size",
      options: ["small", "medium", "large"],
      control: "radio",
      if: {
        arg: "paginationEnabled",
        truthy: true,
      },
      table: {
        category: "Pagination",
      },
    },
    paginationInteractivePageNumber: {
      name: "interactivePageNumber",
      control: "boolean",
      if: {
        arg: "paginationEnabled",
        truthy: true,
      },
      table: {
        category: "Pagination",
      },
    },
    paginationShowPageSizeSelection: {
      name: "showPageSizeSelection",
      control: "boolean",
      if: {
        arg: "paginationEnabled",
        truthy: true,
      },
      table: {
        category: "Pagination",
      },
    },
    paginationShowFirstAndLastButtons: {
      name: "showFirstAndLastButtons",
      control: "boolean",
      if: {
        arg: "paginationEnabled",
        truthy: true,
      },
      table: {
        category: "Pagination",
      },
    },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

type RowData = {
  id: number;
  product: string;
  price: number;
  status: string;
  type: string;
};

const demoRows: RowData[] = [
  {
    id: 1,
    product: "Product A",
    price: 12,
    status: "Active",
    type: "Standard",
  },
  {
    id: 2,
    product: "Product D",
    price: 9,
    status: "Inactive",
    type: "Premium",
  },
  { id: 3, product: "Product C", price: 28, status: "Active", type: "Custom" },
  {
    id: 4,
    product: "Product H",
    price: 31,
    status: "Inactive",
    type: "Standard",
  },
  { id: 5, product: "Product B", price: 18, status: "Active", type: "Premium" },
  { id: 6, product: "Product G", price: 25, status: "Active", type: "Custom" },
  {
    id: 7,
    product: "Product F",
    price: 15,
    status: "Inactive",
    type: "Standard",
  },
  { id: 8, product: "Product E", price: 22, status: "Active", type: "Premium" },
  {
    id: 9,
    product: "Product J",
    price: 40,
    status: "Inactive",
    type: "Custom",
  },
  {
    id: 10,
    product: "Product I",
    price: 17,
    status: "Active",
    type: "Standard",
  },
] as const;

const sortRows = (
  rows: RowData[],
  column: SortColumn,
  direction: SortDirection,
) => {
  const sortedRows = [...rows].sort((first, second) => {
    const firstValue = first[column];
    const secondValue = second[column];

    if (column === "price") {
      return direction === "ascending"
        ? Number(firstValue) - Number(secondValue)
        : Number(secondValue) - Number(firstValue);
    }

    return direction === "ascending"
      ? String(firstValue).localeCompare(String(secondValue))
      : String(secondValue).localeCompare(String(firstValue));
  });

  return sortedRows;
};

const moveRows = (
  rows: RowData[],
  rowToMove: number,
  target: "up" | "down" | "top" | "bottom",
): RowData[] => {
  const rowIndex = rows.findIndex(({ id }) => id === rowToMove);

  if (rowIndex === -1) return rows;

  const nextRows = [...rows];

  switch (target) {
    case "up":
      if (rowIndex === 0) return rows;
      return arrayMove({
        array: nextRows,
        startIndex: rowIndex,
        endIndex: rowIndex - 1,
      });

    case "down":
      if (rowIndex === rows.length - 1) return rows;
      return arrayMove({
        array: nextRows,
        startIndex: rowIndex,
        endIndex: rowIndex + 1,
      });

    case "top":
      return arrayMove({
        array: nextRows,
        startIndex: rowIndex,
        endIndex: 0,
      });

    case "bottom":
      return arrayMove({
        array: nextRows,
        startIndex: rowIndex,
        endIndex: rows.length - 1,
      });
  }
};

export const Playground: Story = {
  render: (args) => {
    const {
      feature,
      paginationEnabled,
      paginationCurrentPage,
      paginationPageSize,
      paginationVariant,
      paginationSize,
      paginationInteractivePageNumber,
      paginationShowPageSizeSelection,
      paginationShowFirstAndLastButtons,
      ...tableArgs
    } = args;
    const [rows, setRows] = useState<RowData[]>(() =>
      sortRows([...demoRows], "product", "ascending"),
    );
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [sortColumn, setSortColumn] = useState<SortColumn>("product");
    const [sortDirection, setSortDirection] =
      useState<SortDirection>("ascending");
    const [currentPage, setCurrentPage] = useState(paginationCurrentPage);
    const [pageSize, setPageSize] = useState(paginationPageSize);

    useEffect(() => {
      setCurrentPage(paginationCurrentPage);
    }, [paginationCurrentPage]);

    useEffect(() => {
      setPageSize(paginationPageSize);
    }, [paginationPageSize]);

    const visibleRows = useMemo(() => {
      if (!paginationEnabled) return rows;

      const start = (currentPage - 1) * pageSize;
      return rows.slice(start, start + pageSize);
    }, [currentPage, pageSize, paginationEnabled, rows]);

    const handleSort = (column: SortColumn) => {
      const nextDirection: SortDirection =
        sortColumn === column && sortDirection === "ascending"
          ? "descending"
          : "ascending";

      setRows((previousRows) => sortRows(previousRows, column, nextDirection));
      setSortColumn(column);
      setSortDirection(nextDirection);
    };

    const isSelectable = feature === "selectable";
    const isDraggable = feature === "draggable";
    const isExpandable = feature === "expandable";

    const handleRowSelect = (rowId: number) => {
      setSelectedRows((previous) =>
        previous.includes(rowId)
          ? previous.filter((id) => id !== rowId)
          : [...previous, rowId],
      );
    };

    const handleRowMove = (
      rowId: number,
      target: "up" | "down" | "top" | "bottom",
    ) => {
      setRows((previousRows) => moveRows(previousRows, rowId, target));
      setSortDirection("unsorted");
    };

    const handleOrderChange = (
      orderedIds: (string | number | undefined)[] = [],
    ) => {
      const visibleRowIdsByElementId = new Map(
        visibleRows.map(({ id }) => [`playground-row-${id}`, id]),
      );
      const orderedVisibleIds = orderedIds
        .map((id) => visibleRowIdsByElementId.get(String(id)))
        .filter((id): id is number => id !== undefined);
      const orderedVisibleIdSet = new Set(orderedVisibleIds);

      setRows((previousRows) => {
        const rowsById = new Map(previousRows.map((row) => [row.id, row]));
        const reorderedVisibleRows = orderedVisibleIds
          .map((id) => rowsById.get(id))
          .filter((row): row is RowData => row !== undefined);
        let visibleIndex = 0;

        return previousRows.map((row) => {
          if (!orderedVisibleIdSet.has(row.id)) return row;

          const reorderedRow = reorderedVisibleRows[visibleIndex] ?? row;
          visibleIndex += 1;
          return reorderedRow;
        });
      });
      setSortDirection("unsorted");
    };

    const pagination = paginationEnabled ? (
      <Pager
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={rows.length}
        variant={paginationVariant}
        size={paginationSize}
        interactivePageNumber={paginationInteractivePageNumber}
        showPageSizeSelection={paginationShowPageSizeSelection}
        showFirstAndLastButtons={paginationShowFirstAndLastButtons}
        pageSizeSelectionOptions={[
          { id: "5", name: 5 },
          { id: "10", name: 10 },
        ]}
        onPagination={(nextPage, nextPageSize) => {
          setCurrentPage(nextPage);
          setPageSize(nextPageSize);
        }}
      />
    ) : null;

    return (
      <Table {...tableArgs} isDraggable={isDraggable} pagination={pagination}>
        <TableHead>
          <TableRow id="playground-head-row">
            {isSelectable && (
              <TableHeader id="playground-head-select" width="80px">
                <Checkbox
                  checked={selectedRows.length === rows.length}
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < rows.length
                  }
                  onChange={() => {
                    if (selectedRows.length === rows.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(rows.map(({ id }) => id));
                    }
                  }}
                  onClick={(ev: React.MouseEvent<HTMLInputElement>) =>
                    ev.stopPropagation()
                  }
                  data-component="table-cell-select-checkbox"
                  data-role="table-cell-select-checkbox"
                  aria-labelledby="playground-head-select"
                />
              </TableHeader>
            )}
            <TableHeader
              id="playground-head-product"
              sortType={sortColumn === "product" ? sortDirection : "unsorted"}
              onSort={() => handleSort("product")}
              aria-sort={
                sortColumn === "product" && sortDirection !== "unsorted"
                  ? sortDirection
                  : "none"
              }
              width={
                (isDraggable || isExpandable) && tableArgs.maxWidth
                  ? "140px"
                  : undefined
              }
            >
              Product
            </TableHeader>
            <TableHeader
              id="playground-head-type"
              sortType={sortColumn === "type" ? sortDirection : "unsorted"}
              onSort={() => handleSort("type")}
              aria-sort={
                sortColumn === "type" && sortDirection !== "unsorted"
                  ? sortDirection
                  : "none"
              }
              width={
                (isDraggable || isExpandable) && tableArgs.maxWidth
                  ? "140px"
                  : undefined
              }
            >
              Type
            </TableHeader>
            <TableHeader
              id="playground-head-status"
              sortType={sortColumn === "status" ? sortDirection : "unsorted"}
              onSort={() => handleSort("status")}
              aria-sort={
                sortColumn === "status" && sortDirection !== "unsorted"
                  ? sortDirection
                  : "none"
              }
            >
              Status
            </TableHeader>
            <TableHeader
              id="playground-head-price"
              sortType={sortColumn === "price" ? sortDirection : "unsorted"}
              onSort={() => handleSort("price")}
              aria-sort={
                sortColumn === "price" && sortDirection !== "unsorted"
                  ? sortDirection
                  : "none"
              }
              width={
                (isDraggable || isExpandable) && tableArgs.maxWidth
                  ? "120px"
                  : undefined
              }
              align="right"
            >
              Price
            </TableHeader>
            {isDraggable && <TableHeader width="80px">Actions</TableHeader>}
          </TableRow>
        </TableHead>

        <TableBody getOrder={handleOrderChange}>
          {visibleRows.map(({ id, product, type, status, price }, index) => (
            <TableRow
              key={id}
              id={`playground-row-${id}`}
              isSelected={isSelectable && selectedRows.includes(id)}
              subRows={
                isExpandable ? (
                  <>
                    <TableRow id={`playground-row-${id}-sub-a`}>
                      <TableCell id={`playground-row-${id}-sub-a-product`}>
                        Detail A
                      </TableCell>
                      <TableCell id={`playground-row-${id}-sub-a-type`}>
                        Additional info
                      </TableCell>
                      <TableCell id={`playground-row-${id}-sub-a-status`}>
                        {index % 2 === 0 ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell
                        align="right"
                        id={`playground-row-${id}-sub-a-price`}
                      >
                        £{price + 5}
                      </TableCell>
                    </TableRow>
                    <TableRow id={`playground-row-${id}-sub-b`}>
                      <TableCell id={`playground-row-${id}-sub-b-product`}>
                        Detail B
                      </TableCell>
                      <TableCell id={`playground-row-${id}-sub-b-type`}>
                        More details
                      </TableCell>
                      <TableCell id={`playground-row-${id}-sub-b-status`}>
                        {index % 3 === 0 ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell id={`playground-row-${id}-sub-b-price`}>
                        £{price + 10}
                      </TableCell>
                    </TableRow>
                  </>
                ) : undefined
              }
              isExpanded={isExpandable && index === 0}
              draggableProps={isDraggable ? { index } : undefined}
            >
              {isSelectable && (
                <TableCell id={`playground-body-select-${id}`}>
                  <Checkbox
                    checked={selectedRows.includes(id)}
                    onChange={() => handleRowSelect(id)}
                    onClick={(ev) => ev.stopPropagation()}
                    data-component="table-cell-select-checkbox"
                    data-role="table-cell-select-checkbox"
                    aria-labelledby={`playground-body-select-${id}`}
                  />
                </TableCell>
              )}
              <TableCell as="th" id={`playground-body-product-${id}`}>
                {product}
              </TableCell>
              <TableCell id={`playground-body-type-${id}`}>{type}</TableCell>
              <TableCell id={`playground-body-status-${id}`}>
                {status}
              </TableCell>
              <TableCell align="right" id={`playground-body-price-${id}`}>
                £{price}
              </TableCell>
              {isDraggable && (
                <TableCell id={`playground-body-actions-${id}`}>
                  <ActionPopover>
                    <ActionPopoverItem onClick={() => handleRowMove(id, "up")}>
                      Move up
                    </ActionPopoverItem>
                    <ActionPopoverItem
                      onClick={() => handleRowMove(id, "down")}
                    >
                      Move down
                    </ActionPopoverItem>
                    <ActionPopoverItem onClick={() => handleRowMove(id, "top")}>
                      Move to top
                    </ActionPopoverItem>
                    <ActionPopoverItem
                      onClick={() => handleRowMove(id, "bottom")}
                    >
                      Move to bottom
                    </ActionPopoverItem>
                  </ActionPopover>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>

        <TableFoot>
          <TableRow id="playground-foot-row">
            {isSelectable && (
              <TableCell id="playground-foot-select"> </TableCell>
            )}
            <TableCell id="playground-foot-product">10 products</TableCell>
            <TableCell id="playground-foot-type">All types</TableCell>
            <TableCell id="playground-foot-status">Summary</TableCell>
            <TableCell align="right" id="playground-foot-price">
              Total: £217
            </TableCell>
            {isDraggable && (
              <TableCell id="playground-foot-actions"> </TableCell>
            )}
          </TableRow>
        </TableFoot>
      </Table>
    );
  },
  args: {
    feature: "none",
    variant: "prominent",
    size: "medium",
    isZebraStriped: false,
    maxWidth: undefined,
    stickyRow: undefined,
    stickyColumn: undefined,
    outerBorders: "small",
    horizontalBorderThickness: "small",
    verticalBorderThickness: "small",
    paginationEnabled: true,
    paginationCurrentPage: 1,
    paginationPageSize: 10,
    paginationVariant: "default",
    paginationSize: "medium",
    paginationInteractivePageNumber: true,
    paginationShowPageSizeSelection: true,
    paginationShowFirstAndLastButtons: true,
  },
  parameters: {
    controls: {
      exclude: ["children", "isDraggable", "pagination"],
    },
  },
};

Playground.storyName = "Playground";

export const Draggable: Story = {
  render: () => {
    const [rows, setRows] = useState<RowData[]>(() => demoRows.slice(0, 5));

    const handleOrderChange = (
      orderedIds: (string | number | undefined)[] = [],
    ) => {
      setRows((previousRows) => {
        const rowsByElementId = new Map(
          previousRows.map((row) => [`draggable-row-${row.id}`, row]),
        );
        const reorderedRows = orderedIds
          .map((id) => rowsByElementId.get(String(id)))
          .filter((row): row is RowData => row !== undefined);

        return reorderedRows.length === previousRows.length
          ? reorderedRows
          : previousRows;
      });
    };

    return (
      <Table isDraggable>
        <TableHead>
          <TableRow id="draggable-head-row">
            <TableHeader id="draggable-head-product">Product</TableHeader>
            <TableHeader id="draggable-head-type">Type</TableHeader>
            <TableHeader id="draggable-head-status">Status</TableHeader>
            <TableHeader id="draggable-head-actions" width="80px">
              Actions
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody getOrder={handleOrderChange}>
          {rows.map(({ id, product, type, status }) => (
            <TableRow key={id} id={`draggable-row-${id}`}>
              <TableCell id={`draggable-product-${id}`}>{product}</TableCell>
              <TableCell id={`draggable-type-${id}`}>{type}</TableCell>
              <TableCell id={`draggable-status-${id}`}>{status}</TableCell>
              <TableCell id={`draggable-actions-${id}`}>
                <ActionPopover>
                  <ActionPopoverItem
                    onClick={() =>
                      setRows((previousRows) =>
                        moveRows(previousRows, id, "up"),
                      )
                    }
                  >
                    Move up
                  </ActionPopoverItem>
                  <ActionPopoverItem
                    onClick={() =>
                      setRows((previousRows) =>
                        moveRows(previousRows, id, "down"),
                      )
                    }
                  >
                    Move down
                  </ActionPopoverItem>
                </ActionPopover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const Selectable: Story = {
  render: () => {
    const rows = demoRows.slice(0, 5);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const allRowsSelected = selectedRows.length === rows.length;

    const handleRowSelect = (rowId: number) => {
      setSelectedRows((previous) =>
        previous.includes(rowId)
          ? previous.filter((id) => id !== rowId)
          : [...previous, rowId],
      );
    };

    return (
      <Table>
        <TableHead>
          <TableRow id="selectable-head-row">
            <TableHeader id="selectable-head-select" width="80px">
              <Checkbox
                checked={allRowsSelected}
                indeterminate={selectedRows.length > 0 && !allRowsSelected}
                onChange={() =>
                  setSelectedRows(
                    allRowsSelected ? [] : rows.map(({ id }) => id),
                  )
                }
                aria-label="Select all rows"
              />
            </TableHeader>
            <TableHeader id="selectable-head-product">Product</TableHeader>
            <TableHeader id="selectable-head-type">Type</TableHeader>
            <TableHeader id="selectable-head-status">Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ id, product, type, status }) => (
            <TableRow
              key={id}
              id={`selectable-row-${id}`}
              isSelected={selectedRows.includes(id)}
            >
              <TableCell id={`selectable-select-${id}`}>
                <Checkbox
                  checked={selectedRows.includes(id)}
                  onChange={() => handleRowSelect(id)}
                  aria-label={`Select ${product}`}
                />
              </TableCell>
              <TableCell id={`selectable-product-${id}`}>{product}</TableCell>
              <TableCell id={`selectable-type-${id}`}>{type}</TableCell>
              <TableCell id={`selectable-status-${id}`}>{status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const Expandable: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow id="expandable-head-row">
          <TableHeader id="expandable-head-product">Product</TableHeader>
          <TableHeader id="expandable-head-type">Type</TableHeader>
          <TableHeader id="expandable-head-status">Status</TableHeader>
          <TableHeader id="expandable-head-price" align="right">
            Price
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow
          id="expandable-row-1"
          isExpanded
          subRows={
            <>
              <TableRow id="expandable-row-1-detail-1">
                <TableCell id="expandable-detail-1-product">
                  Product A1
                </TableCell>
                <TableCell id="expandable-detail-1-type">Component</TableCell>
                <TableCell id="expandable-detail-1-status">Active</TableCell>
                <TableCell id="expandable-detail-1-price" align="right">
                  £7
                </TableCell>
              </TableRow>
              <TableRow id="expandable-row-1-detail-2">
                <TableCell id="expandable-detail-2-product">
                  Product A2
                </TableCell>
                <TableCell id="expandable-detail-2-type">Service</TableCell>
                <TableCell id="expandable-detail-2-status">Active</TableCell>
                <TableCell id="expandable-detail-2-price" align="right">
                  £5
                </TableCell>
              </TableRow>
            </>
          }
        >
          <TableCell id="expandable-product-1">Product A</TableCell>
          <TableCell id="expandable-type-1">Bundle</TableCell>
          <TableCell id="expandable-status-1">Active</TableCell>
          <TableCell id="expandable-price-1" align="right">
            £12
          </TableCell>
        </TableRow>
        <TableRow id="expandable-row-2">
          <TableCell id="expandable-product-2">Product B</TableCell>
          <TableCell id="expandable-type-2">Standard</TableCell>
          <TableCell id="expandable-status-2">Inactive</TableCell>
          <TableCell id="expandable-price-2" align="right">
            £18
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const StickyRows: Story = {
  render: () => (
    <Table stickyRow="both">
      <TableHead>
        <TableRow id="sticky-rows-head-row">
          <TableHeader id="sticky-rows-head-product">Product</TableHeader>
          <TableHeader id="sticky-rows-head-type">Type</TableHeader>
          <TableHeader id="sticky-rows-head-status">Status</TableHeader>
          <TableHeader id="sticky-rows-head-price" align="right">
            Price
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {demoRows.map(({ id, product, type, status, price }) => (
          <TableRow key={id} id={`sticky-rows-row-${id}`}>
            <TableCell id={`sticky-rows-product-${id}`}>{product}</TableCell>
            <TableCell id={`sticky-rows-type-${id}`}>{type}</TableCell>
            <TableCell id={`sticky-rows-status-${id}`}>{status}</TableCell>
            <TableCell id={`sticky-rows-price-${id}`} align="right">
              £{price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableRow id="sticky-rows-foot-row">
          <TableCell id="sticky-rows-foot-product">5 products</TableCell>
          <TableCell id="sticky-rows-foot-type">All types</TableCell>
          <TableCell id="sticky-rows-foot-status">Summary</TableCell>
          <TableCell id="sticky-rows-foot-price" align="right">
            £89
          </TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  ),
};

export const StickyColumns: Story = {
  render: () => (
    <Table maxWidth="420px" stickyColumn="both">
      <TableHead>
        <TableRow id="sticky-columns-head-row">
          <TableHeader id="sticky-columns-head-product" width="160px">
            Product
          </TableHeader>
          <TableHeader id="sticky-columns-head-type" width="180px">
            Type
          </TableHeader>
          <TableHeader id="sticky-columns-head-status" width="180px">
            Status
          </TableHeader>
          <TableHeader
            id="sticky-columns-head-price"
            width="140px"
            align="right"
          >
            Price
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {demoRows.slice(0, 5).map(({ id, product, type, status, price }) => (
          <TableRow key={id} id={`sticky-columns-row-${id}`}>
            <TableCell id={`sticky-columns-product-${id}`}>{product}</TableCell>
            <TableCell id={`sticky-columns-type-${id}`}>{type}</TableCell>
            <TableCell id={`sticky-columns-status-${id}`}>{status}</TableCell>
            <TableCell id={`sticky-columns-price-${id}`} align="right">
              £{price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

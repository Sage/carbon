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
    children: {
      control: false,
    },
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
    isDraggable: {
      control: false,
    },
    pagination: {
      control: false,
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

const demoRows = [
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
  rows: typeof demoRows,
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
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [sortColumn, setSortColumn] = useState<SortColumn>("product");
    const [sortDirection, setSortDirection] = useState<SortDirection>("ascending");
    const [currentPage, setCurrentPage] = useState(paginationCurrentPage);
    const [pageSize, setPageSize] = useState(paginationPageSize);

    const sortedRows = useMemo(
      () => sortRows(demoRows, sortColumn, sortDirection),
      [sortColumn, sortDirection],
    );

    useEffect(() => {
      setCurrentPage(paginationCurrentPage);
    }, [paginationCurrentPage]);

    useEffect(() => {
      setPageSize(paginationPageSize);
    }, [paginationPageSize]);

    const visibleRows = useMemo(() => {
      if (!paginationEnabled) return sortedRows;

      const start = (currentPage - 1) * pageSize;
      return sortedRows.slice(start, start + pageSize);
    }, [currentPage, pageSize, paginationEnabled, sortedRows]);

    const handleSort = (column: SortColumn) => {
      if (sortColumn === column) {
        setSortDirection((previous) =>
          previous === "ascending" ? "descending" : "ascending",
        );
        return;
      }

      setSortColumn(column);
      setSortDirection("ascending");
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

    const pagination = paginationEnabled ? (
      <Pager
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={sortedRows.length}
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
      <Table
        {...tableArgs}
        isDraggable={isDraggable}
        pagination={pagination}
      >
        <TableHead>
          <TableRow id="playground-head-row">
            {isSelectable && (
              <TableHeader id="playground-head-select" width="80px">
                <Checkbox
                  checked={selectedRows.length === sortedRows.length}
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < sortedRows.length
                  }
                  onChange={() => {
                    if (selectedRows.length === sortedRows.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(sortedRows.map(({ id }) => id));
                    }
                  }}
                  onClick={(ev: React.MouseEvent<HTMLInputElement>) => ev.stopPropagation()}
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
              aria-sort={sortColumn === "product" && sortDirection !== "unsorted" ? sortDirection : "none"}
              width="140px"
            >
              Product
            </TableHeader>
            <TableHeader
              id="playground-head-type"
              sortType={sortColumn === "type" ? sortDirection : "unsorted"}
              onSort={() => handleSort("type")}
              aria-sort={sortColumn === "type" && sortDirection !== "unsorted" ? sortDirection : "none"}
            >
              Type
            </TableHeader>
            <TableHeader
              id="playground-head-status"
              sortType={sortColumn === "status" ? sortDirection : "unsorted"}
              onSort={() => handleSort("status")}
              aria-sort={sortColumn === "status" && sortDirection !== "unsorted" ? sortDirection : "none"}
            >
              Status
            </TableHeader>
            <TableHeader
              id="playground-head-price"
              sortType={sortColumn === "price" ? sortDirection : "unsorted"}
              onSort={() => handleSort("price")}
              aria-sort={sortColumn === "price" && sortDirection !== "unsorted" ? sortDirection : "none"}
            >
              Price
            </TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
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
                      <TableCell id={`playground-row-${id}-sub-a-price`}>
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
              <TableCell id={`playground-body-product-${id}`}>
                {product}
              </TableCell>
              <TableCell id={`playground-body-type-${id}`}>{type}</TableCell>
              <TableCell id={`playground-body-status-${id}`}>
                {status}
              </TableCell>
              <TableCell id={`playground-body-price-${id}`}>£{price}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFoot>
          <TableRow id="playground-foot-row">
            {isSelectable && (
              <TableCell id="playground-foot-select">
                {" "}
              </TableCell>
            )}
            <TableCell id="playground-foot-product">10 products</TableCell>
            <TableCell id="playground-foot-type">All types</TableCell>
            <TableCell id="playground-foot-status">Summary</TableCell>
            <TableCell id="playground-foot-price">Total: £217</TableCell>
          </TableRow>
        </TableFoot>
      </Table>
    );
  },
  args: {
    feature: "none",
    variant: "subtle-white",
    size: "large",
    isZebraStriped: false,
    maxWidth: "400px",
    stickyRow: undefined,
    stickyColumn: "both",
    outerBorders: "small",
    horizontalBorderThickness: "small",
    verticalBorderThickness: "none",
    paginationEnabled: true,
    paginationCurrentPage: 1,
    paginationPageSize: 10,
    paginationVariant: "default",
    paginationSize: "large",
    paginationInteractivePageNumber: false,
    paginationShowPageSizeSelection: false,
    paginationShowFirstAndLastButtons: true,
  },
};

Playground.storyName = "Playground";

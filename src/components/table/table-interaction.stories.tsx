import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from ".";
import { Checkbox } from "../..";

const meta = {
  title: "Table/Interactions",
  component: Table,
  args: {
    children: null,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    themeProvider: { chromatic: { theme: "sage" } },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const products = [
  { id: 1, product: "Product C", price: 25, status: "Active" },
  { id: 2, product: "Product A", price: 10, status: "Inactive" },
  { id: 3, product: "Product B", price: 40, status: "Active" },
];

const SortableTable = () => {
  const [sortColumn, setSortColumn] = React.useState<"product" | "price">(
    "product",
  );
  const [sortDirection, setSortDirection] = React.useState<
    "ascending" | "descending"
  >("ascending");

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
    const result =
      typeof firstValue === "string"
        ? firstValue.localeCompare(secondValue as string)
        : firstValue - (secondValue as number);

    return sortDirection === "ascending" ? result : -result;
  });

  return (
    <Table variant="prominent">
      <TableHead>
        <TableRow id="interaction-sort-header">
          <TableHeader
            id="interaction-sort-product"
            sortType={sortColumn === "product" ? sortDirection : "unsorted"}
            onSort={() => handleSort("product")}
            aria-sort={sortColumn === "product" ? sortDirection : "none"}
          >
            Product
          </TableHeader>
          <TableHeader
            id="interaction-sort-price"
            sortType={sortColumn === "price" ? sortDirection : "unsorted"}
            onSort={() => handleSort("price")}
            aria-sort={sortColumn === "price" ? sortDirection : "none"}
          >
            Price
          </TableHeader>
          <TableHeader id="interaction-sort-status">Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedProducts.map(({ id, product, price, status }) => (
          <TableRow key={id} id={`interaction-sort-row-${id}`}>
            <TableCell id={`interaction-sort-row-${id}-product`}>{product}</TableCell>
            <TableCell id={`interaction-sort-row-${id}-price`}>{`£${price}`}</TableCell>
            <TableCell id={`interaction-sort-row-${id}-status`}>{status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const SortByPriceDescending: Story = {
  render: () => <SortableTable />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const priceSortButton = canvas.getByRole("button", { name: "Price" });

    await userEvent.click(priceSortButton);
    await userEvent.click(priceSortButton);

    await expect(priceSortButton).toHaveAttribute(
      "data-sort-type",
      "descending",
    );
    await expect(canvas.getAllByRole("row")[1]).toHaveAccessibleName(
      "Product B £40 Active",
    );
  },
};

const SelectableTable = () => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const rowIds = [
    "interaction-select-row-1",
    "interaction-select-row-2",
    "interaction-select-row-3",
  ];

  const toggleRow = (rowId: string) => {
    setSelectedRows((currentRows) =>
      currentRows.includes(rowId)
        ? currentRows.filter((currentRowId) => currentRowId !== rowId)
        : [...currentRows, rowId],
    );
  };

  const toggleAllRows = () => {
    setSelectedRows((currentRows) =>
      currentRows.length === rowIds.length ? [] : rowIds,
    );
  };

  return (
    <Table variant="prominent">
      <TableHead>
        <TableRow
          id="interaction-select-header"
          isSelected={selectedRows.length === rowIds.length}
        >
          <TableHeader id="interaction-select-header-checkbox" width="80px">
            <Checkbox
              checked={selectedRows.length === rowIds.length}
              indeterminate={selectedRows.length > 0 && selectedRows.length < rowIds.length}
              onChange={toggleAllRows}
              onClick={(ev) => ev.stopPropagation()}
              data-component="table-cell-select-checkbox"
              data-role="table-cell-select-checkbox"
              aria-labelledby="interaction-select-product"
            />
          </TableHeader>
          <TableHeader id="interaction-select-product">Product</TableHeader>
          <TableHeader id="interaction-select-status">Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rowIds.map((rowId, index) => (
          <TableRow
            key={rowId}
            id={rowId}
            isSelected={selectedRows.includes(rowId)}
          >
            <TableCell id={`interaction-select-row-${index + 1}-checkbox`}>
              <Checkbox
                checked={selectedRows.includes(rowId)}
                onChange={() => toggleRow(rowId)}
                onClick={(ev) => ev.stopPropagation()}
                data-component="table-cell-select-checkbox"
                data-role="table-cell-select-checkbox"
                aria-labelledby={`interaction-select-row-${index + 1}-product`}
              />
            </TableCell>
            <TableCell id={`interaction-select-row-${index + 1}-product`}>{`Product ${index + 1}`}</TableCell>
            <TableCell id={`interaction-select-row-${index + 1}-status`}>{index === 1 ? "Inactive" : "Active"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const SelectRows: Story = {
  render: () => <SelectableTable />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole("checkbox");

    await userEvent.click(checkboxes[1]);
    await userEvent.click(checkboxes[3]);

    await expect(checkboxes[1]).toBeChecked();
    await expect(checkboxes[3]).toBeChecked();
    await expect(
      canvas.getByRole("row", { name: "Product 1 Active" }),
    ).toHaveAttribute("data-is-selected", "true");
    await expect(
      canvas.getByRole("row", { name: "Product 3 Active" }),
    ).toHaveAttribute("data-is-selected", "true");
  },
};

const ExpandableTable = () => (
  <Table variant="prominent">
    <TableHead>
      <TableRow id="interaction-expand-header">
        <TableHeader id="interaction-expand-product">Product</TableHeader>
        <TableHeader id="interaction-expand-type">Type</TableHeader>
        <TableHeader id="interaction-expand-status">Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow
        id="interaction-expand-parent"
        subRows={
          <>
            <TableRow id="interaction-expand-child-1">
              <TableCell id="interaction-expand-child-1-product">Product A1</TableCell>
              <TableCell id="interaction-expand-child-1-type">Child product</TableCell>
              <TableCell id="interaction-expand-child-1-status">Active</TableCell>
            </TableRow>
            <TableRow id="interaction-expand-child-2">
              <TableCell id="interaction-expand-child-2-product">Product A2</TableCell>
              <TableCell id="interaction-expand-child-2-type">Child product</TableCell>
              <TableCell id="interaction-expand-child-2-status">Inactive</TableCell>
            </TableRow>
          </>
        }
      >
        <TableCell id="interaction-expand-parent-product">Product A</TableCell>
        <TableCell id="interaction-expand-parent-type">Parent product</TableCell>
        <TableCell id="interaction-expand-parent-status">Active</TableCell>
      </TableRow>
      <TableRow id="interaction-expand-sibling">
        <TableCell id="interaction-expand-sibling-product">Product B</TableCell>
        <TableCell id="interaction-expand-sibling-type">Standard product</TableCell>
        <TableCell id="interaction-expand-sibling-status">Active</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const ExpandRow: Story = {
  render: () => <ExpandableTable />,
  parameters: {
    chromatic: { delay: 300, disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const expandableCell = canvas.getByRole("cell", { name: "Product A" });

    await userEvent.click(expandableCell);

    await expect(expandableCell).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByRole("row", { name: "Product A1 Child product Active" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("row", { name: "Product A2 Child product Inactive" }),
    ).toBeVisible();
  },
};

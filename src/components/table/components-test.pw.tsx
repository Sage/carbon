import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeader,
  TableProps,
  TableRow,
} from ".";
import { Checkbox } from "../..";

export const TableComponent = (props: Partial<TableProps> = {}) => (
  <Table variant="prominent" {...props}>
    <TableHead>
      <TableRow id="table-head-row">
        <TableHeader id="table-head-product">Product</TableHeader>
        <TableHeader id="table-head-type">Type</TableHeader>
        <TableHeader id="table-head-status">Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow id="table-body-row-1">
        <TableCell id="table-body-product-a">Product A</TableCell>
        <TableCell id="table-body-type-a">Standard</TableCell>
        <TableCell id="table-body-status-a">Active</TableCell>
      </TableRow>
      <TableRow id="table-body-row-2">
        <TableCell id="table-body-product-b">Product B</TableCell>
        <TableCell id="table-body-type-b">Premium</TableCell>
        <TableCell id="table-body-status-b">Inactive</TableCell>
      </TableRow>
      <TableRow id="table-body-row-3">
        <TableCell id="table-body-product-c">Product C</TableCell>
        <TableCell id="table-body-type-c">Custom</TableCell>
        <TableCell id="table-body-status-c">Active</TableCell>
      </TableRow>
    </TableBody>
    <TableFoot>
      <TableRow id="table-foot-row">
        <TableCell id="table-foot-products">3 products</TableCell>
        <TableCell id="table-foot-types">All types</TableCell>
        <TableCell id="table-foot-summary">Summary</TableCell>
      </TableRow>
    </TableFoot>
  </Table>
);

export const ZebraStripedTableComponent = (
  props: Partial<TableProps> = {},
) => (
  <Table variant="prominent" isZebraStriped {...props}>
    <TableHead>
      <TableRow id="zebra-head-row">
        <TableHeader id="zebra-head-product">Product</TableHeader>
        <TableHeader id="zebra-head-type">Type</TableHeader>
        <TableHeader id="zebra-head-status">Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: 6 }, (_, index) => (
        <TableRow key={index} id={`zebra-row-${index + 1}`}>
          <TableCell id={`zebra-body-product-${index + 1}`}>{`Product ${index + 1}`}</TableCell>
          <TableCell id={`zebra-body-type-${index + 1}`}>{index % 2 === 0 ? "Standard" : "Premium"}</TableCell>
          <TableCell id={`zebra-body-status-${index + 1}`}>{index % 3 === 0 ? "Inactive" : "Active"}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const StickyHeaderFooterTableComponent = (
  props: Partial<TableProps> = {},
) => (
  <Table variant="prominent" stickyRow="both" {...props}>
    <TableHead>
      <TableRow id="sticky-head-row">
        <TableHeader id="sticky-head-product">Product</TableHeader>
        <TableHeader id="sticky-head-type">Type</TableHeader>
        <TableHeader id="sticky-head-status">Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: 20 }, (_, index) => (
        <TableRow key={index} id={`sticky-row-${index + 1}`}>
          <TableCell id={`sticky-body-product-${index + 1}`}>{`Product ${index + 1}`}</TableCell>
          <TableCell id={`sticky-body-type-${index + 1}`}>{index % 2 === 0 ? "Standard" : "Premium"}</TableCell>
          <TableCell id={`sticky-body-status-${index + 1}`}>Active</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFoot>
      <TableRow id="sticky-foot-row">
        <TableCell id="sticky-foot-products">20 products</TableCell>
        <TableCell id="sticky-foot-types">All types</TableCell>
        <TableCell id="sticky-foot-summary">Summary</TableCell>
      </TableRow>
    </TableFoot>
  </Table>
);

export const SelectableTableComponent = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([
    "selectable-row-2",
  ]);

  const handleRowSelect = (rowId: string) => {
    if (rowId === "all") {
      if (selectedRows.length === 3) {
        setSelectedRows([]);
      } else {
        setSelectedRows(["selectable-row-1", "selectable-row-2", "selectable-row-3"]);
      }
      return;
    }

    setSelectedRows((previous) =>
      previous.includes(rowId)
        ? previous.filter((currentId) => currentId !== rowId)
        : [...previous, rowId],
    );
  };

  return (
    <Table variant="prominent">
      <TableHead>
        <TableRow
          id="selectable-head-row"
          isSelected={selectedRows.length === 3}
        >
          <TableHeader id="selectable-head-checkbox">
            <Checkbox
              checked={selectedRows.length === 3}
              onChange={() => handleRowSelect("all")}
              onClick={(ev) => ev.stopPropagation()}
              data-component="table-cell-select-checkbox"
              data-role="table-cell-select-checkbox"
              aria-labelledby="selectable-head-checkbox"
            />
          </TableHeader>
          <TableHeader id="selectable-head-product">Product</TableHeader>
          <TableHeader id="selectable-head-type">Type</TableHeader>
          <TableHeader id="selectable-head-status">Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          ["selectable-row-1", "Product A", "Standard", "Active"],
          ["selectable-row-2", "Product B", "Premium", "Inactive"],
          ["selectable-row-3", "Product C", "Custom", "Active"],
        ].map(([id, product, type, status]) => (
          <TableRow
            key={id}
            id={id}
            isSelected={selectedRows.includes(id)}
          >
            <TableCell id={`selectable-body-checkbox-${id}`}>
              <Checkbox
                checked={selectedRows.includes(id)}
                onChange={() => handleRowSelect(id)}
                onClick={(ev) => ev.stopPropagation()}
                data-component="table-cell-select-checkbox"
                data-role="table-cell-select-checkbox"
                aria-labelledby={`selectable-body-checkbox-${id}`}
              />
            </TableCell>
            <TableCell id={`selectable-body-product-${id}`}>{product}</TableCell>
            <TableCell id={`selectable-body-type-${id}`}>{type}</TableCell>
            <TableCell id={`selectable-body-status-${id}`}>{status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const ExpandableTableComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsExpanded((previous) => !previous)}>
        {isExpanded ? "Collapse rows" : "Expand rows"}
      </button>
      <Table variant="prominent">
        <TableHead>
          <TableRow id="expandable-head-row">
            <TableHeader id="expandable-head-product">Product</TableHeader>
            <TableHeader id="expandable-head-type">Type</TableHeader>
            <TableHeader id="expandable-head-status">Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            id="expandable-row-1"
            isExpanded={isExpanded}
            subRows={
              <>
                <TableRow id="expandable-row-1-sub-1">
                  <TableCell id="expandable-row-1-sub-1-product">Row A1</TableCell>
                  <TableCell id="expandable-row-1-sub-1-type">Child</TableCell>
                  <TableCell id="expandable-row-1-sub-1-status">Active</TableCell>
                </TableRow>
                <TableRow id="expandable-row-1-sub-2">
                  <TableCell id="expandable-row-1-sub-2-product">Row A2</TableCell>
                  <TableCell id="expandable-row-1-sub-2-type">Child</TableCell>
                  <TableCell id="expandable-row-1-sub-2-status">Inactive</TableCell>
                </TableRow>
              </>
            }
          >
            <TableCell id="expandable-row-1-product">Product A</TableCell>
            <TableCell id="expandable-row-1-type">Parent</TableCell>
            <TableCell id="expandable-row-1-status">Active</TableCell>
          </TableRow>
          <TableRow id="expandable-row-2">
            <TableCell id="expandable-row-2-product">Product B</TableCell>
            <TableCell id="expandable-row-2-type">Standard</TableCell>
            <TableCell id="expandable-row-2-status">Inactive</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export const SortableTableComponent = () => {
  const [sortColumn, setSortColumn] = useState<"product" | "price">("product");
  const [sortDirection, setSortDirection] = useState<"ascending" | "descending">(
    "ascending",
  );

  const products = [
    { id: 1, product: "Product C", price: 25, status: "Active" },
    { id: 2, product: "Product A", price: 10, status: "Inactive" },
    { id: 3, product: "Product B", price: 40, status: "Active" },
  ];

  const handleSort = (column: "product" | "price") => {
    if (sortColumn === column) {
      setSortDirection((previous) =>
        previous === "ascending" ? "descending" : "ascending",
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
        <TableRow id="sortable-head-row">
          <TableHeader
            id="sortable-head-product"
            sortType={sortColumn === "product" ? sortDirection : "unsorted"}
            onSort={() => handleSort("product")}
            aria-sort={sortColumn === "product" ? sortDirection : "none"}
          >
            Product
          </TableHeader>
          <TableHeader
            id="sortable-head-price"
            sortType={sortColumn === "price" ? sortDirection : "unsorted"}
            onSort={() => handleSort("price")}
            aria-sort={sortColumn === "price" ? sortDirection : "none"}
          >
            Price
          </TableHeader>
          <TableHeader id="sortable-head-status">Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedProducts.map(({ id, product, price, status }) => (
          <TableRow key={id} id={`sortable-row-${id}`}>
            <TableCell id={`sortable-row-${id}-product`}>{product}</TableCell>
            <TableCell id={`sortable-row-${id}-price`}>{`£${price}`}</TableCell>
            <TableCell id={`sortable-row-${id}-status`}>{status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

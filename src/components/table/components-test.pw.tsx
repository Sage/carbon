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
import { Checkbox, Pager } from "../..";
import SplitButton from "../split-button";
import Button from "../button/__next__";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
} from "../action-popover";
import MultiActionButton from "../multi-action-button";
import Dialog from "../dialog";

export const TableMenuFocusComponent = ({
  menuType,
  withSubmenu = false,
  inDialog = false,
  customTrigger = false,
  followingControls = "visible",
}: {
  menuType: "split-button" | "multi-action-button" | "action-popover";
  withSubmenu?: boolean;
  inDialog?: boolean;
  customTrigger?: boolean;
  followingControls?: "visible" | "none" | "hidden" | "collapsed-subrow";
}) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [closeCount, setCloseCount] = useState(0);
  const content = (
    <>
      <Button>Before table</Button>
      <Table maxWidth="500px" stickyColumn="last" stickyRow="both">
        <TableHead>
          <TableRow id="focus-head">
            <TableHeader width="500px">Product</TableHeader>
            <TableHeader width="300px">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            id="focus-row"
            subRows={
              followingControls === "collapsed-subrow" ? (
                <TableRow id="collapsed-focus-row">
                  <TableCell>Child product</TableCell>
                  <TableCell>
                    <button type="button">Collapsed subrow action</button>
                  </TableCell>
                </TableRow>
              ) : undefined
            }
          >
            <TableCell>Product 1</TableCell>
            <TableCell>
              {menuType === "split-button" && (
                <SplitButton text="Save" aria-label="Menu actions">
                  <Button>First action</Button>
                  <Button>Last action</Button>
                </SplitButton>
              )}
              {menuType === "multi-action-button" && (
                <MultiActionButton text="Actions" aria-label="Menu actions">
                  <Button>First action</Button>
                  <Button>Last action</Button>
                </MultiActionButton>
              )}
              {menuType === "action-popover" && (
                <ActionPopover
                  aria-label="Menu actions"
                  onClose={() => setCloseCount((count) => count + 1)}
                  renderButton={
                    customTrigger
                      ? ({
                          ref,
                          tabIndex,
                          "data-element": dataElement,
                          ariaAttributes,
                        }) => (
                          <div
                            ref={ref as React.Ref<HTMLDivElement>}
                            data-element={dataElement}
                          >
                            <button
                              type="button"
                              tabIndex={tabIndex}
                              aria-haspopup="true"
                              aria-expanded={
                                ariaAttributes["aria-expanded"] === "true"
                              }
                              aria-controls={ariaAttributes["aria-controls"]}
                            >
                              Menu actions
                            </button>
                          </div>
                        )
                      : undefined
                  }
                >
                  <ActionPopoverItem>First action</ActionPopoverItem>
                  <ActionPopoverDivider />
                  <ActionPopoverItem
                    submenu={
                      withSubmenu ? (
                        <>
                          <ActionPopoverItem>Nested action</ActionPopoverItem>
                        </>
                      ) : undefined
                    }
                  >
                    Last action
                  </ActionPopoverItem>
                </ActionPopover>
              )}
              {followingControls === "hidden" && (
                <>
                  <div hidden>
                    <button type="button">Hidden action</button>
                  </div>
                  <div style={{ display: "none" }}>
                    <button type="button">Display none action</button>
                  </div>
                  <div style={{ visibility: "hidden" }}>
                    <button type="button">Invisible action</button>
                  </div>
                  <div style={{ visibility: "collapse" }}>
                    <button type="button">Collapsed action</button>
                  </div>
                  <div {...{ inert: "" }}>
                    <button type="button">Inert action</button>
                  </div>
                  <fieldset disabled>
                    <button type="button">Disabled fieldset action</button>
                  </fieldset>
                </>
              )}
              {(followingControls === "visible" ||
                followingControls === "hidden") && <Button>After menu</Button>}
            </TableCell>
          </TableRow>
          {followingControls === "collapsed-subrow" && (
            <TableRow id="next-focus-row">
              <TableCell>Product 2</TableCell>
              <TableCell>
                <Button>After menu</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFoot>
          <TableRow id="focus-foot">
            <TableCell>Summary</TableCell>
            <TableCell>1 product</TableCell>
          </TableRow>
        </TableFoot>
      </Table>
      {followingControls !== "none" && <Button>Outside table</Button>}
      <div role="status">Closed {closeCount} times</div>
    </>
  );

  return inDialog ? (
    <Dialog
      open={dialogOpen}
      title="Table menu dialog"
      onCancel={() => setDialogOpen(false)}
    >
      {content}
    </Dialog>
  ) : (
    content
  );
};

export const StickyActionPopoverTableComponent = ({
  actionComponent = "action-popover",
  stickyColumn = "last",
}: {
  actionComponent?: "action-popover" | "multi-action-button";
  stickyColumn?: "first" | "last";
} = {}) => {
  const [selectedAction, setSelectedAction] = useState("");

  return (
    <>
      <Table
        maxWidth="500px"
        maxHeight="140px"
        stickyColumn={stickyColumn}
        stickyRow="both"
        pagination={
          <Pager
            totalRecords={100}
            showPageSizeSelection
            showTotalRecords={false}
            onPagination={() => {}}
          />
        }
      >
        <TableHead>
          <TableRow id="action-head">
            <TableHeader width={stickyColumn === "first" ? "200px" : "500px"}>
              {stickyColumn === "first" ? "Actions" : "Product"}
            </TableHeader>
            <TableHeader width={stickyColumn === "first" ? "500px" : "200px"}>
              {stickyColumn === "first" ? "Product" : "Actions"}
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 10 }, (_, index) => index + 1).map((id) => (
            <TableRow key={id} id={`action-product-${id}`}>
              {stickyColumn === "last" && <TableCell>Product {id}</TableCell>}
              <TableCell>
                {actionComponent === "multi-action-button" ? (
                  <MultiActionButton
                    text={`Product ${id} actions`}
                    aria-label={`Product ${id} actions`}
                  >
                    {Array.from(
                      { length: 14 },
                      (_, index) => `Action ${index + 1}`,
                    ).map((action) => (
                      <Button
                        key={action}
                        onClick={() => setSelectedAction(action)}
                      >
                        {action}
                      </Button>
                    ))}
                  </MultiActionButton>
                ) : (
                  <ActionPopover aria-label={`Product ${id} actions`}>
                    {Array.from(
                      { length: 8 },
                      (_, index) => `Action ${index + 1}`,
                    ).map((action) => (
                      <ActionPopoverItem
                        key={action}
                        onClick={() => setSelectedAction(action)}
                      >
                        {action}
                      </ActionPopoverItem>
                    ))}
                  </ActionPopover>
                )}
              </TableCell>
              {stickyColumn === "first" && <TableCell>Product {id}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
        <TableFoot>
          <TableRow id="action-foot">
            <TableCell>Summary</TableCell>
            <TableCell>10 products</TableCell>
          </TableRow>
        </TableFoot>
      </Table>
      <div role="status">{selectedAction}</div>
    </>
  );
};

export const StickySplitButtonTableComponent = ({
  stickyColumn = "last",
  ...props
}: Pick<TableProps, "stickyColumn" | "stickyRow" | "maxHeight"> = {}) => (
  <Table maxWidth="500px" stickyColumn={stickyColumn} {...props}>
    <TableHead>
      <TableRow id="head">
        <TableHeader width={stickyColumn === "first" ? "200px" : "500px"}>
          {stickyColumn === "first" ? "Actions" : "Product"}
        </TableHeader>
        <TableHeader width={stickyColumn === "first" ? "500px" : "200px"}>
          {stickyColumn === "first" ? "Product" : "Actions"}
        </TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: 12 }, (_, index) => index + 1).map((id) => (
        <TableRow key={id} id={`product-${id}`}>
          {stickyColumn !== "first" && <TableCell>Product {id}</TableCell>}
          <TableCell>
            <SplitButton text="Save" aria-label={`Actions for product ${id}`}>
              <Button>Save and close</Button>
              <Button>Save and add another</Button>
            </SplitButton>
          </TableCell>
          {stickyColumn === "first" && <TableCell>Product {id}</TableCell>}
        </TableRow>
      ))}
    </TableBody>
    <TableFoot>
      <TableRow id="foot">
        <TableCell>Summary</TableCell>
        <TableCell>12 products</TableCell>
      </TableRow>
    </TableFoot>
  </Table>
);

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

const initialDraggableRows = [
  { id: "draggable-row-one", label: "Row one" },
  { id: "draggable-row-two", label: "Row two" },
  { id: "draggable-row-three", label: "Row three" },
];

export const DraggableTableComponent = () => {
  const [rows, setRows] = useState(initialDraggableRows);

  const handleOrderChange = (
    orderedIds: (string | number | undefined)[] = [],
  ) => {
    setRows((currentRows) => {
      const rowsById = new Map(currentRows.map((row) => [row.id, row]));

      return orderedIds
        .map((id) => rowsById.get(String(id)))
        .filter(
          (row): row is (typeof currentRows)[number] => row !== undefined,
        );
    });
  };

  return (
    <Table isDraggable>
      <TableBody getOrder={handleOrderChange}>
        {rows.map(({ id, label }) => (
          <TableRow key={id} id={id}>
            <TableCell id={`${id}-cell`}>{label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const initialPaginatedDraggableRows = Array.from({ length: 6 }, (_, index) => ({
  id: `paginated-draggable-row-${index + 1}`,
  label: `Row ${index + 1}`,
}));

export const PaginatedDraggableTableComponent = () => {
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(initialPaginatedDraggableRows);
  const pageStartIndex = (currentPage - 1) * pageSize;
  const visibleRows = rows.slice(pageStartIndex, pageStartIndex + pageSize);

  const handleOrderChange = (
    orderedIds: (string | number | undefined)[] = [],
  ) => {
    setRows((currentRows) => {
      const rowsById = new Map(currentRows.map((row) => [row.id, row]));
      const reorderedVisibleRows = orderedIds
        .map((id) => rowsById.get(String(id)))
        .filter(
          (row): row is (typeof currentRows)[number] => row !== undefined,
        );
      const updatedRows = [...currentRows];

      reorderedVisibleRows.forEach((row, index) => {
        updatedRows[pageStartIndex + index] = row;
      });

      return updatedRows;
    });
  };

  const pagination = (
    <Pager
      currentPage={currentPage}
      pageSize={pageSize}
      totalRecords={rows.length}
      onPagination={(nextPage) => setCurrentPage(nextPage)}
    />
  );

  return (
    <Table isDraggable pagination={pagination}>
      <TableBody getOrder={handleOrderChange}>
        {visibleRows.map(({ id, label }) => (
          <TableRow key={id} id={id}>
            <TableCell id={`${id}-cell`}>{label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const ZebraStripedTableComponent = (props: Partial<TableProps> = {}) => (
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
          <TableCell
            id={`zebra-body-product-${index + 1}`}
          >{`Product ${index + 1}`}</TableCell>
          <TableCell id={`zebra-body-type-${index + 1}`}>
            {index % 2 === 0 ? "Standard" : "Premium"}
          </TableCell>
          <TableCell id={`zebra-body-status-${index + 1}`}>
            {index % 3 === 0 ? "Inactive" : "Active"}
          </TableCell>
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
        <TableHeader id="sticky-head-product" width="180px">
          Product
        </TableHeader>
        <TableHeader id="sticky-head-type" width="180px">
          Type
        </TableHeader>
        <TableHeader id="sticky-head-status" width="180px">
          Status
        </TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: 20 }, (_, index) => (
        <TableRow key={index} id={`sticky-row-${index + 1}`}>
          <TableCell
            id={`sticky-body-product-${index + 1}`}
          >{`Product ${index + 1}`}</TableCell>
          <TableCell id={`sticky-body-type-${index + 1}`}>
            {index % 2 === 0 ? "Standard" : "Premium"}
          </TableCell>
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

export const StickySelectableTableComponent = () => (
  <div
    data-role="sticky-selectable-table-scroll-container"
    style={{ height: "240px", overflowY: "auto" }}
  >
    <Table variant="prominent" stickyRow="both">
      <TableHead>
        <TableRow id="sticky-selectable-head-row">
          <TableHeader id="sticky-selectable-head-select">Select</TableHeader>
          <TableHeader id="sticky-selectable-head-product">Product</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: 12 }, (_, index) => (
          <TableRow key={index} id={`sticky-selectable-row-${index + 1}`}>
            <TableCell id={`sticky-selectable-checkbox-${index + 1}`}>
              {index === 5 ? (
                <input aria-label="Edit product 6" />
              ) : index === 6 ? (
                <button type="button">Edit product 7</button>
              ) : (
                <Checkbox
                  checked={false}
                  onChange={() => {}}
                  aria-label={`Select product ${index + 1}`}
                />
              )}
            </TableCell>
            <TableCell id={`sticky-selectable-product-${index + 1}`}>
              {`Product ${index + 1}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableRow id="sticky-selectable-foot-row">
          <TableCell id="sticky-selectable-foot-select">{null}</TableCell>
          <TableCell id="sticky-selectable-foot-summary">12 products</TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  </div>
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
        setSelectedRows([
          "selectable-row-1",
          "selectable-row-2",
          "selectable-row-3",
        ]);
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
              aria-label="Select all rows"
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
          <TableRow key={id} id={id} isSelected={selectedRows.includes(id)}>
            <TableCell id={`selectable-body-checkbox-${id}`}>
              <Checkbox
                checked={selectedRows.includes(id)}
                onChange={() => handleRowSelect(id)}
                onClick={(ev) => ev.stopPropagation()}
                data-component="table-cell-select-checkbox"
                data-role="table-cell-select-checkbox"
                aria-label={`Select row ${id}`}
              />
            </TableCell>
            <TableCell id={`selectable-body-product-${id}`}>
              {product}
            </TableCell>
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
      <button
        type="button"
        onClick={() => setIsExpanded((previous) => !previous)}
      >
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
            onExpansionChange={setIsExpanded}
            subRows={
              <>
                <TableRow id="expandable-row-1-sub-1">
                  <TableCell id="expandable-row-1-sub-1-product">
                    Row A1
                  </TableCell>
                  <TableCell id="expandable-row-1-sub-1-type">Child</TableCell>
                  <TableCell id="expandable-row-1-sub-1-status">
                    Active
                  </TableCell>
                </TableRow>
                <TableRow id="expandable-row-1-sub-2">
                  <TableCell id="expandable-row-1-sub-2-product">
                    Row A2
                  </TableCell>
                  <TableCell id="expandable-row-1-sub-2-type">Child</TableCell>
                  <TableCell id="expandable-row-1-sub-2-status">
                    Inactive
                  </TableCell>
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

export const ExpandableTableWithTallControlComponent = () => (
  <Table variant="prominent">
    <TableBody>
      <TableRow
        id="expandable-tall-control-row"
        subRows={
          <TableRow id="expandable-tall-control-sub-row">
            <TableCell id="expandable-tall-control-sub-row-cell">
              Child row
            </TableCell>
            <TableCell id="expandable-tall-control-sub-row-value">
              Child value
            </TableCell>
          </TableRow>
        }
      >
        <TableCell id="expandable-tall-control-cell">Parent row</TableCell>
        <TableCell id="expandable-tall-control-input-cell">
          <input
            aria-label="Tall control"
            style={{ boxSizing: "border-box", height: "42px" }}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const SortableTableComponent = () => {
  const [sortColumn, setSortColumn] = useState<"product" | "price">("product");
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");

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
          >
            Product
          </TableHeader>
          <TableHeader
            id="sortable-head-price"
            sortType={sortColumn === "price" ? sortDirection : "unsorted"}
            onSort={() => handleSort("price")}
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

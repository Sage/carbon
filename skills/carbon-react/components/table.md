---
name: carbon-component-table
description: Carbon Table component props and usage examples.
---

# Table

## Import
`import { Table } from "carbon-react/lib/components/table";`

## Source
- Export: `./components/table`
- Props interface: `TableProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The content of the table. |  |
| align | "left" \| "right" \| "center" \| undefined | No |  |  |  |
| horizontalBorderThickness | BorderThickness \| undefined | No |  | The thickness of the horizontal borders within the table. | "small" |
| isDraggable | boolean \| undefined | No |  | Indicates whether the table is draggable. | false |
| isZebraStriped | boolean \| undefined | No |  | Indicates whether the table should have zebra striping. | false |
| maxWidth | string \| undefined | No |  | The maximum width of the table. This will set an overflow-x on the table wrapper. |  |
| outerBorders | "small" \| "none" \| undefined | No |  | The outer borders of the table. | "small" |
| pagination | React.ReactNode | No |  | The pagination component for the table. |  |
| size | "small" \| "medium" \| "large" \| "extra-small" \| "extra-large" \| undefined | No |  | The size of the table. | "medium" |
| stickyColumn | "both" \| "first" \| "last" \| undefined | No |  | Indicates which column(s) should remain sticky when scrolling. |  |
| stickyRow | "footer" \| "header" \| "both" \| undefined | No |  | Indicates which row(s) should remain sticky when scrolling. |  |
| summary | string \| undefined | No |  |  |  |
| variant | "prominent" \| "subtle-white" \| "subtle-grey" \| undefined | No |  | The variant of the table. | "prominent" |
| verticalBorderThickness | BorderThickness \| undefined | No |  | The thickness of the vertical borders within the table. | "small" |

## Examples
### SortByPriceDescending

**Render**

```tsx
() => <SortableTable />
```


### SelectRows

**Render**

```tsx
() => <SelectableTable />
```


### ExpandRow

**Render**

```tsx
() => <ExpandableTable />
```


### Playground

**Args**

```tsx
{
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
  }
```

**Render**

```tsx
(args) => {
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
  }
```


### Draggable

**Render**

```tsx
() => {
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
  }
```


### Selectable

**Render**

```tsx
() => {
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
  }
```


### Expandable

**Render**

```tsx
() => (
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
  )
```


### StickyRows

**Render**

```tsx
() => (
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
  )
```


### StickyColumns

**Render**

```tsx
() => (
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
  )
```


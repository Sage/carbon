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
| horizontalBorderThickness | BorderThickness \| undefined | No |  | The thickness of the horizontal borders within the table. | "small" |
| isDraggable | boolean \| undefined | No |  | Indicates whether the table is draggable. | false |
| isZebraStriped | boolean \| undefined | No |  | Indicates whether the table should have zebra striping. | false |
| maxHeight | string \| undefined | No |  | The maximum height of the table's scroll container. This constrains the table scroll container and enables vertical scrolling. |  |
| maxWidth | string \| undefined | No |  | The maximum width of the table. This constrains the table scroll container and enables horizontal scrolling. |  |
| outerBorders | "small" \| "none" \| undefined | No |  | The outer borders of the table. This only applies to the `subtle-white` and `subtle-grey` variants; the `prominent` variant always has an outer border. | "small" |
| pagination | React.ReactNode | No |  | The pagination component for the table. |  |
| size | "small" \| "medium" \| "large" \| "extra-small" \| "extra-large" \| undefined | No |  | The size of the table. | "medium" |
| stickyColumn | "both" \| "first" \| "last" \| undefined | No |  | Indicates which column(s) should remain sticky when scrolling. |  |
| stickyRow | "footer" \| "header" \| "both" \| undefined | No |  | Indicates which row(s) should remain sticky when scrolling. |  |
| summary | string \| undefined | No |  |  |  |
| variant | "prominent" \| "subtle-white" \| "subtle-grey" \| undefined | No |  | The variant of the table. | "prominent" |
| verticalBorderThickness | BorderThickness \| undefined | No |  | The thickness of the vertical borders within the table. | "small" |
| aria-describedby | string \| undefined | No |  | Identifies the element (or elements) that describes the object. |  |
| aria-label | string \| undefined | No |  | Defines a string value that labels the current element. |  |
| aria-labelledby | string \| undefined | No |  | Identifies the element (or elements) that labels the current element. |  |

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
    <Table
      maxHeight="240px"
      maxWidth="420px"
      stickyColumn="both"
      stickyRow="both"
    >
      <TableHead>
        <TableRow id="sticky-rows-head-row">
          <TableHeader id="sticky-rows-head-product" width="160px">
            Product
          </TableHeader>
          <TableHeader id="sticky-rows-head-type" width="180px">
            Type
          </TableHeader>
          <TableHeader id="sticky-rows-head-status" width="180px">
            Status
          </TableHeader>
          <TableHeader id="sticky-rows-head-price" width="140px" align="right">
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
            £217
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


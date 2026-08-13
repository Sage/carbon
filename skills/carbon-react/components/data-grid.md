---
name: carbon-component-data-grid
description: Carbon DataGrid component props and usage examples.
---

# DataGrid

## Import
`import { DataGrid } from "carbon-react/lib/components/data-grid";`

## Source
- Export: `./components/data-grid`
- Props interface: `DataGridProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| columns | DataGridColumn<T>[] | Yes |  |  |  |
| rows | T[] | Yes |  |  |  |
| aria-label | string | Yes |  | Accessible name for the grid. |  |
| disableVirtualization | boolean \| undefined | No |  | Disables automatic row virtualization in a height-constrained grid. |  |
| enableTabNavigation | boolean \| undefined | No |  | Enables Tab and Shift+Tab cell navigation. |  |
| getRowId | ((row: T) => DataGridRowId) \| undefined | No |  | Reads a stable row id. Defaults to the row's `id` property. |  |
| height | string \| number \| undefined | No |  |  |  |
| onCellChange | ((params: DataGridCellChangeParams<T>) => void) \| undefined | No |  | Called after a cell edit is committed. |  |
| rowOverscan | number \| undefined | No |  | Number of additional rows mounted above and below the viewport. |  |
| width | string \| number \| undefined | No |  |  |  |

## Examples
### Editable invoice lines

**Render**

```tsx
() => {
    const [rows, setRows] = useState(initialRows);

    return (
      <DataGrid
        aria-label="Invoice lines"
        rows={rows}
        columns={columns}
        width="586px"
        enableTabNavigation
        onCellChange={({ rowId, field, value }) => {
          setRows((current) =>
            current.map((row) =>
              row.id === rowId ? { ...row, [field]: value } : row,
            ),
          );
        }}
      />
    );
  }
```


### Large scrollable grid

**Render**

```tsx
() => {
    const [rows, setRows] = useState(() => createLargeRows(1000));

    return (
      <DataGrid
        aria-label="Large invoice lines"
        rows={rows}
        columns={largeColumns}
        height="520px"
        width="100%"
        enableTabNavigation
        rowOverscan={6}
        onCellChange={({ rowId, field, value }) => {
          setRows((current) =>
            current.map((row) =>
              row.id === rowId ? { ...row, [field]: value } : row,
            ),
          );
        }}
      />
    );
  }
```


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
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| columns | DataGridColumn<T>[] | Yes |  |  |  |  |  |
| rows | T[] | Yes |  |  |  |  |  |
| disableVirtualization | boolean \| undefined | No |  |  |  | Disables automatic row virtualization in a height-constrained grid. |  |
| enableTabNavigation | boolean \| undefined | No |  |  |  | Enables Tab and Shift+Tab cell navigation. |  |
| getRowId | ((row: T) => DataGridRowId) \| undefined | No |  |  |  | Reads a stable row id. Defaults to the row's `id` property. |  |
| maxHeight | string \| number \| undefined | No |  |  |  | Maximum viewport height. Enables row virtualization when constrained. |  |
| maxWidth | string \| number \| undefined | No |  |  |  | Maximum viewport width. Enables horizontal scrolling when constrained. |  |
| onCellChange | ((params: DataGridCellChangeParams<T>) => void) \| undefined | No |  |  |  | Called after a cell edit is committed. |  |
| rowOverscan | number \| undefined | No |  |  |  | Number of additional rows mounted above and below the viewport. |  |
| aria-describedby | string \| undefined | No |  |  |  | ID of an element that provides additional grid guidance. |  |
| aria-label | string \| undefined | No |  |  |  | Accessible name for the grid. |  |
| aria-labelledby | string \| undefined | No |  |  |  | ID of an element that provides the grid's accessible name. |  |
| height | string \| number \| undefined | No |  | Yes | Use `maxHeight` instead. |  |  |
| width | string \| number \| undefined | No |  | Yes | Use `maxWidth` instead. |  |  |

## Examples
### Editable invoice lines

**Render**

```tsx
() => {
    const [rows, setRows] = useState(initialRows);

    return (
      <div style={{ maxWidth: 586 }}>
        <DataGrid
          aria-label="Invoice lines"
          rows={rows}
          columns={columns}
          maxWidth="100%"
          enableTabNavigation
          onCellChange={({ rowId, field, value }) => {
            setRows((current) =>
              current.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row,
              ),
            );
          }}
        />
        <Button
          buttonType="secondary"
          iconType="add"
          iconPosition="before"
          mt={2}
          onClick={() => {
            setRows((current) => {
              const nextId = Math.max(0, ...current.map(({ id }) => id)) + 1;
              return [
                ...current,
                {
                  id: nextId,
                  description: "",
                  category: "Services",
                  selected: false,
                  actions: null,
                },
              ];
            });
          }}
        >
          Add line
        </Button>
      </div>
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
        maxHeight="520px"
        maxWidth="100%"
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


### MDX Example 1

**Args**

```tsx
import {
  DataGrid,
  DataGridColumn,
} from "carbon-react/lib/components/data-grid";

const columns: DataGridColumn<InvoiceLine>[] = [
  {
    field: "description",
    headerName: "Description",
    sticky: "left",
  },
  {
    field: "category",
    headerName: "Category",
    type: "dropdown",
    options: [
      { label: "Services", value: "services" },
      { label: "Software", value: "software" },
    ],
  },
  {
    field: "selected",
    headerName: "Selected",
    type: "checkbox",
  },
];

<DataGrid
  aria-label="Invoice lines"
  rows={rows}
  columns={columns}
  onCellChange={({ rowId, field, value }) => updateRow(rowId, field, value)}
/>;
```


### MDX Example 2

**Args**

```tsx
const gridRef = React.createRef<DataGridHandle>();

gridRef.current?.editCell(invoiceLineId, "description");
```


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
| disableVirtualization | boolean \| undefined | No |  | Disables automatic row virtualization in a height-constrained grid. |  |
| enableTabNavigation | boolean \| undefined | No |  | Enables Tab and Shift+Tab cell navigation. |  |
| getRowId | ((row: T) => DataGridRowId) \| undefined | No |  | Reads a stable row id. Defaults to the row's `id` property. |  |
| maxHeight | string \| number \| undefined | No |  | Maximum viewport height. Enables row virtualization when constrained. |  |
| maxWidth | string \| number \| undefined | No |  | Maximum viewport width. Enables horizontal scrolling when constrained. |  |
| onCellChange | ((params: DataGridCellChangeParams<T>) => void) \| undefined | No |  | Called after a cell edit is committed. |  |
| rowOverscan | number \| undefined | No |  | Number of additional rows mounted above and below the viewport. |  |
| stickyHeader | boolean \| undefined | No |  | Keeps the header visible while the grid scrolls vertically. |  |
| aria-describedby | string \| undefined | No |  | ID of an element that provides additional grid guidance. |  |
| aria-label | string \| undefined | No |  | Accessible name for the grid. |  |
| aria-labelledby | string \| undefined | No |  | ID of an element that provides the grid's accessible name. |  |

## Examples
### Playground

**Args**

```tsx
{
    playgroundStickyColumns: "none",
  }
```

**Render**

```tsx
(args) => {
    const [rows, setRows] = useState(createPlaygroundRows);
    const { playgroundStickyColumns, ...dataGridProps } = args;

    return (
      <DataGrid
        {...dataGridProps}
        aria-label="Invoice lines playground"
        rows={rows}
        columns={getPlaygroundColumns(playgroundStickyColumns)}
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


### Validation and error summary

**Render**

```tsx
() => {
    const gridRef = useRef<DataGridHandle>(null);
    const [rows, setRows] = useState(() =>
      initialRows.map((row) => ({
        ...row,
        description: row.id === 3 ? "" : row.description,
      })),
    );
    const invalidRows = rows.filter((row) => !row.description);

    return (
      <Box maxWidth="760px">
        {invalidRows.length > 0 && (
          <Box mb={3} minWidth="min(400px, 100%)" width="fit-content">
            <Message
              id="invoice-errors"
              title="There is a problem"
              variant="error"
              width="100%"
            >
              <Box
                alignItems="flex-start"
                display="flex"
                flexDirection="column"
                gap={1}
              >
                {invalidRows.map((row) => (
                  <Link
                    key={row.id}
                    onClick={() =>
                      gridRef.current?.editCell(row.id, "description")
                    }
                  >
                    Enter a description on row {row.id}
                  </Link>
                ))}
              </Box>
            </Message>
          </Box>
        )}
        <DataGrid
          ref={gridRef}
          aria-label="Invoice lines with validation"
          aria-describedby={
            invalidRows.length > 0 ? "invoice-errors" : undefined
          }
          rows={rows}
          columns={columns}
          maxWidth="100%"
          onCellChange={({ rowId, field, value }) => {
            setRows((current) =>
              current.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row,
              ),
            );
          }}
        />
      </Box>
    );
  }
```


### Sticky columns

**Render**

```tsx
() => {
    const [rows, setRows] = useState(() => createLargeRows(12));

    return (
      <div style={{ maxWidth: 900 }}>
        <DataGrid
          aria-label="Invoice lines with sticky columns"
          rows={rows}
          columns={largeColumns}
          maxHeight="360px"
          maxWidth="100%"
          stickyHeader
          enableTabNavigation
          onCellChange={({ rowId, field, value }) => {
            setRows((current) =>
              current.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row,
              ),
            );
          }}
        />
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
        stickyHeader
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
  onCellChange={({ rowId, field, value }) => {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row,
      ),
    );
  }}
/>;
```


### MDX Example 2

**Args**

```tsx
interface InvoiceLine {
  id: number;
  description: string;
  category: "Services" | "Software" | "Expenses";
  selected: boolean;
  locked: boolean;
}

const initialRows: InvoiceLine[] = [
  {
    id: 1,
    description: "Consulting services",
    category: "Services",
    selected: false,
    locked: false,
  },
];
```


### MDX Example 3

**Args**

```tsx
const columns: DataGridColumn<InvoiceLine>[] = [
  {
    field: "description",
    headerName: "Description",
    minWidth: 220,
    flex: 1,
    error: ({ value }) =>
      String(value ?? "").trim() ? false : "Enter a description",
    readOnly: ({ row }) => row.locked,
  },
  {
    field: "category",
    headerName: "Category",
    type: "dropdown",
    width: 180,
    options: [
      { label: "Services", value: "Services" },
      { label: "Software", value: "Software" },
      { label: "Expenses", value: "Expenses" },
    ],
  },
  {
    field: "selected",
    headerName: "Selected",
    type: "checkbox",
    width: 100,
  },
  {
    field: "actions",
    headerName: "",
    headerAriaLabel: "Actions",
    type: "action",
    width: 52,
    renderCell: ({ row }) => (
      <ActionPopover
        aria-label={`Actions for ${row.description}`}
        buttonLabel="More actions"
      >
        {/* ActionPopoverItems */}
      </ActionPopover>
    ),
  },
];
```


### MDX Example 4

**Args**

```tsx
const [rows, setRows] = React.useState(initialRows);

const handleCellChange = ({
  rowId,
  field,
  value,
}: DataGridCellChangeParams<InvoiceLine>) => {
  setRows((currentRows) =>
    currentRows.map((row) =>
      row.id === rowId ? { ...row, [field]: value } : row,
    ),
  );
};

<DataGrid
  aria-label="Invoice lines"
  rows={rows}
  columns={columns}
  onCellChange={handleCellChange}
/>;
```


### MDX Example 5

**Args**

```tsx
const gridRef = React.createRef<DataGridHandle>();

gridRef.current?.editCell(invoiceLineId, "description");
```


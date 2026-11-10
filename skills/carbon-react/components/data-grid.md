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
| columnLayout | DataGridColumnLayout \| undefined | No |  | Controlled column layout. Commands request changes via the callback. |  |
| defaultColumnLayout | DataGridColumnLayout \| undefined | No |  | Initial layout for an uncontrolled grid. |  |
| disableVirtualization | boolean \| undefined | No |  | Disables automatic row virtualization in a height-constrained grid. |  |
| enableTabNavigation | boolean \| undefined | No |  | Enables Tab and Shift+Tab cell navigation. |  |
| getRowId | ((row: T) => DataGridRowId) \| undefined | No |  | Reads a stable row id. Defaults to the row's `id` property. |  |
| maxHeight | string \| number \| undefined | No |  | Maximum viewport height. Enables row virtualization when constrained. |  |
| maxWidth | string \| number \| undefined | No |  | Maximum viewport width. Enables horizontal scrolling when constrained. |  |
| onCellChange | ((params: DataGridCellChangeParams<T>) => void) \| undefined | No |  | Called after a cell edit is committed. |  |
| onColumnLayoutChange | ((layout: DataGridColumnLayout) => void) \| undefined | No |  |  |  |
| plugins | readonly DataGridPlugin<T>[] \| undefined | No |  | Optional extensions. Column fields must be unique and stable. |  |
| rowOverscan | number \| undefined | No |  | Number of additional rows mounted above and below the viewport. |  |
| stickyHeader | boolean \| undefined | No |  | Keeps the header visible while the grid scrolls vertically. |  |
| aria-describedby | string \| undefined | No |  | ID of an element that provides additional grid guidance. |  |
| aria-label | string \| undefined | No |  | Accessible name for the grid. |  |
| aria-labelledby | string \| undefined | No |  | ID of an element that provides the grid's accessible name. |  |

## Examples
### CellStatesAndNavigationFocus

**Render**

```tsx
() => <VisualGrid />
```


### HoverState

**Render**

```tsx
() => <VisualGrid />
```


### ActiveEditingFocus

**Render**

```tsx
() => <VisualGrid />
```


### StickyColumnsScrolledWithOpenActions

**Render**

```tsx
() => <VisualGrid maxWidth="400px" stickyColumns />
```


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
    const storyColumns = useInvoiceColumns(setRows, playgroundStickyColumns);

    return (
      <DataGrid
        {...dataGridProps}
        aria-label="Invoice lines playground"
        rows={rows}
        columns={storyColumns}
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
    const storyColumns = useInvoiceColumns(setRows);

    return (
      <Box maxWidth="100%" minWidth={0} width="600px">
        <DataGrid
          aria-label="Invoice lines"
          rows={rows}
          columns={storyColumns}
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
              return [
                ...current,
                {
                  id: getNextRowId(current),
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
      </Box>
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
    const storyColumns = useInvoiceColumns(setRows);
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
          columns={storyColumns}
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
    const storyColumns = useLargeColumns(setRows);

    return (
      <Box maxWidth="100%" minWidth={0} width="900px">
        <DataGrid
          aria-label="Invoice lines with sticky columns"
          rows={rows}
          columns={storyColumns}
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
      </Box>
    );
  }
```


### Large scrollable grid

**Render**

```tsx
() => {
    const [rows, setRows] = useState(() => createLargeRows(1000));
    const storyColumns = useLargeColumns(setRows);

    return (
      <DataGrid
        aria-label="Large invoice lines"
        rows={rows}
        columns={storyColumns}
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


### ColumnPlugins

**Render**

```tsx
() => {
    const [rows, setRows] = useState(() => createLargeRows(1000));
    const storyColumns = useLargeColumns(setRows);
    const [columnLayout, setColumnLayout] = useState<DataGridColumnLayout>({
      order: [],
      widths: {},
    });
    return (
      <>
        <p>
          Pinned columns stay fixed. Drag a header handle to reorder the
          scrolling columns, or focus the handle and use Left/Right. Drag a
          column edge to resize, or focus the edge and use Left/Right.
          Double-click an edge to reset its width; Escape cancels a resize.
        </p>
        <Button
          type="button"
          onClick={() => setColumnLayout({ order: [], widths: {} })}
        >
          Reset column layout
        </Button>
        <DataGrid
          aria-label="Invoice lines with column plugins"
          rows={rows}
          columns={storyColumns}
          plugins={columnTools}
          columnLayout={columnLayout}
          onColumnLayoutChange={setColumnLayout}
          maxHeight="520px"
          maxWidth="100%"
          stickyHeader
          enableTabNavigation
          onCellChange={({ rowId, field, value }) =>
            setRows((current) =>
              current.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row,
              ),
            )
          }
        />
      </>
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


### MDX Example 6

**Args**

```tsx
const plugins = [
  createColumnReorderPlugin<InvoiceLine>({
    canMove: ({ definition }) =>
      !definition.sticky && definition.type !== "action",
  }),
  createColumnResizePlugin<InvoiceLine>({
    canResize: ({ definition }) => definition.type !== "action",
  }),
];

<DataGrid
  aria-label="Invoice lines"
  rows={rows}
  columns={columns}
  plugins={plugins}
  maxHeight={520}
  stickyHeader
/>;
```


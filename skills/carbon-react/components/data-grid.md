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
| onRowsChange | ((rows: T[], change: DataGridRowChange<T>) => void) \| undefined | No |  | Called with a new immutable row collection and the change that produced it. |  |
| rowOverscan | number \| undefined | No |  | Number of additional rows mounted above and below the viewport. |  |
| stickyHeader | boolean \| undefined | No |  | Keeps the header visible while the grid scrolls vertically. |  |
| aria-describedby | string \| undefined | No |  | ID of an element that provides additional grid guidance. |  |
| aria-label | string \| undefined | No |  | Accessible name for the grid. |  |
| aria-labelledby | string \| undefined | No |  | ID of an element that provides the grid's accessible name. |  |

## Examples
### EditTextAndNavigate

**Render**

```tsx
() => <InteractionGrid />
```


### ToggleCheckbox

**Render**

```tsx
() => <InteractionGrid />
```


### OpenAndCloseActionPopover

**Render**

```tsx
() => <InteractionGrid />
```


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
    const storyColumns = useInvoiceColumns(rows, playgroundStickyColumns);

    return (
      <DataGrid
        {...dataGridProps}
        aria-label="Invoice lines playground"
        rows={rows}
        columns={storyColumns}
        onRowsChange={(nextRows) => setRows(nextRows)}
      />
    );
  }
```


### Editable invoice lines

**Render**

```tsx
() => {
    const gridRef = useRef<DataGridHandle<InvoiceLine>>(null);
    const [rows, setRows] = useState(initialRows);
    const storyColumns = useInvoiceColumns(rows);

    return (
      <Box maxWidth="100%" minWidth={0} width="600px">
        <DataGrid
          ref={gridRef}
          aria-label="Invoice lines"
          rows={rows}
          columns={storyColumns}
          maxWidth="100%"
          enableTabNavigation
          onRowsChange={(nextRows) => setRows(nextRows)}
        />
        <Button
          variantType="secondary"
          iconType="add"
          iconPosition="before"
          mt={2}
          onClick={() =>
            gridRef.current?.addRow({
              id: getNextRowId(rows),
              description: "",
              category: "Services",
              selected: false,
              actions: null,
            })
          }
        >
          Add line
        </Button>
      </Box>
    );
  }
```


### Controlled rows and change output

**Render**

```tsx
() => {
    const gridRef = useRef<DataGridHandle<InvoiceLine>>(null);
    const [rows, setRows] = useState(() => initialRows.slice(0, 3));
    const [lastChange, setLastChange] =
      useState<DataGridRowChange<InvoiceLine> | null>(null);
    const storyColumns = useInvoiceColumns(rows);

    return (
      <Box maxWidth="100%" minWidth={0} width="760px">
        <DataGrid
          ref={gridRef}
          aria-label="Controlled invoice lines"
          rows={rows}
          columns={storyColumns}
          maxWidth="100%"
          enableTabNavigation
          onRowsChange={(nextRows, change) => {
            setRows(nextRows);
            setLastChange(change);
          }}
        />
        <Button
          variantType="secondary"
          iconType="add"
          iconPosition="before"
          mt={2}
          onClick={() =>
            gridRef.current?.addRow({
              id: getNextRowId(rows),
              description: "",
              category: "Services",
              selected: false,
              actions: null,
            })
          }
        >
          Add line
        </Button>
        <Box
          as="pre"
          backgroundColor="--colorsUtilityMajor025"
          mt={2}
          overflow="auto"
          p={2}
        >
          {JSON.stringify({ rows, lastChange }, null, 2)}
        </Box>
      </Box>
    );
  }
```


### Validation and error summary

**Render**

```tsx
() => {
    const gridRef = useRef<DataGridHandle<InvoiceLine>>(null);
    const [rows, setRows] = useState(() =>
      initialRows.map((row) => ({
        ...row,
        description: row.id === 3 ? "" : row.description,
      })),
    );
    const storyColumns = useInvoiceColumns(rows);
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
          onRowsChange={(nextRows) => setRows(nextRows)}
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
    const storyColumns = useLargeColumns(rows, setRows);

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
          onRowsChange={(nextRows) => setRows(nextRows)}
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
    const storyColumns = useLargeColumns(rows, setRows);

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
        onRowsChange={(nextRows) => setRows(nextRows)}
      />
    );
  }
```


### MDX Example 1

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


### MDX Example 2

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
    renderCell: ({ api, row, rowId }) => (
      <ActionPopover
        aria-label={`Actions for ${row.description}`}
        buttonLabel="More actions"
        size="small"
      >
        <ActionPopoverItem
          onClick={() =>
            api.duplicateRow(rowId, { ...row, id: createInvoiceLineId() })
          }
        >
          Duplicate
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => api.deleteRow(rowId)}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    ),
  },
];
```


### MDX Example 3

**Args**

```tsx
const [rows, setRows] = React.useState(initialRows);

const handleRowsChange = (
  nextRows: InvoiceLine[],
  change: DataGridRowChange<InvoiceLine>,
) => {
  setRows(nextRows);
  auditInvoiceChange(change);
};

<DataGrid
  aria-label="Invoice lines"
  rows={rows}
  columns={columns}
  onRowsChange={handleRowsChange}
/>;
```


### MDX Example 4

**Args**

```tsx
const gridRef = React.useRef<DataGridHandle<InvoiceLine>>(null);

<Button onClick={() => gridRef.current?.addRow(createEmptyInvoiceLine())}>
  Add line
</Button>;

gridRef.current?.insertRow(newLine, { beforeRowId: existingLineId });
gridRef.current?.duplicateRow(sourceLineId, duplicatedLine);
gridRef.current?.deleteRow(lineId);
gridRef.current?.moveRow(lineId, 3);
```


### MDX Example 1

**Args**

```tsx
import React from "react";
import {
  DataGrid,
  DataGridColumn,
} from "carbon-react/lib/components/data-grid";

interface InvoiceLine {
  id: number;
  description: string;
  category: "Services" | "Software";
}

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
      { label: "Services", value: "Services" },
      { label: "Software", value: "Software" },
    ],
  },
];

export default function InvoiceLines() {
  const [rows, setRows] = React.useState<InvoiceLine[]>([
    { id: 1, description: "Consulting", category: "Services" },
  ]);

  return (
    <DataGrid
      aria-label="Invoice lines"
      rows={rows}
      columns={columns}
      onRowsChange={(nextRows) => setRows(nextRows)}
    />
  );
}
```


### MDX Example 2

**Args**

```tsx
const gridRef = React.createRef<DataGridHandle<InvoiceLine>>();

gridRef.current?.editCell(invoiceLineId, "description");
```


---
name: carbon-component-action-popover
description: Carbon ActionPopover component props and usage examples.
---

# ActionPopover

## Import
`import { ActionPopover } from "carbon-react/lib/components/action-popover";`

## Source
- Export: `./components/action-popover`
- Props interface: `ActionPopoverProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| buttonLabel | React.ReactNode | No |  |  |  | Content for the action popover button. |  |
| children | React.ReactNode | No |  |  |  | Children for popover component |  |
| id | string \| undefined | No |  |  |  | Unique ID |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| onClose | (() => void) \| undefined | No |  |  |  | Callback to be called on menu close |  |
| onOpen | (() => void) \| undefined | No |  |  |  | Callback to be called on menu open |  |
| renderButton | ((buttonProps: RenderButtonProps) => React.ReactNode) \| undefined | No |  |  |  | Render a custom menu button to override default ellipsis icon |  |
| rightAlignMenu | boolean \| undefined | No |  |  |  | Boolean to control whether menu should align to right |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of the action popover menu items. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Prop to specify an aria-describedby for the component |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify an aria-label for the component |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify an aria-labelledby for the component |  |
| horizontalAlignment | Alignment \| undefined | No |  | Yes | This prop is no longer supported and has no effect. |  |  |
| placement | "bottom" \| "top" \| undefined | No |  | Yes | This prop will be removed in a future release. |  |  |
| submenuPosition | Alignment \| undefined | No |  | Yes | This prop is no longer supported and has no effect. |  |  |

## Examples
### Playground

**Args**

```tsx
{
    size: "medium",
    rightAlignMenu: false,
    showIcons: true,
    disabledItems: true,
    showSubmenu: true,
    disabledSubmenu: false,
    additionalOptions: true,
    download: true,
  }
```

**Render**

```tsx
({
    showIcons,
    disabledItems,
    showSubmenu,
    disabledSubmenu,
    additionalOptions,
    download,
    ...args
  }) => (
    <Box height={400}>
      <ActionPopover {...args}>
        <ActionPopoverItem icon={showIcons ? "email" : undefined}>
          Email invoice
        </ActionPopoverItem>
        {showSubmenu && (
          <ActionPopoverItem
            icon={showIcons ? "print" : undefined}
            disabled={disabledSubmenu}
            submenu={
              <>
                <ActionPopoverItem icon={showIcons ? "pdf" : undefined}>
                  PDF
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon={showIcons ? "csv" : undefined}
                  disabled={disabledItems}
                >
                  CSV
                </ActionPopoverItem>
              </>
            }
          >
            Print invoice
          </ActionPopoverItem>
        )}
        {download && (
          <ActionPopoverItem
            icon={showIcons ? "download" : undefined}
            href="data:text/csv;charset=utf-8,Invoice%2CAmount%0A123%2C100"
            download
          >
            Download invoice
          </ActionPopoverItem>
        )}
        <ActionPopoverItem
          icon={showIcons ? "delete" : undefined}
          disabled={disabledItems}
        >
          Delete invoice
        </ActionPopoverItem>
        {additionalOptions && <ActionPopoverDivider />}
        {additionalOptions && (
          <ActionPopoverItem icon={showIcons ? "settings" : undefined}>
            Manage invoices
          </ActionPopoverItem>
        )}
      </ActionPopover>
    </Box>
  )
```


### Default

**Render**

```tsx
() => {
  const submenu = (
    <>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </>
  );
  const submenuWithIcons = (
    <>
      <ActionPopoverItem icon="graph" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem icon="add" onClick={() => {}}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </>
  );
  return (
    <Box mt={40} height={275}>
      <ActionPopover mb={1} onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem
          disabled
          icon="graph"
          submenu={submenu}
          onClick={() => {}}
        >
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled icon="delete" onClick={() => {}}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover mb={1}>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover>
        <ActionPopoverItem
          icon="csv"
          submenu={submenuWithIcons}
          onClick={() => {}}
        >
          Download CSV
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
}
```


### Small

**Args**

```tsx
{ size: "small" }
```

**Render**

```tsx
renderSizeExample
```


### Medium

**Args**

```tsx
{ size: "medium" }
```

**Render**

```tsx
renderSizeExample
```


### Large

**Args**

```tsx
{ size: "large" }
```

**Render**

```tsx
renderSizeExample
```


### Menu Right Aligned

**Render**

```tsx
() => {
  return (
    <Box height={250}>
      <ActionPopover rightAlignMenu>
        <ActionPopoverItem icon="email" disabled onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
}
```


### Custom Menu Button

**Render**

```tsx
() => {
  return (
    <Box height={250}>
      <ActionPopover
        renderButton={({ "data-element": dataElement, ariaAttributes }) => (
          <Button
            variantType="tertiary"
            iconType="dropdown"
            iconPosition="after"
            size="small"
            data-element={dataElement}
            {...ariaAttributes}
          >
            More
          </Button>
        )}
      >
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
}
```


### Keyboard Navigation

**Render**

```tsx
() => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem disabled icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
}
```


### In Overflow Hidden Container

**Render**

```tsx
() => {
  return (
    <Box mt={40} height={275} maxWidth={800}>
      <Accordion title="Heading">
        <Box m={2}>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
        </Box>
      </Accordion>
    </Box>
  );
}
```


### In Table

**Render**

```tsx
() => {
  return (
    <Box pt={120} height={250}>
      <Table size="small">
        <TableHead>
          <TableRow id="header-row-in-table">
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Relationship Status</TableHeader>
            <TableHeader width="60px">Dependents</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow id="row-1-in-table">
            <TableCell>John Doe</TableCell>
            <TableCell>London</TableCell>
            <TableCell>Single</TableCell>
            <TableCell>
              <ActionPopover
                renderButton={({
                  "data-element": dataElement,
                  ariaAttributes,
                }: RenderButtonProps) => (
                  <Button
                    data-element={dataElement}
                    size="xs"
                    {...ariaAttributes}
                  >
                    Actions
                  </Button>
                )}
              >
                <ActionPopoverItem
                  icon="print"
                  onClick={() => {}}
                  submenu={
                    <>
                      <ActionPopoverItem onClick={() => {}}>
                        CSV
                      </ActionPopoverItem>
                      <ActionPopoverItem onClick={() => {}}>
                        PDF
                      </ActionPopoverItem>
                    </>
                  }
                >
                  Print
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem onClick={() => {}} icon="delete">
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
          <TableRow id="row-2-in-table">
            <TableCell>Jane Doe</TableCell>
            <TableCell>York</TableCell>
            <TableCell>Married</TableCell>
            <TableCell>
              <ActionPopover
                renderButton={({
                  "data-element": dataElement,
                  ariaAttributes,
                }: RenderButtonProps) => (
                  <Button
                    data-element={dataElement}
                    size="xs"
                    {...ariaAttributes}
                  >
                    Actions
                  </Button>
                )}
              >
                <ActionPopoverItem
                  icon="print"
                  onClick={() => {}}
                  submenu={
                    <>
                      <ActionPopoverItem onClick={() => {}}>
                        CSV
                      </ActionPopoverItem>
                      <ActionPopoverItem onClick={() => {}}>
                        PDF
                      </ActionPopoverItem>
                    </>
                  }
                >
                  Print
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem onClick={() => {}} icon="delete">
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
```


### Focus Button Programmatically

**Render**

```tsx
() => {
  const ref = useRef<ActionPopoverHandle>(null);
  const refMore = useRef<ActionPopoverHandle>(null);

  const renderButton = ({
    "data-element": dataElement,
    ariaAttributes,
  }: RenderButtonProps) => (
    <Button
      variantType="tertiary"
      iconType="ellipsis_vertical"
      iconPosition="after"
      size="small"
      aria-label={undefined}
      data-element={dataElement}
      {...ariaAttributes}
    >
      More
    </Button>
  );

  return (
    <>
      <Button
        onClick={() => {
          ref.current?.focusButton();
        }}
      >
        Focus
      </Button>
      <ActionPopover ref={ref}>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>

      <Button
        onClick={() => {
          refMore.current?.focusButton();
        }}
      >
        Focus More
      </Button>
      <ActionPopover renderButton={renderButton} ref={refMore} mt={3}>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </>
  );
}
```


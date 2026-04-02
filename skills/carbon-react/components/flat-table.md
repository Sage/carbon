---
name: carbon-component-flat-table
description: Carbon FlatTable component props and usage examples.
---

# FlatTable

## Import
`import { FlatTable } from "carbon-react/lib/components/flat-table";`

## Source
- Export: `./components/flat-table`
- Props interface: `FlatTableProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | FlatTableHead and FlatTableBody |  |
| ariaDescribedby | string \| undefined | No |  | The HTML id of the element that contains a description of this table. |  |
| bottomBorderRadius | "borderRadius100" \| "borderRadius200" \| "borderRadius400" \| "borderRadius000" \| "borderRadius010" \| "borderRadius025" \| "borderRadius050" \| undefined | No |  | Sets the border radius of the first and last cells in the last row. | "borderRadius100" |
| caption | string \| undefined | No |  | A string to render as the table's caption |  |
| colorTheme | "dark" \| "light" \| "transparent-base" \| "transparent-white" \| undefined | No |  | `FlatTable` color theme | "dark" |
| footer | React.ReactNode | No |  | Content to be rendered at the foot of the table |  |
| hasMaxHeight | boolean \| undefined | No |  | Applies max-height of 100% to FlatTable if true | false |
| hasOuterVerticalBorders | boolean \| undefined | No |  | Toggles the visibility of the table's outer left and right borders. When false, the left border of the first column and the right border of the last column are hidden. | true |
| hasStickyFooter | boolean \| undefined | No |  | If true, the header does not scroll with the content | false |
| hasStickyHead | boolean \| undefined | No |  | If true, the header does not scroll with the content |  |
| height | string \| number \| undefined | No |  | Set the height of the table. String can be any valid CSS string, numbers will be converted to pixels. |  |
| isZebra | boolean \| undefined | No |  | Toggles the zebra striping for the table rows |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| minHeight | string \| number \| undefined | No |  | Set the min-height of the table. String can be any valid CSS string, numbers will be converted to pixels. |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| overflowX | string \| undefined | No |  | Set the overflow X of the table wrapper. Any valid CSS string |  |
| size | "small" \| "medium" \| "large" \| "compact" \| "extraLarge" \| undefined | No |  | Used to define the tables size Renders as: 'compact', 'small', 'medium', 'large' and 'extraLarge' | "medium" |
| title | string \| undefined | No |  | The title to describe the table when one or more tables are used on a single page |  |
| width | string \| undefined | No |  | Width of the table. Any valid CSS string |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### DefaultStory

**Render**

```tsx
(args) => (
    <FlatTable {...args} title="Table for Default Story">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Box
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              Name <Icon type="individual" color="white" />
            </Box>
          </FlatTableHeader>
          <FlatTableHeader>
            <Box
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              Location <Icon type="location" color="white" />
            </Box>
          </FlatTableHeader>
          <FlatTableHeader>
            <Box
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              Relationship Status <Icon type="person_info" color="white" />
            </Box>
          </FlatTableHeader>
          <FlatTableHeader>
            <Box
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              Dependents <Icon type="people" color="white" />
            </Box>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  )
```


### With Row Header

**Render**

```tsx
() => {
  return (
    <FlatTable width="380px" overflowX="auto" title="Table for Row Header">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>ID Number</FlatTableHeader>
          <FlatTableRowHeader>Name</FlatTableRowHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>000001</FlatTableCell>
          <FlatTableRowHeader>John Doe</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>000002</FlatTableCell>
          <FlatTableRowHeader>Jane Doe</FlatTableRowHeader>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>000003</FlatTableCell>
          <FlatTableRowHeader>John Smith</FlatTableRowHeader>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>000004</FlatTableCell>
          <FlatTableRowHeader>Jane Smith</FlatTableRowHeader>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Multiple Row Headers

**Render**

```tsx
() => {
  return (
    <FlatTable
      width="680px"
      overflowX="auto"
      title="Table for Multiple Row Headers"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Sticky Column</FlatTableHeader>
          <FlatTableRowHeader>Sticky Column</FlatTableRowHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableHeader>Scrollable Column</FlatTableHeader>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Column
          </FlatTableRowHeader>
          <FlatTableHeader>Sticky Column</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Sticky Content</FlatTableCell>
          <FlatTableRowHeader>Sticky Content</FlatTableRowHeader>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableCell>Scrollable Content</FlatTableCell>
          <FlatTableRowHeader stickyAlignment="right">
            Sticky Content
          </FlatTableRowHeader>
          <FlatTableCell>Sticky Content</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Horizontal Scrolling

**Render**

```tsx
() => {
  return (
    <FlatTable
      width="380px"
      overflowX="auto"
      aria-label="Horizontal scroll table"
      title="Table for Horizontal Scroll Table"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Custom Cell Paddings

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Custom Cell Paddings">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader px={1} py={2}>
            Name
          </FlatTableHeader>
          <FlatTableHeader px={2} py={2}>
            Location
          </FlatTableHeader>
          <FlatTableHeader px={3} py={2}>
            Relationship Status
          </FlatTableHeader>
          <FlatTableHeader px={4} py={2}>
            Dependents
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell px={key}>John Doe</FlatTableCell>
            <FlatTableCell pl={key}>London</FlatTableCell>
            <FlatTableCell p={key}>Single</FlatTableCell>
            <FlatTableCell pl={key}>5</FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Custom Column Width

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Custom Column Width">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader width={80}>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader width={200}>Notes</FlatTableHeader>
          <FlatTableHeader width={40} px={1}>
            <Icon color="white" type="settings" />
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>
              <Textbox
                placeholder="Notes for John Doe"
                size="small"
                value=""
                onChange={() => {}}
              />
            </FlatTableCell>
            <FlatTableCell px={1}>
              <ActionPopover>
                <ActionPopoverItem onClick={() => {}} icon="graph">
                  Business
                </ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}} icon="email">
                  Email Invoice
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Custom Row Background Color

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Custom Row Backgroun Colour">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableRowHeader>No.</FlatTableRowHeader>
          <FlatTableHeader />
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow bgColor="#B1D345">
          <FlatTableRowHeader>1</FlatTableRowHeader>
          <FlatTableCheckbox
            ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
            checked={false}
            onChange={() => {}}
          />
          <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
          <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
          <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableRowHeader>2</FlatTableRowHeader>
          <FlatTableCheckbox
            ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
            checked={false}
            onChange={() => {}}
          />
          <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
          <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
          <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow bgColor="#B1D345">
          <FlatTableRowHeader>3</FlatTableRowHeader>
          <FlatTableCheckbox
            ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
            checked={false}
            onChange={() => {}}
          />
          <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
          <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
          <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableRowHeader>4</FlatTableRowHeader>
          <FlatTableCheckbox
            ariaLabelledBy="ft-row-4-cell-1 ft-row-4-cell-2 ft-row-4-cell-3"
            checked={false}
            onChange={() => {}}
          />
          <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
          <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
          <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Custom Horizontal Border Size

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Custom Horizontal Border Size">
      <FlatTableHead>
        <FlatTableRow horizontalBorderSize="large">
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow horizontalBorderSize="medium">
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderSize="large">
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Custom Horizontal Border Color

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Custom Horizontal Border Colour">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow horizontalBorderColor="goldTint10">
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="blue">
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="--colorsUtilityYin090">
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Custom Bottom Border Radius

**Render**

```tsx
() => {
  return (
    <FlatTable
      bottomBorderRadius="borderRadius000"
      title="Table for Custom Bottom Border Radius"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Custom Vertical Borders

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Custom Vertical Borders">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader verticalBorder="small" verticalBorderColor="#335CDC">
            Name
          </FlatTableHeader>
          <FlatTableHeader
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Location
          </FlatTableHeader>
          <FlatTableHeader verticalBorder="large">
            Relationship Status
          </FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            John Doe
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            London
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            Jane Doe
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            York
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            John Smith
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Edinburgh
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            Jane Smith
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Newcastle
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Alternative Header Background

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Alternative Header Background">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader rowspan="2">Name</FlatTableHeader>
          <FlatTableHeader colspan="2">Location</FlatTableHeader>
          <FlatTableHeader rowspan="2">Relationship Status</FlatTableHeader>
          <FlatTableHeader rowspan="2">Dependents</FlatTableHeader>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableHeader alternativeBgColor>City</FlatTableHeader>
          <FlatTableHeader alternativeBgColor>Country</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Scotland</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>England</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Truncated Cell Content

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Truncated Cell Content">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Notes</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {[1, 2, 3, 4].map((key) => (
          <FlatTableRow key={key}>
            <FlatTableCell width={60} pr={0} truncate>
              John Doe
            </FlatTableCell>
            <FlatTableCell width={50} pr={0} truncate title="Alternate Title">
              London
            </FlatTableCell>
            <FlatTableCell>
              <Textbox
                size="small"
                aria-label="textbox"
                value=""
                onChange={() => {}}
              />
            </FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Sticky Head

**Render**

```tsx
() => {
  return (
    <Box height="150px">
      <FlatTable hasStickyHead title="Table for Sticky Header">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Doe</FlatTableCell>
            <FlatTableCell>York</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>John Smith</FlatTableCell>
            <FlatTableCell>Edinburgh</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Newcastle</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
}
```


### With StickyHead rowspan and colspan

**Render**

```tsx
() => {
  return (
    <FlatTable
      hasStickyHead
      height="380px"
      width="310px"
      overflowX="auto"
      title="Table for Sticky Header with Row and Column spans"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader rowspan={2}>Name</FlatTableHeader>
          <FlatTableRowHeader rowspan={2}>Code</FlatTableRowHeader>
          <FlatTableHeader colspan={2}>Jun 21</FlatTableHeader>
          <FlatTableHeader rowspan={2} />
          <FlatTableHeader colspan={2}>YTD</FlatTableHeader>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableHeader>Debit</FlatTableHeader>
          <FlatTableHeader>Credit</FlatTableHeader>
          <FlatTableHeader>Debit</FlatTableHeader>
          <FlatTableHeader>Credit</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeader>000001</FlatTableRowHeader>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With Sticky Footer

**Render**

```tsx
() => {
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const rows = [
    <FlatTableRow key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="2">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="3">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="4">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="5">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="6">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="7">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="8">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="9">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="10">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="11">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="12">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="13">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="14">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="15">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="16">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="17">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
  ];

  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };

  const handlePagination = (newPage: number, newPageSize: number) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };

  return (
    <Box height={220} marginBottom={16}>
      <FlatTable
        title="Table for Sticky Footer"
        hasStickyHead
        hasStickyFooter
        footer={
          <Pager
            totalRecords={rows.length}
            showPageSizeSelection
            pageSize={10}
            currentPage={currentPage}
            onPagination={(next, size) => handlePagination(next, size)}
            pageSizeSelectionOptions={[
              { id: "10", name: 10 },
              { id: "15", name: 15 },
            ]}
          />
        }
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{renderRows()}</FlatTableBody>
      </FlatTable>
    </Box>
  );
}
```


### With Sticky Footer Inside of Larger Div

**Render**

```tsx
() => {
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const rows = [
    <FlatTableRow key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
  ];

  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };

  const handlePagination = (newPage: number, newPageSize: number) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };

  return (
    <Box height="220px" marginBottom="16px">
      <FlatTable
        title="Table for Sticky Footer inside large Div"
        hasStickyHead
        hasStickyFooter
        footer={
          <Pager
            totalRecords={rows.length}
            showPageSizeSelection
            pageSize={10}
            currentPage={currentPage}
            onPagination={(next, size) => handlePagination(next, size)}
            pageSizeSelectionOptions={[
              { id: "10", name: 10 },
              { id: "15", name: 15 },
            ]}
          />
        }
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{renderRows()}</FlatTableBody>
      </FlatTable>
    </Box>
  );
}
```


### With hasMaxHeight

**Render**

```tsx
() => {
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const rows = [
    <FlatTableRow key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
  ];

  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };

  const handlePagination = (newPage: number, newPageSize: number) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };

  return (
    <Box height="180px" marginBottom="16px">
      <FlatTable
        title="Table for Max Height"
        hasMaxHeight
        footer={
          <Pager
            totalRecords={rows.length}
            showPageSizeSelection
            pageSize={10}
            currentPage={currentPage}
            onPagination={(next, size) => handlePagination(next, size)}
            pageSizeSelectionOptions={[
              { id: "10", name: 10 },
              { id: "15", name: 15 },
            ]}
          />
        }
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{renderRows()}</FlatTableBody>
      </FlatTable>
    </Box>
  );
}
```


### WithoutVerticalBorders

**Args**

```tsx
{
    hasOuterVerticalBorders: false,
    bottomBorderRadius: "borderRadius000",
  }
```


### With Clickable Rows

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Clickable Rows">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow onClick={() => {}}>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### Zebra

**Render**

```tsx
() => {
  return (
    <FlatTable isZebra title="Table for Zebra">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### WithSortingHeaders

**Render**

```tsx
(args: FlatTableProps) => {
    const headDataItems: HeadDataItems = [
      { name: "client", isActive: true },
      { name: "total", isActive: false },
    ];
    const bodyDataItems: BodyDataItems = [
      { client: "Jason Atkinson", total: 1349 },
      { client: "Monty Parker", total: 849 },
      { client: "Blake Sutton", total: 3840 },
      { client: "Tyler Webb", total: 280 },
    ];
    /* eslint-disable react-hooks/rules-of-hooks */
    const [headData, setHeadData] = useState(headDataItems);
    const [sortType, setSortType] = useState<SortType>("ascending");
    const [sortValue, setSortValue] = useState<SortValue>("client");
    /* eslint-enable react-hooks/rules-of-hooks */

    const sortByNumber = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        if (type === "ascending") {
          return Number(a[sortByValue]) - Number(b[sortByValue]);
        }
        if (type === "descending") {
          return Number(b[sortByValue]) - Number(a[sortByValue]);
        }
        return 0;
      });
      return sortedData;
    };

    const sortByString = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        const nameA = String(a[sortByValue]).toUpperCase();
        const nameB = String(b[sortByValue]).toUpperCase();

        if (type === "ascending") {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        if (type === "descending") {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }
        return 0;
      });
      return sortedData;
    };

    const handleClick = (value: SortValue) => {
      const tempHeadData = headData;
      tempHeadData.forEach((item) => {
        item.isActive = false;
        if (item.name === value) {
          item.isActive = !item.isActive;
        }
      });
      setSortValue(value);
      setSortType(sortType === "ascending" ? "descending" : "ascending");
      setHeadData([...tempHeadData]);
    };

    const renderSortedData = (sortByValue: SortValue) => {
      let sortedData = bodyDataItems;
      if (typeof bodyDataItems[0][sortByValue] === "string") {
        sortedData = sortByString(sortedData, sortByValue, sortType);
      }
      if (typeof bodyDataItems[0][sortByValue] === "number") {
        sortedData = sortByNumber(sortedData, sortByValue, sortType);
      }

      return sortedData.map(({ client, total }) => {
        return (
          <FlatTableRow key={client}>
            <FlatTableCell>{client}</FlatTableCell>
            <FlatTableCell>{total}</FlatTableCell>
          </FlatTableRow>
        );
      });
    };

    return (
      <>
        <Typography as="div" role="status" aria-live="polite" screenReaderOnly>
          {`Sort by ${sortValue} (${sortType})`}
        </Typography>
        <FlatTable {...args} title="Table for sorting headers">
          <FlatTableHead>
            <FlatTableRow>
              {headData.map(({ name, isActive }) => {
                return (
                  <FlatTableHeader key={name}>
                    <Sort
                      onClick={() => handleClick(name)}
                      {...(isActive && { sortType })}
                    >
                      {name}
                    </Sort>
                  </FlatTableHeader>
                );
              })}
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>{renderSortedData(sortValue)}</FlatTableBody>
        </FlatTable>
      </>
    );
  }
```


### WithSortingHeadersAndCustomAccessibleName

**Render**

```tsx
(args: FlatTableProps) => {
    const headDataItems: HeadDataItems = [
      { name: "client", isActive: true },
      { name: "total", isActive: false },
    ];
    const bodyDataItems: BodyDataItems = [
      { client: "Jason Atkinson", total: 1349 },
      { client: "Monty Parker", total: 849 },
      { client: "Blake Sutton", total: 3840 },
      { client: "Tyler Webb", total: 280 },
    ];
    /* eslint-disable react-hooks/rules-of-hooks */
    const [headData, setHeadData] = useState(headDataItems);
    const [sortType, setSortType] = useState<SortType>("ascending");
    const [sortValue, setSortValue] = useState<SortValue>("client");
    /* eslint-enable react-hooks/rules-of-hooks */

    const sortByNumber = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        if (type === "ascending") {
          return Number(a[sortByValue]) - Number(b[sortByValue]);
        }
        if (type === "descending") {
          return Number(b[sortByValue]) - Number(a[sortByValue]);
        }
        return 0;
      });
      return sortedData;
    };

    const sortByString = (
      dataToSort: BodyDataItems,
      sortByValue: SortValue,
      type: SortType,
    ) => {
      const sortedData = dataToSort.sort((a, b) => {
        const nameA = String(a[sortByValue]).toUpperCase();
        const nameB = String(b[sortByValue]).toUpperCase();

        if (type === "ascending") {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        if (type === "descending") {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }
        return 0;
      });
      return sortedData;
    };

    const handleClick = (value: SortValue) => {
      const tempHeadData = headData;
      tempHeadData.forEach((item) => {
        item.isActive = false;
        if (item.name === value) {
          item.isActive = !item.isActive;
        }
      });
      setSortValue(value);
      setSortType(sortType === "ascending" ? "descending" : "ascending");
      setHeadData([...tempHeadData]);
    };

    const renderSortedData = (sortByValue: SortValue) => {
      let sortedData = bodyDataItems;
      if (typeof bodyDataItems[0][sortByValue] === "string") {
        sortedData = sortByString(sortedData, sortByValue, sortType);
      }
      if (typeof bodyDataItems[0][sortByValue] === "number") {
        sortedData = sortByNumber(sortedData, sortByValue, sortType);
      }

      return sortedData.map(({ client, total }) => {
        return (
          <FlatTableRow key={client}>
            <FlatTableCell>{client}</FlatTableCell>
            <FlatTableCell>{total}</FlatTableCell>
          </FlatTableRow>
        );
      });
    };

    return (
      <>
        <Typography as="div" role="status" aria-live="polite" screenReaderOnly>
          {`Sort by ${sortValue} (${sortType})`}
        </Typography>
        <FlatTable
          {...args}
          title="Table for sorting headers with custom accessible name"
        >
          <FlatTableHead>
            <FlatTableRow>
              {headData.map(({ name, isActive }) => {
                return (
                  <FlatTableHeader key={name}>
                    <Sort
                      accessibleName={`Sort ${name}s in an ${sortType} order`}
                      onClick={() => handleClick(name)}
                      {...(isActive && { sortType })}
                    >
                      {name}
                    </Sort>
                  </FlatTableHeader>
                );
              })}
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>{renderSortedData(sortValue)}</FlatTableBody>
        </FlatTable>
      </>
    );
  }
```


### With colspan

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Col Span">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell colspan="4" align="center">
            No results
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### With rowspan

**Render**

```tsx
() => {
  return (
    <FlatTable title="Table for Row Span">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Parent Name</FlatTableHeader>
          <FlatTableHeader>Child Name</FlatTableHeader>
          <FlatTableHeader>Child Age</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell rowspan="3">Jane Smith</FlatTableCell>
          <FlatTableCell>Tim Smith</FlatTableCell>
          <FlatTableCell>8</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Chris Smith</FlatTableCell>
          <FlatTableCell>8</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Alice Smith</FlatTableCell>
          <FlatTableCell>12</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### Selectable Rows

**Render**

```tsx
() => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<SelectedRows>({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRow] = !selectAll;
    });
    setSelectedRows({ ...newState });
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: SelectedRow) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }
    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRow]),
  ).length;

  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <FlatTable title="Table for Selectable Rows">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-header-1 ft-header-2 ft-header-3 ft-header-4"
              onClick={(e) => e.stopPropagation()}
              as="th"
              checked={selectAll}
              onChange={() => handleSelectAllRows()}
            />
            <FlatTableHeader id="ft-header-1">Name</FlatTableHeader>
            <FlatTableHeader id="ft-header-2">Location</FlatTableHeader>
            <FlatTableHeader id="ft-header-3">
              Relationship Status
            </FlatTableHeader>
            <FlatTableHeader id="ft-header-4">Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow selected={selectedRows.one}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one}
              onChange={() => handleSelectRow("one")}
            />
            <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.two}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.two}
              onChange={() => handleSelectRow("two")}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.three}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three}
              onChange={() => handleSelectRow("three")}
            />
            <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.four}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.four}
              onChange={() => handleSelectRow("four")}
            />
            <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>
  );
}
```


### With Disabled Checkboxes

**Render**

```tsx
() => {
  const initialRowState = {
    one: false,
    two: false,
    three: false,
    four: false,
  };

  const [selectedRows, setSelectedRows] =
    useState<SelectedRows>(initialRowState);

  const [disabledRows, setDisabledRows] =
    useState<SelectedRows>(initialRowState);

  const handleSelectRow = (id: SelectedRow) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const performMockAction = () => {
    setDisabledRows(selectedRows);
    setSelectedRows(initialRowState);
    setTimeout(() => setDisabledRows(initialRowState), 2_000);
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRow]),
  ).length;

  const disabledCount = Object.keys(disabledRows).filter((key) =>
    Boolean(disabledRows[key as SelectedRow]),
  ).length;

  return (
    <main>
      <BatchSelection selectedCount={selectedCount}>
        <Button
          variantType="subtle"
          aria-label="csv"
          onClick={performMockAction}
          disabled={disabledCount > 0}
          iconType="csv"
        />
        <Button
          variantType="subtle"
          aria-label="delete"
          onClick={performMockAction}
          disabled={disabledCount > 0}
          iconType="bin"
        />
        <Button
          variantType="subtle"
          aria-label="pdf"
          onClick={performMockAction}
          disabled={disabledCount > 0}
          iconType="pdf"
        />
      </BatchSelection>
      <FlatTable title="Table with Disabled Checkboxes" mt={1}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>
              <Typography screenReaderOnly>Select rows</Typography>
            </FlatTableHeader>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow selected={selectedRows.one}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-dc-row-1-cell-1 ft-dc-row-1-cell-2 ft-dc-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one}
              onChange={() => handleSelectRow("one")}
              disabled={disabledRows.one}
            />
            <FlatTableCell id="ft-dc-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-dc-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-dc-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.two}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-dc-row-2-cell-1 ft-dc-row-2-cell-2 ft-dc-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.two}
              onChange={() => handleSelectRow("two")}
              disabled={disabledRows.two}
            />
            <FlatTableCell id="ft-dc-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-dc-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-dc-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.three}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-dc-row-3-cell-1 ft-dc-row-3-cell-2 ft-dc-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three}
              onChange={() => handleSelectRow("three")}
              disabled={disabledRows.three}
            />
            <FlatTableCell id="ft-dc-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-dc-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-dc-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow selected={selectedRows.four}>
            <FlatTableCheckbox
              ariaLabelledBy="ft-dc-row-4-cell-1 ft-dc-row-4-cell-2 ft-dc-row-4-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.four}
              onChange={() => handleSelectRow("four")}
              disabled={disabledRows.four}
            />
            <FlatTableCell id="ft-dc-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-dc-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-dc-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </main>
  );
}
```


### Highlightable Rows

**Render**

```tsx
() => {
  const [highlightedRow, setHighlightedRow] = useState("");

  const handleHighlightRow = (id: HighlightedRow) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  return (
    <FlatTable title="Table for highlightable rows">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow
          onClick={() => handleHighlightRow("one")}
          highlighted={highlightedRow === "one"}
        >
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow
          onClick={() => handleHighlightRow("two")}
          highlighted={highlightedRow === "two"}
        >
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow
          onClick={() => handleHighlightRow("three")}
          highlighted={highlightedRow === "three"}
        >
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow
          onClick={() => handleHighlightRow("four")}
          highlighted={highlightedRow === "four"}
        >
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### Selectable and Highlightable Rows

**Render**

```tsx
() => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<SelectedRows>({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [highlightedRow, setHighlightedRow] = useState<HighlightedRow>("");

  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRow] = !selectAll;
    });
    setSelectedRows(newState);
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: SelectedRow) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }
    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };

  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRow]),
  ).length;

  const handleHighlightRow = (id: HighlightedRow) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <FlatTable title="Table for selectable and highlightable rows">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-header-1 ft-header-2 ft-header-3 ft-header-4"
              onClick={(e) => e.stopPropagation()}
              as="th"
              checked={selectAll}
              onChange={() => handleSelectAllRows()}
            />
            <FlatTableHeader id="ft-header-1">Name</FlatTableHeader>
            <FlatTableHeader id="ft-header-2">Location</FlatTableHeader>
            <FlatTableHeader id="ft-header-3">
              Relationship Status
            </FlatTableHeader>
            <FlatTableHeader id="ft-header-4">Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow
            onClick={() => handleHighlightRow("one")}
            selected={selectedRows.one}
            highlighted={highlightedRow === "one"}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.one}
              onChange={() => handleSelectRow("one")}
            />
            <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("two")}
            selected={selectedRows.two}
            highlighted={highlightedRow === "two"}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.two}
              onChange={() => handleSelectRow("two")}
            />
            <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("three")}
            selected={selectedRows.three}
            highlighted={highlightedRow === "three"}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.three}
              onChange={() => handleSelectRow("three")}
            />
            <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
            <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("four")}
            selected={selectedRows.four}
            highlighted={highlightedRow === "four"}
          >
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.four}
              onChange={() => handleSelectRow("four")}
            />
            <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
            <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </>
  );
}
```


### Paginated

**Render**

```tsx
() => {
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const rows = [
    <FlatTableRow key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="2">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="3">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="4">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="5">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="6">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="7">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="8">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="9">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="10">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="11">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="12">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="13">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="14">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="15">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="16">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="17">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
  ];

  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };

  const handlePagination = (newPage: number, newPageSize: number) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };

  return (
    <FlatTable
      title="Table for pagination"
      overflowX="auto"
      width="100%"
      footer={
        <Pager
          smallScreenBreakpoint="550px"
          totalRecords={rows.length}
          showPageSizeSelection
          pageSize={10}
          currentPage={currentPage}
          onPagination={(next, size) => handlePagination(next, size)}
          pageSizeSelectionOptions={[
            { id: "10", name: 10 },
            { id: "15", name: 15 },
          ]}
        />
      }
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>{renderRows()}</FlatTableBody>
    </FlatTable>
  );
}
```


### Paginated with Sticky Header

**Render**

```tsx
() => {
  const [placementUp, setPlacementUp] = useState(true);
  const rows = [
    <FlatTableRow key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="2">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="3">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="4">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="5">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="6">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="7">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="8">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="9">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="10">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="11">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="12">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="13">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="14">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="15">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem onClick={() => {}}>action</ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="16">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover placement={placementUp ? "top" : "bottom"}>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="17">
      <FlatTableCell>Karl Ickbred</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
          <ActionPopoverItem
            onClick={() => {}}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            action
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>,
  ];
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 });
  const [currentPage, setCurrentPage] = useState(1);

  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };

  const handlePagination = (newPage: number, newPageSize: number) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setPlacementUp(newPageSize !== 1);
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };

  return (
    <Box height="200px">
      <FlatTable
        title="Table for pagination with sticky header and footer"
        hasStickyHead
        hasStickyFooter
        overflowX="auto"
        width="100%"
        footer={
          <Pager
            smallScreenBreakpoint="550px"
            totalRecords={rows.length}
            showPageSizeSelection
            pageSize={10}
            currentPage={currentPage}
            onPagination={(next, size) => handlePagination(next, size)}
            pageSizeSelectionOptions={[
              { id: "10", name: 10 },
              { id: "15", name: 15 },
            ]}
          />
        }
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>{renderRows()}</FlatTableBody>
      </FlatTable>
    </Box>
  );
}
```


### When a Child of Sidebar

**Render**

```tsx
() => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<SelectedRows>({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [highlightedRow, setHighlightedRow] = useState("");

  const handleSelectAllRows = () => {
    const newState = { ...selectedRows };
    Object.keys(selectedRows).forEach((key) => {
      newState[key as SelectedRow] = !selectAll;
    });
    setSelectedRows(newState);
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: SelectedRow) => {
    if (selectedRows[id]) {
      setSelectAll(false);
    }
    setSelectedRows({ ...selectedRows, [id]: !selectedRows[id] });
  };
  const selectedCount = Object.keys(selectedRows).filter((key) =>
    Boolean(selectedRows[key as SelectedRow]),
  ).length;

  const handleHighlightRow = (id: HighlightedRow) => {
    if (highlightedRow === id) {
      setHighlightedRow("");
    } else {
      setHighlightedRow(id);
    }
  };

  return (
    <>
      <BatchSelection
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
      >
        <IconButton aria-label="csv" onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => {}}>
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="pdf" onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
      </BatchSelection>
      <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
        <FlatTable title="Table for child of sidebar">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableCheckbox
                ariaLabelledBy="ft-header-1 ft-header-2 ft-header-3 ft-header-4"
                onClick={(e) => e.stopPropagation()}
                as="th"
                checked={selectAll}
                onChange={() => handleSelectAllRows()}
              />
              <FlatTableHeader id="ft-header-1">Name</FlatTableHeader>
              <FlatTableHeader id="ft-header-2">Location</FlatTableHeader>
              <FlatTableHeader id="ft-header-3">
                Relationship Status
              </FlatTableHeader>
              <FlatTableHeader id="ft-header-4">Dependents</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow
              onClick={() => handleHighlightRow("one")}
              selected={selectedRows.one}
              highlighted={highlightedRow === "one"}
            >
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
                onClick={(e) => e.stopPropagation()}
                checked={selectedRows.one}
                onChange={() => handleSelectRow("one")}
              />
              <FlatTableCell id="ft-row-1-cell-1">John Doe</FlatTableCell>
              <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
              <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
              <FlatTableCell>0</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow
              onClick={() => handleHighlightRow("two")}
              selected={selectedRows.two}
              highlighted={highlightedRow === "two"}
            >
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
                onClick={(e) => e.stopPropagation()}
                checked={selectedRows.two}
                onChange={() => handleSelectRow("two")}
              />
              <FlatTableCell id="ft-row-2-cell-1">Jane Doe</FlatTableCell>
              <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
              <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
              <FlatTableCell>2</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow
              onClick={() => handleHighlightRow("three")}
              selected={selectedRows.three}
              highlighted={highlightedRow === "three"}
            >
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
                onClick={(e) => e.stopPropagation()}
                checked={selectedRows.three}
                onChange={() => handleSelectRow("three")}
              />
              <FlatTableCell id="ft-row-3-cell-1">John Smith</FlatTableCell>
              <FlatTableCell id="ft-row-3-cell-2">Edinburgh</FlatTableCell>
              <FlatTableCell id="ft-row-3-cell-3">Single</FlatTableCell>
              <FlatTableCell>1</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow
              onClick={() => handleHighlightRow("four")}
              selected={selectedRows.four}
              highlighted={highlightedRow === "four"}
            >
              <FlatTableCheckbox
                ariaLabelledBy="ft-row-3-cell-1 ft-row-3-cell-2 ft-row-3-cell-3"
                onClick={(e) => e.stopPropagation()}
                checked={selectedRows.four}
                onChange={() => handleSelectRow("four")}
              />
              <FlatTableCell id="ft-row-4-cell-1">Jane Smith</FlatTableCell>
              <FlatTableCell id="ft-row-4-cell-2">Newcastle</FlatTableCell>
              <FlatTableCell id="ft-row-4-cell-3">Married</FlatTableCell>
              <FlatTableCell>5</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      </DrawerSidebarContext.Provider>
    </>
  );
}
```


### Sizes

**Render**

```tsx
() => {
  const sizes = ["compact", "small", "medium", "large", "extraLarge"] as const;
  return (
    <Box>
      {sizes.map((size) => (
        <Box mb={3} key={size}>
          <FlatTable
            size={size}
            aria-label={`flat-table-${size}`}
            title={`Table for ${size} Size`}
          >
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>Name</FlatTableHeader>
                <FlatTableHeader>Location</FlatTableHeader>
                <FlatTableHeader>Relationship Status</FlatTableHeader>
                <FlatTableHeader>Dependents</FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              <FlatTableRow>
                <FlatTableCell>John Doe</FlatTableCell>
                <FlatTableCell>London</FlatTableCell>
                <FlatTableCell>Single</FlatTableCell>
                <FlatTableCell>0</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Doe</FlatTableCell>
                <FlatTableCell>York</FlatTableCell>
                <FlatTableCell>Married</FlatTableCell>
                <FlatTableCell>2</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>John Smith</FlatTableCell>
                <FlatTableCell>Edinburgh</FlatTableCell>
                <FlatTableCell>Single</FlatTableCell>
                <FlatTableCell>1</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Newcastle</FlatTableCell>
                <FlatTableCell>Married</FlatTableCell>
                <FlatTableCell>5</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        </Box>
      ))}
    </Box>
  );
}
```


### With Draggable Rows

**Render**

```tsx
() => {
  const rows = [
    {
      id: "0",
      name: "UK",
    },
    {
      id: "1",
      name: "Germany",
    },
    {
      id: "2",
      name: "China",
    },
    {
      id: "3",
      name: "US",
    },
  ];
  return (
    <FlatTable title="Table for draggable rows">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader />
          <FlatTableHeader>Country</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBodyDraggable>
        {rows.map((row) => (
          <FlatTableRow key={row.id} id={row.id}>
            <FlatTableCell>{row.name}</FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBodyDraggable>
    </FlatTable>
  );
}
```


### Wrapping Row Headers

**Render**

```tsx
() => {
  const FlatTableRowHeaderWrapper = ({
    children,
    ...rest
  }: FlatTableRowHeaderProps) => (
    <FlatTableRowHeader {...rest}>{children}</FlatTableRowHeader>
  );
  FlatTableRowHeaderWrapper.displayName = FlatTableRowHeader.displayName;

  return (
    <FlatTable
      width="310px"
      overflowX="auto"
      title="Table for wrapping row headers"
    >
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableRowHeaderWrapper>Location</FlatTableRowHeaderWrapper>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableRowHeaderWrapper>London</FlatTableRowHeaderWrapper>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableRowHeaderWrapper>York</FlatTableRowHeaderWrapper>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableRowHeaderWrapper>Edinburgh</FlatTableRowHeaderWrapper>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableRowHeaderWrapper>Newcastle</FlatTableRowHeaderWrapper>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem onClick={() => {}} icon="edit">
                Edit
              </ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### MDX Example 1

**Args**

```tsx
**It is necessary that `FlatTableCell` and `FlatTableHeader` components are a direct children of `FlatTableRow` component.**

This is because `FlatTableRow` iterates through and clones the children applying different props depending on the index of the given child.
If you need to wrap `FlatTableCell` or `FlatTableHeader` remember to spread all the props directly to these components as shown below:
```


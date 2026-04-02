---
name: carbon-component-vertical-divider
description: Carbon VerticalDivider component props and usage examples.
---

# VerticalDivider

## Import
`import VerticalDivider from "carbon-react/lib/components/vertical-divider";`

## Source
- Export: `./components/vertical-divider`
- Props interface: `VerticalDividerProps`
- Deprecated: Yes
- Deprecation reason: `VerticalDivider` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| displayInline | boolean \| undefined | No |  | Sets the display: inline css attribute on the component To be used in non-flex containers. | false |
| h | string \| number \| undefined | No |  | Shorthand for the height attribute |  |
| height | string \| number \| undefined | No |  | Height attribute of the component |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| tint | TintRange \| undefined | No |  | Custom tint of the divider, the supported rage is 1-100 | 80 |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | boolean \| undefined | No |  | Set the divider to be hidden from screen readers. Please note that this cannot be overridden when inside a Menu. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <Box display="inline-flex">
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
    </Box>
  );
}
```


### In a Dialog

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click Me</Button>
      <Dialog title="Title" open={isOpen} onCancel={() => setIsOpen(false)}>
        <Box display="inline-flex">
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
        </Box>
      </Dialog>
    </>
  );
}
```


### In a Flex Container

**Render**

```tsx
() => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={24}>
      <Icon type="home" />
      <VerticalDivider h={16} />
      <Icon type="settings" />
      <VerticalDivider h={16} />
      <Icon type="add" />
      <VerticalDivider h={16} />
      <Icon type="minus" />
      <VerticalDivider h={16} />
      <Icon type="info" />
      <VerticalDivider h={16} />
      <Icon type="warning" />
      <VerticalDivider h={16} />
      <Icon type="chevron_up" />
      <VerticalDivider h={16} />
      <Icon type="chevron_down" />
      <VerticalDivider h={16} />
      <Icon type="edit" />
    </Box>
  );
}
```


### In a Menu

**Render**

```tsx
() => {
  return (
    <Box minHeight={120}>
      <Menu menuType="dark">
        <MenuItem href="#">Menu Item One</MenuItem>
        <VerticalDivider height={24} p={1} tint={20} />
        <MenuItem submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
}
```


### In a Non Flex Container

**Render**

```tsx
() => {
  return (
    <Box display="inline-block" width={620} height="auto" my={0} mx={180}>
      <Icon type="home" />
      <VerticalDivider displayInline />
      <Icon type="settings" />
      <VerticalDivider displayInline />
      <Icon type="add" />
      <VerticalDivider displayInline />
      <Icon type="minus" />
      <VerticalDivider displayInline />
      <Icon type="info" />
      <VerticalDivider displayInline />
      <Icon type="warning" />
      <VerticalDivider displayInline />
      <Icon type="chevron_up" />
      <VerticalDivider displayInline />
      <Icon type="chevron_down" />
      <VerticalDivider displayInline />
      <Icon type="edit" />
    </Box>
  );
}
```


### In a Table

**Render**

```tsx
() => {
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Dish Name</FlatTableHeader>
          <FlatTableHeader>Ingredients</FlatTableHeader>
          <FlatTableHeader>Cooking Time</FlatTableHeader>
          <FlatTableHeader>Prep Time</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>Pancakes</FlatTableCell>
          <FlatTableCell>
            Eggs
            <VerticalDivider displayInline />
            Flour
            <VerticalDivider displayInline />
            Milk
          </FlatTableCell>
          <FlatTableCell>5 minutes</FlatTableCell>
          <FlatTableCell>5 minutes</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
```


### In a Tile

**Render**

```tsx
() => {
  return (
    <Tile width={800} orientation="vertical">
      <TileContent>
        <Content title="Test Title One">Test Body One</Content>
      </TileContent>
      <TileContent>
        <Box display="inline-flex">
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
        </Box>
      </TileContent>
    </Tile>
  );
}
```


### In Grid Container

**Render**

```tsx
() => {
  return (
    <GridContainer>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="1"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <VerticalDivider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="3 / 4"
        gridRow="1 /2 "
      >
        <VerticalDivider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="5 / 6"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <VerticalDivider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="7 / 8"
        gridRow="1 / 2"
      >
        <VerticalDivider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="9 / 10"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <VerticalDivider h={100} />
        <Square size="40px" />
      </GridItem>
    </GridContainer>
  );
}
```


### With Custom Spacing Height

**Render**

```tsx
() => {
  return (
    <Box display="inline-flex">
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={1} pb={1} />
        <Square />
      </Box>
      <VerticalDivider pl={1} pr={1} h={185} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={2} pb={2} />
        <Square />
      </Box>
      <VerticalDivider pl={2} pr={2} h={200} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={3} pb={3} />
        <Square />
      </Box>
      <VerticalDivider pl={3} pr={3} h={215} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={4} pb={4} />
        <Square />
      </Box>
      <VerticalDivider pl={4} pr={4} h={230} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={5} pb={5} />
        <Square />
      </Box>
      <VerticalDivider pl={5} pr={5} h={245} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={6} pb={6} />
        <Square />
      </Box>
      <VerticalDivider pl={6} pr={6} h={260} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={7} pb={7} />
        <Square />
      </Box>
    </Box>
  );
}
```


### With Custom Tint

**Render**

```tsx
() => {
  return (
    <Box display="inline-flex">
      <Square />
      <VerticalDivider tint={20} />
      <Square />
      <VerticalDivider tint={75} />
      <Square />
      <VerticalDivider tint={80} />
      <Square />
      <VerticalDivider tint={90} />
      <Square />
    </Box>
  );
}
```


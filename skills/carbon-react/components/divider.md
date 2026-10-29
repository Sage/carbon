---
name: carbon-component-divider
description: Carbon Divider component props and usage examples.
---

# Divider

## Import
`import Divider from "carbon-react/lib/components/divider";`

## Source
- Export: `./components/divider`
- Props interface: `DividerProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| adaptiveMxBreakpoint | number \| undefined | No |  | Breakpoint for adaptive left and right margins (below the breakpoint they go to 0). Enables the adaptive behaviour when set. Only available for `horizontal` type. |  |
| displayInline | boolean \| undefined | No |  | Sets the display: inline css attribute on the component To be used in non-flex containers. Only available for the `vertical` type. | false |
| h | string \| number \| undefined | No |  | Shorthand for the height attribute. Only available for the `vertical` type. |  |
| height | string \| number \| undefined | No |  | Height attribute of the component. Only available for the `vertical` type. |  |
| inverse | boolean \| undefined | No |  | Set the style of the Divider to inverse | false |
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
| type | "horizontal" \| "vertical" \| undefined | No |  | Sets Divider type | "vertical" |
| variant | "typical" \| "prominent" \| undefined | No |  | Sets Divider variant | "typical" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | boolean \| undefined | No |  | Set the divider to be hidden from screen readers. Please note that this cannot be overridden when inside a Menu. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <>
      <Box display="inline-flex">
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Divider type="horizontal" />
      <Box display="inline-flex">
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Divider type="horizontal" />
    </>
  );
}
```


### Variants

**Render**

```tsx
() => {
  return (
    <>
      <Typography>Typical (default)</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="typical" />
        <Square />
        <Divider variant="typical" />
      </Box>
      <Divider type="horizontal" />
      <Box display="inline-flex" mb={7}>
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Typography>Prominent</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" />
        <Square />
        <Divider variant="prominent" />
      </Box>
      <Divider type="horizontal" variant="prominent" />
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" />
        <Square />
        <Divider variant="prominent" />
      </Box>
    </>
  );
}
```


### Inverse

**Render**

```tsx
() => {
  return (
    <div style={blackBackground}>
      <Typography inverse>Typical (default)</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="typical" inverse />
        <Square />
        <Divider variant="typical" inverse />
      </Box>
      <Divider type="horizontal" inverse />
      <Box display="inline-flex" mb={7}>
        <Square />
        <Divider variant="typical" inverse />
        <Square />
        <Divider variant="typical" inverse />
      </Box>
      <Typography inverse>Prominent</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" inverse />
        <Square />
        <Divider variant="prominent" inverse />
      </Box>
      <Divider type="horizontal" variant="prominent" inverse />
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" inverse />
        <Square />
        <Divider variant="prominent" inverse />
      </Box>
    </div>
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
      <Divider h={16} />
      <Icon type="settings" />
      <Divider h={16} />
      <Icon type="add" />
      <Divider h={16} />
      <Icon type="minus" />
      <Divider h={16} />
      <Icon type="info" />
      <Divider h={16} />
      <Icon type="warning" />
      <Divider h={16} />
      <Icon type="chevron_up" />
      <Divider h={16} />
      <Icon type="chevron_down" />
      <Divider h={16} />
      <Icon type="edit" />
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
      <Divider displayInline />
      <Icon type="settings" />
      <Divider displayInline />
      <Icon type="add" />
      <Divider displayInline />
      <Icon type="minus" />
      <Divider displayInline />
      <Icon type="info" />
      <Divider displayInline />
      <Icon type="warning" />
      <Divider displayInline />
      <Icon type="chevron_up" />
      <Divider displayInline />
      <Icon type="chevron_down" />
      <Divider displayInline />
      <Icon type="edit" />
    </Box>
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
        <Divider h="100px" pt={1} pb={1} />
        <Square />
      </Box>
      <Divider pl={1} pr={1} h={185} />
      <Box>
        <Square />
        <Divider h="100px" pt={2} pb={2} />
        <Square />
      </Box>
      <Divider pl={2} pr={2} h={200} />
      <Box>
        <Square />
        <Divider h="100px" pt={3} pb={3} />
        <Square />
      </Box>
      <Divider pl={3} pr={3} h={215} />
      <Box>
        <Square />
        <Divider h="100px" pt={4} pb={4} />
        <Square />
      </Box>
      <Divider pl={4} pr={4} h={230} />
      <Box>
        <Square />
        <Divider h="100px" pt={5} pb={5} />
        <Square />
      </Box>
      <Divider pl={5} pr={5} h={245} />
      <Box>
        <Square />
        <Divider h="100px" pt={6} pb={6} />
        <Square />
      </Box>
      <Divider pl={6} pr={6} h={260} />
      <Box>
        <Square />
        <Divider h="100px" pt={7} pb={7} />
        <Square />
      </Box>
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
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
        </Box>
      </Dialog>
    </>
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
          <Divider pt={1} pb={1} pl={3} pr={3} mr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
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
        <Divider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="3 / 4"
        gridRow="1 /2 "
      >
        <Divider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="5 / 6"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <Divider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="7 / 8"
        gridRow="1 / 2"
      >
        <Divider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="9 / 10"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <Divider h={100} />
        <Square size="40px" />
      </GridItem>
    </GridContainer>
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
            <Divider displayInline />
            Flour
            <Divider displayInline />
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


### In a Menu

**Render**

```tsx
() => {
  return (
    <Box minHeight={120}>
      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <Divider height={24} p={1} />
        <MenuItem submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
}
```


### Different Spacing

**Render**

```tsx
() => {
  return <Divider type="horizontal" mt={7} mb={7} />;
}
```


### Inside Form

**Render**

```tsx
() => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Divider type="horizontal" mb={7} mt={7} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
    </Form>
  );
}
```


### Inside Form with Inline Labels

**Render**

```tsx
() => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Box width="60%">
        <Textbox label="Textbox" labelInline value="" onChange={() => {}} />
        <Textbox label="Textbox" labelInline value="" onChange={() => {}} />
        <Box ml="17%">
          <Divider type="horizontal" mb={7} mt={7} />
        </Box>
        <Textbox label="Textbox" labelInline value="" onChange={() => {}} />
      </Box>
    </Form>
  );
}
```


### Enabling Adaptive Behaviour

**Render**

```tsx
() => {
  return (
    <Divider
      type="horizontal"
      mb={7}
      mt={7}
      ml="10%"
      mr="40%"
      adaptiveMxBreakpoint={960}
    />
  );
}
```


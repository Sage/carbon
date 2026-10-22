---
name: carbon-component-navigation-bar
description: Carbon NavigationBar component props and usage examples.
---

# NavigationBar

## Import
`import NavigationBar from "carbon-react/lib/components/navigation-bar";`

## Source
- Export: `./components/navigation-bar`
- Props interface: `NavigationBarProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| alignContent | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| alignItems | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| alignSelf | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| ariaLabel | string \| undefined | No |  |  |  | HTML aria-label attribute |  |
| children | React.ReactNode | No |  |  |  | Content of the component |  |
| flex | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexBasis | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexDirection | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexGrow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexShrink | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexWrap | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| isLoading | boolean \| undefined | No |  |  |  | If 'true' the children will not be visible | false |
| justifyContent | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| justifyItems | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| justifySelf | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| offset | string \| undefined | No |  |  |  | Defines the offset of navigation bar | "0px" |
| order | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| orientation | Orientation \| undefined | No |  |  |  | Defines whether the navigation bar should be positioned top or bottom |  |
| p | SpacingProperty | No |  |  |  |  |  |
| padding | SpacingProperty | No |  |  |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |  |  |
| pb | SpacingProperty | No |  |  |  |  |  |
| pl | SpacingProperty | No |  |  |  |  |  |
| position | Position \| undefined | No |  |  |  | Defines whether the navigation bar should be positioned fixed or sticky |  |
| pr | SpacingProperty | No |  |  |  |  |  |
| pt | SpacingProperty | No |  |  |  |  |  |
| px | SpacingProperty | No |  |  |  |  |  |
| py | SpacingProperty | No |  |  |  |  |  |
| variant | "white" \| "black" \| undefined | No |  |  |  | Defines the colour variant of the navigation bar |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| navigationType | NavigationType \| undefined | No |  | Yes | `navigationType` has been deprecated, `variant` should be used instead. Color scheme of navigation component. |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <NavigationBar>Example content</NavigationBar>;
}
```


### Variants

**Render**

```tsx
() => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <NavigationBar variant="white">White variant</NavigationBar>
      <NavigationBar variant="black">Black variant</NavigationBar>
    </Box>
  );
}
```


### Example with Menu

**Render**

```tsx
() => {
  return (
    <NavigationBar>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
      </Menu>
    </NavigationBar>
  );
}
```


### Is Loading

**Render**

```tsx
() => {
  return (
    <NavigationBar isLoading>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
      </Menu>
    </NavigationBar>
  );
}
```


### With Custom Spacing

**Render**

```tsx
() => {
  return (
    <NavigationBar py={2} px={7}>
      <Menu>
        <MenuItem href="#">menu item one</MenuItem>
        <MenuItem href="#">menu item two</MenuItem>
      </Menu>
    </NavigationBar>
  );
}
```


### Content Max Width Box

**Render**

```tsx
() => {
  return (
    <NavigationBar>
      <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
        <Menu flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="settings" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem href="#">Item Submenu Four</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Four">
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    </NavigationBar>
  );
}
```


### Sticky

**Render**

```tsx
() => {
  return (
    <Box id="sticky-container" height={250}>
      <NavigationBar
        position="sticky"
        orientation="top"
        offset="25px"
        aria-label="header"
      >
        <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
          <Menu flex="1">
            <MenuItem flex="1" onClick={() => {}}>
              Menu Item One
            </MenuItem>
            <MenuItem flex="0 0 auto" href="#">
              Menu Item Two
            </MenuItem>
            <MenuItem flex="0 0 auto" submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider />
              <MenuItem icon="settings" href="#">
                Item Submenu Three
              </MenuItem>
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem flex="0 0 auto" submenu="Menu Item Four">
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      </NavigationBar>
      <div style={greenBackground} />
      <NavigationBar
        position="sticky"
        orientation="bottom"
        offset="25px"
        aria-label="footer"
      >
        <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
          <Menu flex="1">
            <MenuItem flex="1" onClick={() => {}}>
              Menu Item One
            </MenuItem>
            <MenuItem flex="0 0 auto" href="#">
              Menu Item Two
            </MenuItem>
            <MenuItem flex="0 0 auto" href="#">
              Menu Item Three
            </MenuItem>
            <MenuItem flex="0 0 auto" href="#">
              Menu Item Four
            </MenuItem>
          </Menu>
        </Box>
      </NavigationBar>
    </Box>
  );
}
```


### Fixed

**Render**

```tsx
() => {
  return (
    <>
      <NavigationBar
        position="fixed"
        orientation="top"
        offset="25px"
        aria-label="header"
      >
        <Menu flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="settings" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem href="#">Item Submenu Four</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Four">
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </NavigationBar>
      <div style={greenBackground} />
      <NavigationBar
        position="fixed"
        orientation="bottom"
        offset="25px"
        aria-label="footer"
      >
        <Menu flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Three
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Four
          </MenuItem>
        </Menu>
      </NavigationBar>
    </>
  );
}
```


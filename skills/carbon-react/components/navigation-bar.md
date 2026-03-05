---
name: carbon-component-navigation-bar
description: Carbon NavigationBar component props and usage examples.
---

# NavigationBar

## Import
`import NavigationBar from "carbon-sage/lib/components/navigation-bar";`

## Source
- Export: `./components/navigation-bar`
- Props interface: `NavigationBarProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alignContent | ResponsiveValue<CSS.Property.AlignContent, ThemeType> \| undefined | No |  | The CSS align-content property sets how the browser distributes space between and around content items along the cross-axis of a flexbox container, and the main-axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) |  |
| alignItems | ResponsiveValue<CSS.Property.AlignItems, ThemeType> \| undefined | No |  | The CSS align-items property sets the align-self value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment of items on the Block Axis within their grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) |  |
| alignSelf | ResponsiveValue<CSS.Property.AlignSelf, ThemeType> \| undefined | No |  | The align-self CSS property aligns flex items of the current flex line overriding the align-items value. If any of the item's cross-axis margin is set to auto, then align-self is ignored. In Grid layout align-self aligns the item inside the grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) |  |
| ariaLabel | string \| undefined | No |  | HTML aria-label attribute |  |
| children | React.ReactNode | No |  | Content of the component |  |
| flex | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The flex CSS property specifies how a flex item will grow or shrink so as to fit the space available in its flex container. This is a shorthand property that sets flex-grow, flex-shrink, and flex-basis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) |  |
| flexBasis | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  |
| flexDirection | ResponsiveValue<CSS.Property.FlexDirection, ThemeType> \| undefined | No |  | The flex-direction CSS property specifies how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) |  |
| flexGrow | ResponsiveValue<CSS.Property.FlexGrow, ThemeType> \| undefined | No |  | The flex-grow CSS property sets the flex grow factor of a flex item main size. It specifies how much of the remaining space in the flex container should be assigned to the item (the flex grow factor). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) |  |
| flexShrink | ResponsiveValue<CSS.Property.FlexShrink, ThemeType> \| undefined | No |  | The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) |  |
| flexWrap | ResponsiveValue<CSS.Property.FlexWrap, ThemeType> \| undefined | No |  | The flex-wrap CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) |  |
| isGlobal | boolean \| undefined | No |  |  |  |
| isLoading | boolean \| undefined | No |  | If 'true' the children will not be visible | false |
| justifyContent | ResponsiveValue<CSS.Property.JustifyContent, ThemeType> \| undefined | No |  | The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) |  |
| justifyItems | ResponsiveValue<CSS.Property.JustifyItems, ThemeType> \| undefined | No |  | The CSS justify-items property defines the default justify-self for all items of the box, giving them all a default way of justifying each box along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) |  |
| justifySelf | ResponsiveValue<CSS.Property.JustifySelf, ThemeType> \| undefined | No |  | The CSS justify-self property set the way a box is justified inside its alignment container along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self) |  |
| navigationType | NavigationType \| undefined | No |  | Color scheme of navigation component | "light" |
| offset | string \| undefined | No |  | Defines the offset of navigation bar | "0px" |
| order | ResponsiveValue<CSS.Property.Order, ThemeType> \| undefined | No |  | The order CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending order value and then by their source code order. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/order) |  |
| orientation | Orientation \| undefined | No |  | Defines whether the navigation bar should be positioned top or bottom |  |
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
| position | Position \| undefined | No |  | Defines whether the navigation bar should be positioned fixed or sticky |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <NavigationBar>Example content</NavigationBar>;
}
```


### Dark Theme

**Render**

```tsx
() => {
  return <NavigationBar navigationType="dark">Example content</NavigationBar>;
}
```


### White Theme

**Render**

```tsx
() => {
  return <NavigationBar navigationType="white">Example content</NavigationBar>;
}
```


### Black Theme

**Render**

```tsx
() => {
  return <NavigationBar navigationType="black">Example content</NavigationBar>;
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
      <Box height={1000} backgroundColor="green" />
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
      <Box height={1000} backgroundColor="green" />
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


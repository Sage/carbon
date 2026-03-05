---
name: carbon-component-global-header
description: Carbon GlobalHeader component props and usage examples.
---

# GlobalHeader

## Import
`import GlobalHeader from "carbon-sage/lib/components/global-header";`

## Source
- Export: `./components/global-header`
- Props interface: `GlobalHeaderProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alignContent | ResponsiveValue<CSS.Property.AlignContent, ThemeType> \| undefined | No |  | The CSS align-content property sets how the browser distributes space between and around content items along the cross-axis of a flexbox container, and the main-axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) |  |
| alignItems | ResponsiveValue<CSS.Property.AlignItems, ThemeType> \| undefined | No |  | The CSS align-items property sets the align-self value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment of items on the Block Axis within their grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) |  |
| alignSelf | ResponsiveValue<CSS.Property.AlignSelf, ThemeType> \| undefined | No |  | The align-self CSS property aligns flex items of the current flex line overriding the align-items value. If any of the item's cross-axis margin is set to auto, then align-self is ignored. In Grid layout align-self aligns the item inside the grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) |  |
| children | React.ReactNode | No |  | Child elements |  |
| flex | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The flex CSS property specifies how a flex item will grow or shrink so as to fit the space available in its flex container. This is a shorthand property that sets flex-grow, flex-shrink, and flex-basis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) |  |
| flexBasis | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  |
| flexDirection | ResponsiveValue<CSS.Property.FlexDirection, ThemeType> \| undefined | No |  | The flex-direction CSS property specifies how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) |  |
| flexGrow | ResponsiveValue<CSS.Property.FlexGrow, ThemeType> \| undefined | No |  | The flex-grow CSS property sets the flex grow factor of a flex item main size. It specifies how much of the remaining space in the flex container should be assigned to the item (the flex grow factor). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) |  |
| flexShrink | ResponsiveValue<CSS.Property.FlexShrink, ThemeType> \| undefined | No |  | The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) |  |
| flexWrap | ResponsiveValue<CSS.Property.FlexWrap, ThemeType> \| undefined | No |  | The flex-wrap CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) |  |
| justifyContent | ResponsiveValue<CSS.Property.JustifyContent, ThemeType> \| undefined | No |  | The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) |  |
| justifyItems | ResponsiveValue<CSS.Property.JustifyItems, ThemeType> \| undefined | No |  | The CSS justify-items property defines the default justify-self for all items of the box, giving them all a default way of justifying each box along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) |  |
| justifySelf | ResponsiveValue<CSS.Property.JustifySelf, ThemeType> \| undefined | No |  | The CSS justify-self property set the way a box is justified inside its alignment container along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self) |  |
| logo | React.ReactNode | No |  | Logo to render |  |
| order | ResponsiveValue<CSS.Property.Order, ThemeType> \| undefined | No |  | The order CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending order value and then by their source code order. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/order) |  |
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
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### menu with icon-only buttons

**Render**

```tsx
() => {
  return (
    <GlobalHeader logo={<img height={28} src={carbonLogo} alt="Carbon logo" />}>
      <Divider h="100%" pt={1} pb={1} pr={0} pl={2} />
      <Menu menuType="black" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem href="#" flex="0 0 auto" icon="person">
          User name
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Selected role">
          <MenuItem href="#">Administrator</MenuItem>
        </MenuItem>
        <MenuItem ariaLabel="search" icon="search" href="#" />
        <MenuItem ariaLabel="alert" icon="alert" href="#" />
        <MenuItem ariaLabel="settings" icon="settings" href="#" />
        <MenuItem ariaLabel="logout" icon="logout" href="#" />
      </Menu>
    </GlobalHeader>
  );
}
```


### Default

**Render**

```tsx
() => {
  return (
    <GlobalHeader aria-label="Default global header component">
      Example content
    </GlobalHeader>
  );
}
```


### With Logo

**Render**

```tsx
() => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <GlobalHeader
      logo={<Logo />}
      aria-label="Global header component with logo"
    >
      Example content
    </GlobalHeader>
  );
}
```


### Basic Menu

**Render**

```tsx
() => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <GlobalHeader
      logo={<Logo />}
      aria-label="Global header component with basic menu"
    >
      <Menu menuType="black" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
          <MenuItem href="#">Child Item 1</MenuItem>
          <MenuSegmentTitle text="segment title">
            <MenuItem href="#">Child Item 2</MenuItem>
            <MenuItem href="#">Child Item 3</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
          <MenuItem href="#">Child Item</MenuItem>
        </MenuItem>
      </Menu>
    </GlobalHeader>
  );
}
```


### Responsive Menu

**Render**

```tsx
() => {
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 599px)");
  const [isListViewOpen, setIsListViewOpen] = useState(false);
  const menuItems = [
    <MenuItem
      key="product-switcher"
      minWidth="160px"
      flex="1"
      submenu="Product Switcher"
    >
      <MenuItem href="#">Product A</MenuItem>
    </MenuItem>,
    <MenuItem
      key="parent-menu-1"
      minWidth="145px"
      flex="0 0 auto"
      submenu="Parent Menu 1"
    >
      <MenuItem href="#">Child Item 1</MenuItem>
      <MenuSegmentTitle text="segment title">
        <MenuItem href="#">Child Item 2</MenuItem>
        <MenuItem href="#">Child Item 3</MenuItem>
      </MenuSegmentTitle>
    </MenuItem>,
    <MenuItem
      key="parent-menu-2"
      minWidth="145px"
      flex="0 0 auto"
      submenu="Parent Menu 2"
    >
      <MenuItem href="#">Child Item</MenuItem>
    </MenuItem>,
  ];
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <GlobalHeader
      logo={<Logo />}
      aria-label="Global header component with responsive menu"
    >
      <Menu menuType="black" flex="1">
        {fullscreenViewBreakPoint ? (
          <>
            <MenuItem
              onClick={(ev) => {
                ev.preventDefault();
                setIsListViewOpen(true);
              }}
            >
              Menu
            </MenuItem>
            <MenuFullscreen
              isOpen={isListViewOpen}
              onClose={() => setIsListViewOpen(false)}
            >
              {menuItems}
            </MenuFullscreen>
          </>
        ) : (
          menuItems
        )}
      </Menu>
    </GlobalHeader>
  );
}
```


### Global + Local Nav Bar Layout

**Render**

```tsx
() => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <>
      <GlobalHeader
        logo={<Logo />}
        aria-label="Global header component with local nav bar"
      >
        <Menu menuType="black" flex="1" aria-label="Menu bar">
          <MenuItem flex="1" submenu="Product Switcher">
            <MenuItem href="#">Product A</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
            <MenuItem href="#">Child Item 1</MenuItem>
            <MenuItem href="#">Child Item 2</MenuItem>
            <MenuItem href="#">Child Item 3</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
            <MenuItem href="#">Child Item</MenuItem>
          </MenuItem>
        </Menu>
      </GlobalHeader>
      <NavigationBar
        position="fixed"
        orientation="top"
        offset="40px"
        aria-label="Local nav bar"
      >
        <Menu flex="1">
          <MenuItem href="#" flex="1">
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
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </NavigationBar>
    </>
  );
}
```


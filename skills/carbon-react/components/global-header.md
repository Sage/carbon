---
name: carbon-component-global-header
description: Carbon GlobalHeader component props and usage examples.
---

# GlobalHeader

## Import
`import GlobalHeader from "carbon-react/lib/components/global-header";`

## Source
- Export: `./components/global-header`
- Props interface: `GlobalHeaderProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alignContent | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| alignItems | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| alignSelf | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| children | React.ReactNode | No |  | Child elements |  |
| flex | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| flexBasis | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| flexDirection | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| flexGrow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| flexShrink | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| flexWrap | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| justifyContent | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| justifyItems | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| justifySelf | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| logo | React.ReactNode | No |  | Logo to render |  |
| order | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |
| p | SpacingProperty | No |  |  |  |
| padding | SpacingProperty | No |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |
| pb | SpacingProperty | No |  |  |  |
| pl | SpacingProperty | No |  |  |  |
| pr | SpacingProperty | No |  |  |  |
| pt | SpacingProperty | No |  |  |  |
| px | SpacingProperty | No |  |  |  |
| py | SpacingProperty | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### menu with icon-only buttons

**Render**

```tsx
() => {
  return (
    <GlobalHeader logo={<img height={28} src={carbonLogo} alt="Carbon logo" />}>
      <Divider p={0} height={24} inverse />
      <Menu variant="black" flex="1">
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
      <Menu variant="black" flex="1">
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
      <Menu variant="black" flex="1">
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
        <Menu variant="black" flex="1" aria-label="Menu bar">
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


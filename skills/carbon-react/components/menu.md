---
name: carbon-component-menu
description: Carbon Menu component props and usage examples.
---

# Menu

## Import
`import { Menu } from "carbon-react/lib/components/menu";`

## Source
- Export: `./components/menu`
- Props interface: `MenuProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Children elements |  |
| alignContent | ResponsiveValue<CSS.Property.AlignContent, ThemeType> \| undefined | No |  | The CSS align-content property sets how the browser distributes space between and around content items along the cross-axis of a flexbox container, and the main-axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) |  |
| alignItems | ResponsiveValue<CSS.Property.AlignItems, ThemeType> \| undefined | No |  | The CSS align-items property sets the align-self value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment of items on the Block Axis within their grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) |  |
| alignSelf | ResponsiveValue<CSS.Property.AlignSelf, ThemeType> \| undefined | No |  | The align-self CSS property aligns flex items of the current flex line overriding the align-items value. If any of the item's cross-axis margin is set to auto, then align-self is ignored. In Grid layout align-self aligns the item inside the grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) |  |
| flex | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The flex CSS property specifies how a flex item will grow or shrink so as to fit the space available in its flex container. This is a shorthand property that sets flex-grow, flex-shrink, and flex-basis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) |  |
| flexBasis | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  |
| flexDirection | ResponsiveValue<CSS.Property.FlexDirection, ThemeType> \| undefined | No |  | The flex-direction CSS property specifies how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) |  |
| flexGrow | ResponsiveValue<CSS.Property.FlexGrow, ThemeType> \| undefined | No |  | The flex-grow CSS property sets the flex grow factor of a flex item main size. It specifies how much of the remaining space in the flex container should be assigned to the item (the flex grow factor). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) |  |
| flexShrink | ResponsiveValue<CSS.Property.FlexShrink, ThemeType> \| undefined | No |  | The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) |  |
| flexWrap | ResponsiveValue<CSS.Property.FlexWrap, ThemeType> \| undefined | No |  | The flex-wrap CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) |  |
| justifyContent | ResponsiveValue<CSS.Property.JustifyContent, ThemeType> \| undefined | No |  | The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) |  |
| justifyItems | ResponsiveValue<CSS.Property.JustifyItems, ThemeType> \| undefined | No |  | The CSS justify-items property defines the default justify-self for all items of the box, giving them all a default way of justifying each box along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) |  |
| justifySelf | ResponsiveValue<CSS.Property.JustifySelf, ThemeType> \| undefined | No |  | The CSS justify-self property set the way a box is justified inside its alignment container along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self) |  |
| maxWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The max-width CSS property sets the maximum width of an element. It prevents the used value of the width property from becoming larger than the value specified by max-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) |  |
| menuType | MenuType \| undefined | No |  | Defines the color scheme of the component | "light" |
| minWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The min-width CSS property sets the minimum width of an element. It prevents the used value of the width property from becoming smaller than the value specified for min-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) |  |
| order | ResponsiveValue<CSS.Property.Order, ThemeType> \| undefined | No |  | The order CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending order value and then by their source code order. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/order) |  |
| overflow | ResponsiveValue<CSS.Property.Overflow, ThemeType> \| undefined | No |  | The overflow CSS property sets what to do when an element's content is too big to fit in its block formatting context. It is a shorthand for overflow-x and overflow-y. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) |  |
| overflowX | ResponsiveValue<CSS.Property.OverflowX, ThemeType> \| undefined | No |  | The overflow-x CSS property sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) |  |
| verticalAlign | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The vertical-align CSS property specifies sets vertical alignment of an inline or table-cell box. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) |  |
| width | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The width utility parses a component's `width` prop and converts it into a CSS width declaration. - Numbers from 0-1 are converted to percentage widths. - Numbers greater than 1 are converted to pixel values. - String values are passed as raw CSS values. - And arrays are converted to responsive width styles. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem icon="settings" href="#">
              Menu Item One
            </MenuItem>
            <MenuItem icon="settings" onClick={() => {}}>
              Menu Item Two
            </MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider />
              <MenuItem icon="entry" href="#">
                Item Submenu Three
              </MenuItem>
              <MenuItem icon="settings" href="#">
                Item Submenu Four
              </MenuItem>
            </MenuItem>
            <MenuItem submenu="Menu Item Four" onClick={() => {}}>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### Programmatic Focus

**Render**

```tsx
() => {
  const menuItemHandle = useRef<MenuItemHandle>(null);

  return (
    <Box mb={150}>
      <Box>
        <Button mb={2} onClick={() => menuItemHandle.current?.focus()}>
          Click to focus Menu Item One
        </Button>
        <Menu>
          <MenuItem ref={menuItemHandle} icon="settings" href="#">
            Menu Item One
          </MenuItem>
          <MenuItem icon="settings" onClick={() => {}}>
            Menu Item Two
          </MenuItem>
          <MenuItem submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="entry" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem icon="settings" href="#">
              Item Submenu Four
            </MenuItem>
          </MenuItem>
          <MenuItem submenu="Menu Item Four" onClick={() => {}}>
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
```


### Selected

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem selected href="#">
              Menu Item One
            </MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### Divider

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider />
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuItem href="#">Item Submenu Three</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### Large Divider

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuItem href="#">Item Submenu Three</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### Segment Title

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuSegmentTitle text="segment title">
                <MenuItem href="#">Item Submenu Two</MenuItem>
                <MenuItem href="#">Item Submenu Three</MenuItem>
              </MenuSegmentTitle>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### Alternate Colour

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuSegmentTitle text="segment title" variant="alternate">
                <MenuItem variant="alternate" href="#">
                  Item Submenu Two
                </MenuItem>
                <MenuItem variant="alternate" href="#">
                  Item Submenu Three
                </MenuItem>
              </MenuSegmentTitle>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### Submenu Nodes

**Render**

```tsx
() => (
  <Box mb={150}>
    {menuTypes.map((menuType) => {
      const submenuNode = (initials: string, name: string) => (
        <Box
          height="40px"
          width="60px"
          display="flex"
          alignItems="center"
          gap="2px"
          pl="7px"
        >
          <Portrait size="XS" initials={initials} />
          <Typography
            fontWeight="500"
            fontSize="14px"
            color={
              menuType === "black" || menuType === "dark" ? "white" : "black"
            }
            margin={0}
          >
            {name}
          </Typography>
        </Box>
      );
      return (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem
              submenu={submenuNode("JD", "John")}
              p={0}
              ariaLabel="John Doe"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("JS", "Jane")}
              p={0}
              ariaLabel="Jane Smith"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("AB", "Alice")}
              p={0}
              ariaLabel="Alice Brown"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("BC", "Bob")}
              p={0}
              ariaLabel="Bob Clark"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      );
    })}
  </Box>
)
```


### Submenu Options

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="No action or link">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider />
              <MenuItem icon="settings" href="#">
                Item Submenu Three
              </MenuItem>
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem submenu="With href" href="#">
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem submenu="With clickToOpen prop" clickToOpen>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### Submenu Direction Left

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      <Menu>
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Menu Item Three" submenuDirection="left">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider />
          <MenuItem icon="settings" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem href="#">A really long Item Submenu Four</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
}
```


### With Icon

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem icon="home" href="#">
              Home
            </MenuItem>
            <MenuItem icon="person" href="#" ariaLabel="Account" />
            <MenuItem icon="settings" submenu="Settings">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider />
              <MenuItem icon="settings" href="#" ariaLabel="settings" />
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem icon="arrow_right" submenu ariaLabel="Actions">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### No Dropdown Arrow on Submenu

**Render**

```tsx
() => {
  return (
    <Box minHeight="150px">
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem showDropdownArrow={false} submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
}
```


### Split Submenu into Separate Component

**Render**

```tsx
() => {
  const MySubMenu = (
    <MenuItem submenu="Menu Item Three">
      <MenuItem href="#">Item Submenu One</MenuItem>
      <MenuItem href="#">Item Submenu Two</MenuItem>
    </MenuItem>
  );
  return (
    <Box minHeight="150px">
      <Menu>
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        {MySubMenu}
      </Menu>
    </Box>
  );
}
```


### Submenu Icon and Text Alignment

**Render**

```tsx
() => {
  return (
    <Box minHeight="250px">
      <Menu menuType="dark">
        <MenuItem icon="settings" submenu="Settings">
          <MenuItem href="#" icon="settings" onClick={() => {}}>
            onClick and Icon
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <Box ml="21px">onClick</Box>
          </MenuItem>
          <MenuDivider />
          <MenuItem icon="settings" href="#">
            href and Icon
          </MenuItem>
          <MenuItem href="#">
            <Box ml="21px">href</Box>
          </MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
}
```


### Scrollable Submenu

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <ScrollableBlock height="200px">
                <MenuItem href="#">Item Submenu One</MenuItem>
                <MenuItem href="#">Item Submenu Two</MenuItem>
                <MenuItem href="#">Item Submenu Three</MenuItem>
                <MenuItem href="#">Item Submenu Four</MenuItem>
                <MenuItem href="#">Item Submenu Five</MenuItem>
                <MenuItem href="#">Item Submenu Six</MenuItem>
                <MenuItem href="#">Item Submenu Seven</MenuItem>
                <MenuItem href="#">Item Submenu Eight</MenuItem>
                <MenuItem href="#">Item Submenu Nine</MenuItem>
                <MenuItem href="#">Item Submenu Ten</MenuItem>
                <MenuItem href="#">Item Submenu Eleven</MenuItem>
                <MenuItem href="#">Item Submenu Twelve</MenuItem>
              </ScrollableBlock>
            </MenuItem>
            <MenuItem submenu="Menu Item Four">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <ScrollableBlock variant="alternate" height="200px">
                <MenuItem href="#">Item Submenu Three</MenuItem>
                <MenuItem href="#">Item Submenu Four</MenuItem>
                <MenuItem href="#">Item Submenu Five</MenuItem>
                <MenuItem href="#">Item Submenu Six</MenuItem>
                <MenuItem href="#">Item Submenu Seven</MenuItem>
                <MenuItem href="#">Item Submenu Eight</MenuItem>
                <MenuItem href="#">Item Submenu Nine</MenuItem>
                <MenuItem href="#">Item Submenu Ten</MenuItem>
                <MenuItem href="#">Item Submenu Eleven</MenuItem>
                <MenuItem href="#">Item Submenu Twelve</MenuItem>
              </ScrollableBlock>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### ScrollableSubmenuWithParent

**Render**

```tsx
() => {
  const items = [
    "apple",
    "banana",
    "carrot",
    "grapefruit",
    "melon",
    "orange",
    "pear",
    "strawberry",
  ];
  const [itemSearch, setItemSearch] = React.useState(items);
  const [searchString, setSearchString] = React.useState("");
  const handleTextChange = (e: SearchEvent) => {
    const searchStr = e.target.value;
    setSearchString(searchStr);
    let found;
    if (searchStr.length > 0) {
      found = items.filter((item) => item.includes(searchStr));
    } else {
      found = items;
    }
    setItemSearch(found);
  };
  return (
    <Box mb={300}>
      <Menu>
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <ScrollableBlock
            variant="alternate"
            height="200px"
            parent={
              <Search
                placeholder="search"
                value={searchString}
                onChange={handleTextChange}
              />
            }
          >
            {itemSearch.map((item) => (
              <MenuItem key={item} href="#">
                {item}
              </MenuItem>
            ))}
          </ScrollableBlock>
        </MenuItem>
      </Menu>
    </Box>
  );
}
```


### Submenu with Search

**Render**

```tsx
() => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuSegmentTitle text="segment title" variant="alternate">
                <MenuItem variant="alternate" p="2px 16px">
                  <Search
                    placeholder="Search"
                    variant={
                      menuType === "black" || menuType === "dark"
                        ? "dark"
                        : "default"
                    }
                    value=""
                    onChange={() => {}}
                  />
                </MenuItem>
                <MenuItem variant="alternate" href="#">
                  Item Submenu Two
                </MenuItem>
                <MenuItem variant="alternate" href="#">
                  Item Submenu Three
                </MenuItem>
              </MenuSegmentTitle>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### Truncated Titles

**Render**

```tsx
() => {
  return (
    <Box minHeight="150px">
      <Menu>
        <MenuItem maxWidth="168px" href="#">
          A long menu item title
        </MenuItem>
        <MenuItem maxWidth="148px" submenu="Menu Item Three">
          <MenuItem maxWidth="182px" href="#">
            A long submenu menu item title
          </MenuItem>
        </MenuItem>
        <MenuItem maxWidth="180px" icon="home" href="#">
          A long menu item title
        </MenuItem>
      </Menu>
    </Box>
  );
}
```


### Responsive Composition

**Render**

```tsx
() => {
  const isBelowBreakpoint1 = useMediaQuery("(max-width: 1200px)");
  const isBelowBreakpoint2 = useMediaQuery("(max-width: 1000px)");
  const isBelowBreakpoint3 = useMediaQuery("(max-width: 800px)");
  const isBelowBreakpoint4 = useMediaQuery("(max-width: 600px)");
  const responsiveMenuItems = () => {
    if (isBelowBreakpoint4) {
      return [
        <MenuItem key="submenu-4" submenu="More">
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint3) {
      return [
        <MenuItem key="menu-item-3" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="submenu-3" submenu="More">
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint2) {
      return [
        <MenuItem key="menu-item-2-a" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="menu-item-2-b" href="#">
          Menu Item Two
        </MenuItem>,
        <MenuItem key="submenu-2" submenu="More">
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint1) {
      return [
        <MenuItem key="menu-item-1-a" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="menu-item-1-b" href="#">
          Menu Item Two
        </MenuItem>,
        <MenuItem key="menu-item-1-c" href="#">
          Menu Item Three
        </MenuItem>,
        <MenuItem key="submenu-1" submenu="More">
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    return [
      <MenuItem key="menu-item-a" href="#">
        Menu Item One
      </MenuItem>,
      <MenuItem key="menu-item-b" href="#">
        Menu Item Two
      </MenuItem>,
      <MenuItem key="menu-item-c" href="#">
        Menu Item Three
      </MenuItem>,
      <MenuItem key="menu-item-d" href="#">
        Menu Item Four
      </MenuItem>,
    ];
  };
  return (
    <Box minHeight="250px">
      <Menu>{React.Children.map(responsiveMenuItems(), (items) => items)}</Menu>
    </Box>
  );
}
```


### Fullscreen View

**Render**

```tsx
() => {
  const [menuOpen, setMenuOpen] = useState({
    light: false,
    dark: false,
    white: false,
    black: false,
  });
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 1200px)");
  const responsiveMenuItems = (
    startPosition: "left" | "right",
    menu: MenuType,
  ) => {
    if (fullscreenViewBreakPoint) {
      return [
        <MenuItem
          key="fullscreen-menu-item-1"
          onClick={() => setMenuOpen((state) => ({ ...state, [menu]: true }))}
        >
          Menu
        </MenuItem>,
        <MenuFullscreen
          key="fullscreen-menu-1"
          startPosition={startPosition}
          isOpen={menuOpen[menu]}
          onClose={() => setMenuOpen((state) => ({ ...state, [menu]: false }))}
        >
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem onClick={() => {}} submenu="Menu Item Two">
            <MenuItem href="#">Submenu Item One</MenuItem>
            <MenuItem href="#">Submenu Item Two</MenuItem>
          </MenuItem>
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
          <MenuItem
            href="#"
            submenu={
              <Typography
                variant="big"
                fontWeight="500"
                lineHeight="40px"
                color={menu === "black" || menu === "dark" ? "white" : "black"}
              >
                Menu Item Five
              </Typography>
            }
          >
            <MenuItem href="#">Submenu Item One</MenuItem>
            <MenuItem href="#">Submenu Item Two</MenuItem>
          </MenuItem>
          <MenuItem href="#">Menu Item Six</MenuItem>
        </MenuFullscreen>,
      ];
    }
    return [
      <MenuItem key="default-menu-item-1" href="#">
        Menu Item One
      </MenuItem>,
      <MenuItem key="default-menu-item-2" submenu="Menu Item Two">
        <MenuItem href="#">Submenu Item One</MenuItem>
        <MenuItem href="#">Submenu Item Two</MenuItem>
      </MenuItem>,
      <MenuItem key="default-menu-item-3" href="#">
        Menu Item Three
      </MenuItem>,
      <MenuItem key="default-menu-item-4" href="#">
        Menu Item Four
      </MenuItem>,
      <MenuItem key="default-menu-item-5" submenu="Menu Item Five">
        <MenuItem href="#">Submenu Item One</MenuItem>
        <MenuItem href="#">Submenu Item Two</MenuItem>
      </MenuItem>,
      <MenuItem key="default-menu-item-6" href="#">
        Menu Item Six
      </MenuItem>,
    ];
  };
  return (
    <Box>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            {React.Children.map(
              responsiveMenuItems("left", menuType),
              (items) => items,
            )}
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
```


### ControllingTheSubmenuWidth

**Render**

```tsx
() => (
    <Menu menuType="black">
      <MenuItem submenuMaxWidth="300px" submenu="Open submenu with max width">
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">
          This is a longer text string. I will wrap instead of truncating!
        </MenuItem>
      </MenuItem>
      <MenuItem submenuMinWidth="300px" submenu="Open submenu with min width">
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">Item Two</MenuItem>
        <MenuItem href="#">Item Three</MenuItem>
      </MenuItem>
    </Menu>
  )
```


### Full-screen Menu with segment styling

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSegmentedOpen, setIsSegmentedOpen] = useState(false);

  return (
    <Box minHeight="250px">
      <Box display="flex" marginBottom={2}>
        <Menu menuType="black">
          <MenuItem onClick={() => setIsOpen(true)} icon="entry">
            Open Normal Menu
          </MenuItem>
          <MenuFullscreen isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuItem variant="default" href="#">
              Default Menu Item
            </MenuItem>
            <MenuItem variant="alternate" href="#">
              Alternate Menu Item
            </MenuItem>
          </MenuFullscreen>

          <MenuItem
            onClick={() => setIsSegmentedOpen(true)}
            icon="stacked_squares"
          >
            Open Segmented Menu
          </MenuItem>
          <MenuFullscreen
            isOpen={isSegmentedOpen}
            onClose={() => setIsSegmentedOpen(false)}
          >
            <MenuSegmentTitle
              key="default-variant"
              variant="default"
              text="Menu items (default variant)"
            >
              <MenuItem variant="default" href="#">
                Segmented Default Menu Item
              </MenuItem>
            </MenuSegmentTitle>
            <MenuSegmentTitle
              key="alternate-variant"
              variant="alternate"
              text="Menu items (alternate variant)"
            >
              <MenuItem variant="alternate" href="#">
                Segmented Alternate Menu Item
              </MenuItem>
            </MenuSegmentTitle>
          </MenuFullscreen>
        </Menu>
      </Box>
      <Box display="flex">
        <Menu menuType="black">
          <MenuItem submenu="Standard Menu">
            <MenuItem href="#" variant="default">
              Default Menu Item
            </MenuItem>
            <MenuItem href="#" variant="alternate">
              Alternate Menu Item
            </MenuItem>
            <MenuSegmentTitle
              key="default-variant"
              variant="default"
              text="Menu items (default variant)"
            >
              <MenuItem href="#" variant="default">
                Segmented Default Menu Item
              </MenuItem>
            </MenuSegmentTitle>
            <MenuSegmentTitle
              key="alternate-variant"
              variant="alternate"
              text="Menu items (alternate variant)"
            >
              <MenuItem href="#" variant="alternate">
                Segmented Alternate Menu Item
              </MenuItem>
            </MenuSegmentTitle>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
```


### MDX Example 1

**Args**

```tsx
## Examples

### Default

<Canvas of={MenuStories.DefaultStory} />

> **Note**: To ensure a `MenuItem` is interactive, it should either have an `href`, `onClick` or `submenu` prop, or contain another focusable Carbon component like Button. Without one of these, the item will not be keyboard-focusable or interactive, affecting accessibility for keyboard and screen reader users.

### Focusing MenuItem's Programmatically
```


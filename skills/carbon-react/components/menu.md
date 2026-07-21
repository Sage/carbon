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
| alignContent | string \| undefined | No |  | Short hand `align-content` property |  |
| alignItems | string \| undefined | No |  | Short hand `align-items` property |  |
| alignSelf | string \| undefined | No |  | Short hand `align-self` property |  |
| flex | string \| undefined | No |  | Short hand `flex` property |  |
| flexBasis | string \| undefined | No |  | Short hand `flex-basis` property |  |
| flexDirection | string \| undefined | No |  | Short hand `flex-direction` property |  |
| flexGrow | string \| undefined | No |  | Short hand `flex-grow` property |  |
| flexShrink | string \| undefined | No |  | Short hand `flex-shrink` property |  |
| flexWrap | string \| undefined | No |  | Short hand `flex-wrap` property |  |
| justifyContent | string \| undefined | No |  | Short hand `justify-content` property |  |
| justifyItems | string \| undefined | No |  | Short hand `justify-items` property |  |
| justifySelf | string \| undefined | No |  | Short hand `justify-self` property |  |
| maxWidth | string \| undefined | No |  | Short hand `max-width` property |  |
| menuType | MenuType \| undefined | No |  | Defines the color scheme of the component | "light" |
| minWidth | string \| undefined | No |  | Short hand `min-width` property |  |
| order | string \| undefined | No |  | Short hand `order` property |  |
| overflow | string \| undefined | No |  | Short hand `overflow` property |  |
| overflowX | string \| undefined | No |  | Short hand `overflow-x` property |  |
| verticalAlign | string \| undefined | No |  | Short hand `vertical-align` property |  |
| width | string \| undefined | No |  | Short hand `width` property |  |
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
            variant="p"
            weight="medium"
            inverse={menuType === "dark" || menuType === "black"}
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


### Scrollable Submenu with Parent

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
                color="neutral"
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


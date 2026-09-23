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
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Children elements |  |
| alignContent | ResponsiveValue<CSS.Property.AlignContent, ThemeType> \| undefined | No |  |  |  | The CSS align-content property sets how the browser distributes space between and around content items along the cross-axis of a flexbox container, and the main-axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) |  |
| alignItems | ResponsiveValue<CSS.Property.AlignItems, ThemeType> \| undefined | No |  |  |  | The CSS align-items property sets the align-self value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment of items on the Block Axis within their grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) |  |
| alignSelf | ResponsiveValue<CSS.Property.AlignSelf, ThemeType> \| undefined | No |  |  |  | The align-self CSS property aligns flex items of the current flex line overriding the align-items value. If any of the item's cross-axis margin is set to auto, then align-self is ignored. In Grid layout align-self aligns the item inside the grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) |  |
| flex | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | The flex CSS property specifies how a flex item will grow or shrink so as to fit the space available in its flex container. This is a shorthand property that sets flex-grow, flex-shrink, and flex-basis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) |  |
| flexBasis | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  |  |  |
| flexDirection | ResponsiveValue<CSS.Property.FlexDirection, ThemeType> \| undefined | No |  |  |  | The flex-direction CSS property specifies how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) |  |
| flexGrow | ResponsiveValue<CSS.Property.FlexGrow, ThemeType> \| undefined | No |  |  |  | The flex-grow CSS property sets the flex grow factor of a flex item main size. It specifies how much of the remaining space in the flex container should be assigned to the item (the flex grow factor). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) |  |
| flexShrink | ResponsiveValue<CSS.Property.FlexShrink, ThemeType> \| undefined | No |  |  |  | The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) |  |
| flexWrap | ResponsiveValue<CSS.Property.FlexWrap, ThemeType> \| undefined | No |  |  |  | The flex-wrap CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) |  |
| justifyContent | ResponsiveValue<CSS.Property.JustifyContent, ThemeType> \| undefined | No |  |  |  | The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) |  |
| justifyItems | ResponsiveValue<CSS.Property.JustifyItems, ThemeType> \| undefined | No |  |  |  | The CSS justify-items property defines the default justify-self for all items of the box, giving them all a default way of justifying each box along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) |  |
| justifySelf | ResponsiveValue<CSS.Property.JustifySelf, ThemeType> \| undefined | No |  |  |  | The CSS justify-self property set the way a box is justified inside its alignment container along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self) |  |
| maxWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | The max-width CSS property sets the maximum width of an element. It prevents the used value of the width property from becoming larger than the value specified by max-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) |  |
| minWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | The min-width CSS property sets the minimum width of an element. It prevents the used value of the width property from becoming smaller than the value specified for min-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) |  |
| order | ResponsiveValue<CSS.Property.Order, ThemeType> \| undefined | No |  |  |  | The order CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending order value and then by their source code order. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/order) |  |
| overflow | ResponsiveValue<CSS.Property.Overflow, ThemeType> \| undefined | No |  |  |  | The overflow CSS property sets what to do when an element's content is too big to fit in its block formatting context. It is a shorthand for overflow-x and overflow-y. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) |  |
| overflowX | ResponsiveValue<CSS.Property.OverflowX, ThemeType> \| undefined | No |  |  |  | The overflow-x CSS property sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) |  |
| variant | "white" \| "black" \| undefined | No |  |  |  | Set the color variant of the component | "white" |
| verticalAlign | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | The vertical-align CSS property specifies sets vertical alignment of an inline or table-cell box. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) |  |
| width | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | The width utility parses a component's `width` prop and converts it into a CSS width declaration. - Numbers from 0-1 are converted to percentage widths. - Numbers greater than 1 are converted to pixel values. - String values are passed as raw CSS values. - And arrays are converted to responsive width styles. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| menuType | MenuType \| undefined | No |  | Yes | Please use the `variant` prop instead. |  |  |

## Examples
### Default

**Render**

```tsx
(args) => (
    <Menu {...args}>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem onClick={() => {}}>
        <Icon type="placeholder" />
        Menu Item Three
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <Icon type="placeholder" />
        Menu Item Four
      </MenuItem>
    </Menu>
  )
```


### BlackVariant

**Args**

```tsx
{
    variant: "black",
  }
```


### SelectedMenuItem

**Render**

```tsx
() => (
    <>
      <Menu>
        <MenuItem href="#" selected ariaCurrent="page">
          Menu Item One
        </MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Three</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Four</MenuItem>
      </Menu>
      <Menu variant="black">
        <MenuItem href="#" selected ariaCurrent="page">
          Menu Item One
        </MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Three</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Four</MenuItem>
      </Menu>
    </>
  )
```


### WithSubmenu

**Render**

```tsx
() => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Submenu">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
        <MenuItem
          submenu={
            <Box display="flex" alignItems="center" gap={1}>
              <Portrait size="XS" initials="JD" /> John Doe
            </Box>
          }
        >
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Submenu">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
        <MenuItem
          submenu={
            <Box display="flex" alignItems="center" gap={1}>
              <Portrait size="XS" initials="JD" /> John Doe
            </Box>
          }
        >
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </>
  )
```


### WithAlternateVariant

**Render**

```tsx
() => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Submenu">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#" variant="alternate">
            Alternate Item One
          </MenuItem>
          <MenuItem href="#" variant="alternate">
            Alternate Item Two
          </MenuItem>
        </MenuItem>
      </Menu>
      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Submenu">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#" variant="alternate">
            Alternate Item One
          </MenuItem>
          <MenuItem href="#" variant="alternate">
            Alternate Item Two
          </MenuItem>
        </MenuItem>
      </Menu>
    </>
  )
```


### WithMenuDivider

**Render**

```tsx
() => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Divider">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuDivider />
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
        <MenuItem submenu="With Large Divider">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuDivider size="large" />
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
      </Menu>

      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Divider">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuDivider />
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
        <MenuItem submenu="With Large Divider">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuDivider size="large" />
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
      </Menu>
    </>
  )
```


### WithSegmentTitle

**Render**

```tsx
() => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Segment Title">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuSegmentTitle text="Segment Title">
            <MenuItem href="#">Segment Item one</MenuItem>
            <MenuItem href="#">Segment Item Two</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
        <MenuItem submenu="Alternate Segment Title">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuSegmentTitle text="Alternate Segment Title" variant="alternate">
            <MenuItem href="#">Segment Item one</MenuItem>
            <MenuItem href="#">Segment Item Two</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
      </Menu>

      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Segment Title">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuSegmentTitle text="Segment Title">
            <MenuItem href="#">Segment Item one</MenuItem>
            <MenuItem href="#">Segment Item Two</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
        <MenuItem submenu="Alternate Segment Title">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuSegmentTitle text="Alternate Segment Title" variant="alternate">
            <MenuItem href="#">Segment Item one</MenuItem>
            <MenuItem href="#">Segment Item Two</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
      </Menu>
    </>
  )
```


### WithScrollableBlock

**Render**

```tsx
() => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Scrollable Block">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <ScrollableBlock height="200px">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
        <MenuItem submenu="Alternate Scrollable Block">
          <ScrollableBlock height="200px" variant="alternate">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </Menu>

      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Scrollable Block">
          <ScrollableBlock height="200px">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
        <MenuItem submenu="Alternate Scrollable Block">
          <ScrollableBlock height="200px" variant="alternate">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </Menu>
    </>
  )
```


### ScrollableBlockWithParent

**Render**

```tsx
() => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Scrollable Block with Parent">
          <ScrollableBlock
            height="200px"
            parent={<Search value="" onChange={() => {}} />}
          >
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </Menu>

      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Scrollable Block with Parent">
          <ScrollableBlock
            height="200px"
            parent={<Search value="" onChange={() => {}} inverse />}
          >
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </Menu>
    </>
  )
```


### TextOverflow

**Render**

```tsx
() => (
    <Menu>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#" maxWidth="175px">
        Really Long Menu Item Two
      </MenuItem>
      <MenuItem submenu="Really long Submenu" maxWidth="175px">
        <MenuItem href="#">Item Submenu One</MenuItem>
        <MenuItem href="#" maxWidth="175px">
          Really long Item Submenu Two
        </MenuItem>
      </MenuItem>
    </Menu>
  )
```


### ProgrammaticFocus

**Render**

```tsx
() => {
    const menuItemHandle = useRef<MenuItemHandle>(null);
    return (
      <>
        <Button onClick={() => menuItemHandle.current?.focus()}>
          Click to focus Menu Item One
        </Button>
        <Menu>
          <MenuItem ref={menuItemHandle} href="#">
            Menu Item One
          </MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem onClick={() => {}}>Menu Item Three</MenuItem>
          <MenuItem onClick={() => {}}>Menu Item Four</MenuItem>
        </Menu>
      </>
    );
  }
```


### FullscreenMenu

**Render**

```tsx
() => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Menu>
          <MenuItem onClick={() => setIsOpen(true)}>Open Menu</MenuItem>
          <MenuFullscreen isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Submenu">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuSegmentTitle text="Segment Title">
              <MenuItem href="#">Segment Item one</MenuItem>
              <MenuItem href="#">Segment Item Two</MenuItem>
            </MenuSegmentTitle>
            <MenuItem submenu="With Scrollable Block">
              <ScrollableBlock height="200px">
                <MenuItem href="#">Scrollable Item One</MenuItem>
                <MenuItem href="#">Scrollable Item Two</MenuItem>
                <MenuItem href="#">Scrollable Item Three</MenuItem>
                <MenuItem href="#">Scrollable Item Four</MenuItem>
                <MenuItem href="#">Scrollable Item Five</MenuItem>
                <MenuItem href="#">Scrollable Item Six</MenuItem>
              </ScrollableBlock>
            </MenuItem>
          </MenuFullscreen>
        </Menu>

        <Menu variant="black">
          <MenuItem onClick={() => setIsOpen(true)}>Open Menu</MenuItem>
          <MenuFullscreen isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Submenu">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuSegmentTitle text="Segment Title">
              <MenuItem href="#">Segment Item one</MenuItem>
              <MenuItem href="#">Segment Item Two</MenuItem>
            </MenuSegmentTitle>
            <MenuItem submenu="Submenu with Scrollable Block">
              <ScrollableBlock height="200px">
                <MenuItem href="#">Scrollable Item One</MenuItem>
                <MenuItem href="#">Scrollable Item Two</MenuItem>
                <MenuItem href="#">Scrollable Item Three</MenuItem>
                <MenuItem href="#">Scrollable Item Four</MenuItem>
                <MenuItem href="#">Scrollable Item Five</MenuItem>
                <MenuItem href="#">Scrollable Item Six</MenuItem>
              </ScrollableBlock>
            </MenuItem>
          </MenuFullscreen>
        </Menu>
      </>
    );
  }
```


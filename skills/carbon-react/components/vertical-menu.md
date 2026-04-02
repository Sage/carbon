---
name: carbon-component-vertical-menu
description: Carbon VerticalMenu component props and usage examples.
---

# VerticalMenu

## Import
`import { VerticalMenu } from "carbon-react/lib/components/vertical-menu";`

## Source
- Export: `./components/vertical-menu`
- Props interface: `VerticalMenuProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Content of the menu - VerticalMenuItem |  |
| height | string \| undefined | No |  | Height of the menu | "100%" |
| width | string \| undefined | No |  | Width of the menu | "322px" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | An aria-label attribute for the menu |  |
| aria-labelledby | string \| undefined | No |  | An aria-labelledby attribute for the menu |  |

## Examples
### Active

**Render**

```tsx
() => (
  <VerticalMenu aria-label="Active vertical menu">
    <VerticalMenuItem
      iconType="analysis"
      active={(isOpen) => !isOpen}
      title="Item 1"
    >
      <VerticalMenuItem active title="ChildItem 1" href="#" />
      <VerticalMenuItem title="ChildItem 2" href="#" />
    </VerticalMenuItem>
  </VerticalMenu>
)
```


### Adornment

**Render**

```tsx
() => (
  <VerticalMenu aria-label="Vertical menu with adornment">
    <VerticalMenuItem
      iconType="analysis"
      adornment={(isOpen) =>
        !isOpen && (
          <Pill borderColor="#fff" fill size="S">
            10
          </Pill>
        )
      }
      title="Item 1"
    >
      <VerticalMenuItem
        adornment={
          <Pill borderColor="#fff" fill size="S">
            10
          </Pill>
        }
        title="ChildItem 1"
        href="#"
      />
      <VerticalMenuItem title="ChildItem 2" href="#" />
    </VerticalMenuItem>
  </VerticalMenu>
)
```


### Custom Component

**Render**

```tsx
() => (
  <VerticalMenu aria-label="Custom vertical menu component">
    <VerticalMenuItem
      iconType="analysis"
      title="Item 1"
      component={Link}
      to="/item-1"
    />
  </VerticalMenu>
)
```


### Custom Item Height

**Render**

```tsx
() => (
  <VerticalMenu aria-label="Vertical menu with custom item height">
    <VerticalMenuItem height="100px" iconType="analysis" title="Item 1" />
  </VerticalMenu>
)
```


### Custom Item Margin

**Render**

```tsx
() => (
  <VerticalMenu
    height="100vh"
    aria-label="Vertical menu with custom item margin"
  >
    <VerticalMenuItem iconType="analysis" title="Item 1" />
    <VerticalMenuItem title="Item 2" />
    <VerticalMenuItem title="Item 3" mt="auto" />
  </VerticalMenu>
)
```


### Custom Item Padding

**Render**

```tsx
() => (
  <VerticalMenu aria-label="Vertical menu with custom item padding">
    <VerticalMenuItem iconType="analysis" title="Item 1" padding="0 0 0 80px" />
  </VerticalMenu>
)
```


### Custom Width and Height

**Render**

```tsx
() => (
  <VerticalMenu
    width="500px"
    height="100vh"
    aria-label="Vertical menu with custom width and height"
  >
    <VerticalMenuItem
      iconType="analysis"
      adornment={
        <Pill borderColor="#fff" fill size="S">
          10
        </Pill>
      }
      title="Item 1"
      href="#"
    />
    <VerticalMenuItem iconType="cart" active title="Item 2" href="#" />
    <VerticalMenuItem iconType="bank" title="Item 3" href="#" />
  </VerticalMenu>
)
```


### Default

**Render**

```tsx
() => (
  <Box height="100vh">
    <VerticalMenu aria-label="Default vertical menu">
      <VerticalMenuItem
        iconType="analysis"
        adornment={(isOpen) =>
          !isOpen && (
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          )
        }
        title="Item 1"
      >
        <VerticalMenuItem
          title="ChildItem 1"
          href="#"
          adornment={
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          }
        />
        <VerticalMenuItem href="#" title="ChildItem 2" />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="admin" href="#" title="Item 2" />

      <VerticalMenuItem
        iconType="home"
        title="Item 3"
        defaultOpen
        active={(isOpen) => !isOpen}
        adornment={(isOpen) =>
          !isOpen && (
            <Pill borderColor="#fff" fill size="S">
              129
            </Pill>
          )
        }
      >
        <VerticalMenuItem
          title="Very long text that will be wrapped"
          href="#"
          adornment={
            <Pill borderColor="#fff" fill size="S">
              100
            </Pill>
          }
        />
        <VerticalMenuItem
          title="Active item"
          href="#"
          active
          adornment={
            <Pill borderColor="#fff" fill size="S">
              29
            </Pill>
          }
        />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="alert" title="Item 4" href="#" />

      <VerticalMenuItem iconType="bank" title="Item 5">
        <VerticalMenuItem title="ChildItem 1" href="#" />
        <VerticalMenuItem title="ChildItem 2" href="#" />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="basket" title="Item 6" href="#" />

      <VerticalMenuItem
        iconType="calendar"
        title="Item 7 - More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title."
      >
        <VerticalMenuItem title="ChildItem 1" href="#" />
        <VerticalMenuItem title="ChildItem 2" href="#" />
      </VerticalMenuItem>
    </VerticalMenu>
  </Box>
)
```


### Full Screen

**Render**

```tsx
() => {
  const [isMenuOpen, setIsMenuOpen] = useState(defaultOpenState);

  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 1200px)");

  const menuItems = (
    <>
      <VerticalMenuItem iconType="analysis" title="Item 1">
        <VerticalMenuItem
          title="ChildItem 1"
          href="#"
          adornment={
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          }
        />
        <VerticalMenuItem href="#" title="ChildItem 2" />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="admin" href="#" title="Item 2" />

      <VerticalMenuItem iconType="home" title="Item 3">
        <VerticalMenuItem
          title="Very long text that will be wrapped"
          href="#"
          adornment={
            <Pill borderColor="#fff" fill size="S">
              100
            </Pill>
          }
        />
        <VerticalMenuItem
          title="Active item"
          href="#"
          active
          adornment={
            <Pill borderColor="#fff" fill size="S">
              29
            </Pill>
          }
        />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="alert" title="Item 4" href="#" />

      <VerticalMenuItem iconType="bank" title="Item 5">
        <VerticalMenuItem title="ChildItem 1" href="#" />
        <VerticalMenuItem title="ChildItem 2" href="#" />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="basket" title="Item 6" href="#" />

      <VerticalMenuItem
        mt="auto"
        iconType="calendar"
        title="Item 7 - More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title. "
      >
        <VerticalMenuItem title="ChildItem 1" href="#" />
        <VerticalMenuItem title="ChildItem 2" href="#" />
      </VerticalMenuItem>
    </>
  );

  if (fullscreenViewBreakPoint) {
    return (
      <>
        <VerticalMenuTrigger onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Menu
        </VerticalMenuTrigger>
        <VerticalMenuFullScreen
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          aria-label="Full-screen vertical menu"
        >
          {menuItems}
        </VerticalMenuFullScreen>
      </>
    );
  }

  return (
    <VerticalMenu aria-label="Full-screen vertical menu">
      {menuItems}
    </VerticalMenu>
  );
}
```


### Item With OnClick Handler

**Render**

```tsx
() => {
  const handleClick = (e: VerticalMenuItemClickEvent) => {
    e.preventDefault();
    window.open("https://carbon.sage.com", "_blank", "noopener noreferrer");
  };

  return (
    <VerticalMenu>
      <VerticalMenuItem
        iconType="analysis"
        title="Anchor with onClick"
        href="#"
        onClick={handleClick}
      />
      <VerticalMenuItem
        iconType="admin"
        title="Button with onClick"
        onClick={handleClick}
      />
    </VerticalMenu>
  );
}
```


### MDX Example 1

**Args**

```tsx
## Examples

### Default

<Canvas of={VerticalMenuStories.Default} />

### Item With OnClick Handler
```


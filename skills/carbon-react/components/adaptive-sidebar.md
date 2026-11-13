---
name: carbon-component-adaptive-sidebar
description: Carbon AdaptiveSidebar component props and usage examples.
---

# AdaptiveSidebar

## Import
`import AdaptiveSidebar from "carbon-react/lib/components/adaptive-sidebar";`

## Source
- Export: `./components/adaptive-sidebar`
- Props interface: `AdaptiveSidebarProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open | boolean | Yes |  |  |  | Whether the sidebar is open or closed |  |
| adaptiveBreakpoint | number \| undefined | No |  |  |  | The breakpoint (in pixels) at which the sidebar will convert to a dialog-based sidebar | 768 |
| animationTimeout | number \| undefined | No |  |  |  | The time in milliseconds for the sidebar to animate |  |
| children | React.ReactNode | No |  |  |  | The content of the sidebar |  |
| hasBorder | boolean \| undefined | No |  |  |  | Flag to set a left border on the sidebar. |  |
| height | string \| undefined | No |  |  |  | The height of the sidebar, relative to the wrapping component | "100%" |
| hidden | boolean \| undefined | No |  |  |  | Whether the sidebar is hidden from view. In this state, the adaptive sidebar will continue to receive updates, etc. but will not be visible to users | false |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| renderAsModal | boolean \| undefined | No |  |  |  | Whether to render the sidebar as a modal component instead of as an inline sidebar | false |
| restoreFocusOnClose | boolean \| undefined | No |  |  |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. | false |
| variant | "standard" \| "alt" \| "inverse" \| undefined | No | standard \| alt \| inverse |  |  | Set the variant of the component. | "standard" |
| width | string \| undefined | No |  |  |  | The width of the sidebar | "320px" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the component, applied when the component is rendered as a modal |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component, applied when the component is rendered as a modal |  |
| backgroundColor | "white" \| "black" \| "app" \| undefined | No | white \| black \| app | Yes | Please use the `variant` prop instead. | The background color of the sidebar |  |
| borderColor | string \| undefined | No |  | Yes | Changing the border colour is no longer supported. | The color to use for the left-hand border of the sidebar. |  |

## Examples
### Default

**Args**

```tsx
{
    "aria-label": "Adaptive Sidebar",
  }
```

**Render**

```tsx
({ ...args }) => {
    const [isOpen, setIsOpen] = useState(defaultOpenState);
    return (
      <>
        <Box m={2} width="100%" display="flex" flexDirection="column" gap={2}>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : "Open"} Sidebar
          </Button>
          <Typography>Main content</Typography>
        </Box>
        <AdaptiveSidebar {...args} open={isOpen}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
          >
            <Typography variant="h2" inverse={args.variant === "inverse"}>
              Content
            </Typography>
            <Button
              onClick={() => setIsOpen(false)}
              variantType="secondary"
              inverse={args.variant === "inverse"}
            >
              Close
            </Button>
          </Box>
          <Divider
            type="horizontal"
            m={0}
            inverse={args.variant === "inverse"}
          />
          <Typography p={1} inverse={args.variant === "inverse"}>
            AdaptiveSidebar Content
          </Typography>
        </AdaptiveSidebar>
      </>
    );
  }
```


### WithCustomWidth

**Args**

```tsx
{
    ...Default.args,
    width: "500px",
  }
```


### WithCustomHeight

**Args**

```tsx
{
    ...Default.args,
    height: "150px",
  }
```


### AltVariant

**Args**

```tsx
{
    ...Default.args,
    variant: "alt",
  }
```


### InverseVariant

**Args**

```tsx
{
    ...Default.args,
    variant: "inverse",
  }
```


### AdaptiveBreakpoint

**Args**

```tsx
{
    ...Default.args,
    adaptiveBreakpoint: 500,
  }
```


### RenderAsModal

**Args**

```tsx
{
    ...Default.args,
    renderAsModal: true,
  }
```


### Hidden

**Args**

```tsx
{
    "aria-label": "Adaptive Sidebar",
    open: true,
  }
```

**Render**

```tsx
({ ...args }) => {
    const [isHidden, setIsHidden] = useState(!defaultOpenState);
    return (
      <>
        <Box m={2} width="100%" display="flex" flexDirection="column" gap={2}>
          <Button onClick={() => setIsHidden(!isHidden)}>
            {!isHidden ? "Hide" : "Show"} Sidebar
          </Button>
          <Typography>Main content</Typography>
        </Box>
        <AdaptiveSidebar {...args} hidden={isHidden}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
          >
            <Typography variant="h2" inverse={args.variant === "inverse"}>
              Content
            </Typography>
            <Button
              onClick={() => setIsHidden(true)}
              variantType="secondary"
              inverse={args.variant === "inverse"}
            >
              Hide
            </Button>
          </Box>
          <Divider
            type="horizontal"
            m={0}
            inverse={args.variant === "inverse"}
          />
          <Typography p={1} inverse={args.variant === "inverse"}>
            AdaptiveSidebar Content
          </Typography>
        </AdaptiveSidebar>
      </>
    );
  }
```


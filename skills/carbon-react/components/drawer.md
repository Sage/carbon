---
name: carbon-component-drawer
description: Carbon Drawer component props and usage examples.
---

# Drawer

## Import
`import Drawer from "carbon-react/lib/components/drawer";`

## Source
- Export: `./components/drawer`
- Props interface: `DrawerProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Main content to display |  |
| backgroundColor | string \| undefined | No |  |  |  | Sets color of sidebar's background |  |
| expanded | boolean \| undefined | No |  |  |  | Sets the expansion state of the Drawer if component is meant to be used as controlled |  |
| expandedWidth | string \| undefined | No |  |  |  | The width of the expanded sidebar | "30vw" |
| footer | React.ReactNode | No |  |  |  | Content to display inside of a footer |  |
| height | string \| undefined | No |  |  |  | Sets the height of the component | "100%" |
| onChange | ((e: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void) \| undefined | No |  |  |  | Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) |  |
| sidebar | React.ReactNode | No |  |  |  | Drawer sidebar content |  |
| sidebarAriaLabel | string \| undefined | No |  |  |  | Specify an aria-label for the Drawer sidebar |  |
| stickyFooter | boolean \| undefined | No |  |  |  | Makes the footer of the drawer sticky. Footer prop must also be set. |  |
| stickyHeader | boolean \| undefined | No |  |  |  | Makes the header of the drawer sticky. Title prop must also be set. |  |
| title | React.ReactNode | No |  |  |  | Sets the heading of the drawer |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Specify an aria-label for the Drawer component |  |
| animationDuration | string \| undefined | No |  | Yes | This prop will soon be removed. | Duration of a animation | "400ms" |
| defaultExpanded | boolean \| undefined | No |  | Yes | This prop will soon be removed, please use the `expanded` prop instead. | Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled |  |
| showControls | boolean \| undefined | No |  | Yes | This prop will soon be removed, this component is now intended to be non-dismissible. | Enables expand/collapse button that controls drawer |  |

## Examples
### Default

**Args**

```tsx
{
    sidebar: <Box p={3}>Drawer content</Box>,
  }
```

**Render**

```tsx
(args) => (
    <Drawer {...args}>
      <Box p={3}>Main body content</Box>
    </Drawer>
  )
```


### Height

**Args**

```tsx
{
    ...Default.args,
    height: "100px",
  }
```


### SidebarWidth

**Args**

```tsx
{
    ...Default.args,
    expandedWidth: "400px",
  }
```


### WithTitle

**Args**

```tsx
{
    ...Default.args,
    title: <Typography variant="h2">Drawer Title</Typography>,
  }
```


### WithFooter

**Args**

```tsx
{
    ...WithTitle.args,
    footer: (
      <Box display="flex" justifyContent="flex-end">
        <Button buttonType="primary">Footer Action</Button>
      </Box>
    ),
  }
```


### StickyHeaderAndFooter

**Args**

```tsx
{
    ...WithFooter.args,
    stickyHeader: true,
    stickyFooter: true,
    height: "300px",
    sidebar: (
      <Box p={3}>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
      </Box>
    ),
  }
```


### SidebarAriaLabel

**Args**

```tsx
{
    ...Default.args,
    sidebarAriaLabel: "This is a Drawer",
  }
```


### WithBackgroundColor

**Args**

```tsx
{
    ...Default.args,
    backgroundColor: "var(--colorsUtilityMajor050)",
  }
```


### Controlled

**Render**

```tsx
() => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <Drawer
        expanded={isExpanded}
        height="225px"
        sidebar={<Box p={3}>Drawer content</Box>}
      >
        <Box p={3}>Main body content</Box>
      </Drawer>

      <Button
        mt={2}
        buttonType="primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Show/Hide Drawer
      </Button>
    </>
  );
}
```


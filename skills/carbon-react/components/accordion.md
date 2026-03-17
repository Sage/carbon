---
name: carbon-component-accordion
description: Carbon Accordion component props and usage examples.
---

# Accordion

## Import
`import { Accordion } from "carbon-react/lib/components/accordion";`

## Source
- Export: `./components/accordion`
- Props interface: `AccordionProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| title | React.ReactNode | Yes |  |  |  | Title of the Accordion |  |
| borders | "default" \| "none" \| "full" \| undefined | No |  |  |  | Sets Accordion borders. **Deprecation Warning:** The "full" borders are deprecated and will be removed in a future release. |  |
| children | React.ReactNode | No |  |  |  | Content of the Accordion component |  |
| defaultExpanded | boolean \| undefined | No |  |  |  | Set the default state of expansion of the Accordion if component is to be used as uncontrolled |  |
| expanded | boolean \| undefined | No |  |  |  | Sets the expansion state of the Accordion if component is to be used as controlled |  |
| headerSpacing | SpaceProps | No |  |  |  | Styled system spacing props provided to Accordion Title |  |
| id | string \| undefined | No |  |  |  |  |  |
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
| onChange | ((event: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void) \| undefined | No |  |  |  | Callback fired when expansion state changes |  |
| openTitle | string \| undefined | No |  |  |  | Title of the Accordion when it is open |  |
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
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Sets Accordion size |  |
| subTitle | string \| undefined | No |  |  |  | Sets accordion sub title |  |
| variant | "subtle" \| "standard" \| "simple" \| undefined | No |  |  |  | Sets Accordion variant. **Deprecation Warning:** The "subtle" variant is deprecated, please use "simple" instead. |  |
| width | string \| undefined | No |  |  |  | Sets Accordion width |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| disableContentPadding | boolean \| undefined | No |  | Yes | Padding is no longer applied to the Accordion content by default. Any desired spacing can be applied directly to the provided content. | Disable padding for the content. |  |
| error | string \| undefined | No |  | Yes | Validation messages on accordions are deprecated and will be removed in a future release. | An error message to be displayed in the tooltip. |  |
| iconAlign | "left" \| "right" \| undefined | No |  | Yes | Icon alignment on accordions is deprecated and will be removed in a future release. Icons will now render on the left by default. | Sets icon alignment. |  |
| iconType | "chevron_down" \| "chevron_down_thick" \| "dropdown" \| undefined | No |  | Yes | Custom icon types on accordions are deprecated and will be removed in a future release. | Sets icon type |  |
| info | string \| undefined | No |  | Yes | Validation messages on accordions are deprecated and will be removed in a future release. | An info message to be displayed in the tooltip. |  |
| warning | string \| undefined | No |  | Yes | Validation messages on accordions are deprecated and will be removed in a future release. | A warning message to be displayed in the tooltip. |  |

## Examples
### Default

**Args**

```tsx
{
    title: "Title",
  }
```

**Render**

```tsx
(args) => (
    <Accordion {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  )
```


### Subtitle

**Args**

```tsx
{
    ...Default.args,
    subTitle: "Subtitle",
  }
```


### Custom Title

**Render**

```tsx
({ ...args }) => {
  const title = (
    <Box display="flex" alignItems="center" gap="16px">
      <Image size="60px" src={collaborateSvg} decorative />
      <Box>
        <Typography variant="h2" fontSize="21px">
          Custom Title
        </Typography>
        <Typography
          as="span"
          fontSize="16px"
          color="rgba(0,0,0,0.65)"
          fontWeight="500"
        >
          Custom Subtitle
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Accordion title={title} {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  );
}
```


### SimpleVariant

**Args**

```tsx
{
    ...Default.args,
    title: "Accordion label",
    variant: "simple",
  }
```

**Render**

```tsx
(args) => (
    <Accordion {...args}>
      <Box>Content</Box>
      <Box>Content</Box>
      <Box mb={1}>Content</Box>
    </Accordion>
  )
```


### Standard Sizes

**Args**

```tsx
{
  subTitle: "Subtitle",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Accordion title="Small Standard" size="small" {...args}>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>

      <Accordion title="Medium Standard" size="medium" {...args}>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>
    </Box>
  );
}
```


### Simple Sizes

**Args**

```tsx
{
  variant: "simple",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Box display="flex" alignItems="flex-start">
      <Accordion title="Small Simple" size="small" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>

      <Accordion title="Medium Simple" size="medium" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>

      <Accordion title="Large Simple" size="large" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>
    </Box>
  );
}
```


### HeaderSpacing

**Args**

```tsx
{
    ...Default.args,
    headerSpacing: {
      padding: "24px 0",
    },
  }
```


### DisableBorders

**Args**

```tsx
{
    ...Default.args,
    borders: "none",
  }
```


### Width

**Args**

```tsx
{
    ...Default.args,
    width: "500px",
  }
```


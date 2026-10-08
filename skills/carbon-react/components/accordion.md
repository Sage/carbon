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
| borders | "none" \| "default" \| "full" \| undefined | No |  |  |  | Sets Accordion borders. **Deprecation Warning:** The "full" borders are deprecated and will be removed in a future release. |  |
| children | React.ReactNode | No |  |  |  | Content of the Accordion component |  |
| defaultExpanded | boolean \| undefined | No |  |  |  | Set the default state of expansion of the Accordion if component is to be used as uncontrolled |  |
| expanded | boolean \| undefined | No |  |  |  | Sets the expansion state of the Accordion if component is to be used as controlled |  |
| headerSpacing | SpaceProps \| undefined | No |  |  |  | Styled system spacing props provided to Accordion Title |  |
| id | string \| undefined | No |  |  |  |  |  |
| m | SpacingProperty | No |  |  |  |  |  |
| margin | SpacingProperty | No |  |  |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |  |  |
| marginX | SpacingProperty | No |  |  |  |  |  |
| marginY | SpacingProperty | No |  |  |  |  |  |
| mb | SpacingProperty | No |  |  |  |  |  |
| ml | SpacingProperty | No |  |  |  |  |  |
| mr | SpacingProperty | No |  |  |  |  |  |
| mt | SpacingProperty | No |  |  |  |  |  |
| mx | SpacingProperty | No |  |  |  |  |  |
| my | SpacingProperty | No |  |  |  |  |  |
| onChange | ((event: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void) \| undefined | No |  |  |  | Callback fired when expansion state changes |  |
| openTitle | string \| undefined | No |  |  |  | Title of the Accordion when it is open |  |
| p | SpacingProperty | No |  |  |  |  |  |
| padding | SpacingProperty | No |  |  |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |  |  |
| pb | SpacingProperty | No |  |  |  |  |  |
| pl | SpacingProperty | No |  |  |  |  |  |
| pr | SpacingProperty | No |  |  |  |  |  |
| pt | SpacingProperty | No |  |  |  |  |  |
| px | SpacingProperty | No |  |  |  |  |  |
| py | SpacingProperty | No |  |  |  |  |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Sets Accordion size |  |
| subTitle | string \| undefined | No |  |  |  | Sets accordion sub title |  |
| variant | "subtle" \| "standard" \| "simple" \| undefined | No |  |  |  | Sets Accordion variant. **Deprecation Warning:** The "subtle" variant is deprecated, please use "simple" instead. |  |
| width | string \| undefined | No |  |  |  | Sets Accordion width |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| disableContentPadding | boolean \| undefined | No |  | Yes | Padding is no longer applied to the Accordion content by default. Any desired spacing can be applied directly to the provided content. | Disable padding for the content. |  |
| error | string \| undefined | No |  | Yes | Validation messages on accordions are no longer supported. | An error message to be displayed in the tooltip. |  |
| iconAlign | "left" \| "right" \| undefined | No |  | Yes | Icon alignment on accordions is deprecated and will be removed in a future release. Icons will now render on the left by default. | Sets icon alignment. |  |
| iconType | "chevron_down" \| "chevron_down_thick" \| "dropdown" \| undefined | No |  | Yes | Custom icon types on accordions are deprecated and will be removed in a future release. | Sets icon type |  |
| info | string \| undefined | No |  | Yes | Validation messages on accordions are no longer supported. | An info message to be displayed in the tooltip. |  |
| warning | string \| undefined | No |  | Yes | Validation messages on accordions are no longer supported. | A warning message to be displayed in the tooltip. |  |

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
        <Typography variant="segment-header" as="h2">
          Custom Title
        </Typography>
        <Typography
          as="span"
          variant="p"
          size="L"
          color="neutral"
          weight="medium"
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


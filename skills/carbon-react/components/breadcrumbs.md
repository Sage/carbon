---
name: carbon-component-breadcrumbs
description: Carbon Breadcrumbs component props and usage examples.
---

# Breadcrumbs

## Import
`import { Breadcrumbs } from "carbon-react/lib/components/breadcrumbs";`

## Source
- Export: `./components/breadcrumbs`
- Props interface: `BreadcrumbsProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Child crumbs to display |  |
| inverse | boolean \| undefined | No |  |  |  | Sets the colour styling when component is to be rendered with inverse styles |  |
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
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | The 'isDarkBackground' prop in Breadcrumbs is deprecated and will soon be removed. Please use the 'inverse' prop instead. | Sets the colour styling when component is rendered on a dark background |  |

## Examples
### Default

**Render**

```tsx
({ ...args }) => {
    return (
      <Breadcrumbs aria-label="Default breadcrumbs" {...args}>
        <Crumb href="#">Breadcrumb 1</Crumb>
        <Crumb href="#">Breadcrumb 2</Crumb>
        <Crumb href="#">Breadcrumb 3</Crumb>
        <Crumb href="#" isCurrent>
          Current Page
        </Crumb>
      </Breadcrumbs>
    );
  }
```


### Inverse

**Args**

```tsx
{
    inverse: true,
  }
```

**Render**

```tsx
({ ...args }) => {
    return (
      <Box p={2} bg="#000">
        <Breadcrumbs aria-label="Breadcrumbs with inverse styling" {...args}>
          <Crumb href="#">Breadcrumb 1</Crumb>
          <Crumb href="#">Breadcrumb 2</Crumb>
          <Crumb href="#">Breadcrumb 3</Crumb>
          <Crumb href="#" isCurrent>
            Current Page
          </Crumb>
        </Breadcrumbs>
      </Box>
    );
  }
```


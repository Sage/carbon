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


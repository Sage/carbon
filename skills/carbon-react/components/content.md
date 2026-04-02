---
name: carbon-component-content
description: Carbon Content component props and usage examples.
---

# Content

## Import
`import Content from "carbon-react/lib/components/content";`

## Source
- Export: `./components/content`
- Props interface: `ContentProps`
- Deprecated: Yes
- Deprecation reason: `Content` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| align | AlignOptions \| undefined | No |  | Aligns the content (left, center or right) | "left" |
| bodyFullWidth | boolean \| undefined | No |  | Over-rides the calculation of body width based on titleWidth. Sometimes we need the body to be full width while keeping a title width similar to other widths | false |
| children | React.ReactNode | No |  | The body of the content component |  |
| inline | boolean \| undefined | No |  | Displays the content inline with the title | false |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| title | React.ReactNode | No |  | The title of the content component |  |
| titleWidth | string \| undefined | No |  | Sets a custom width for the title element |  |
| variant | VariantOptions \| undefined | No |  | Applies a theme to the Content Value: primary, secondary | "primary" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### CustomTitle

**Args**

```tsx
{
    title: <Typography color="primary">Title</Typography>,
    variant: "primary",
    children: "This is an example of some content",
  }
```


### DefaultStory


### InlineContent

**Args**

```tsx
{
    inline: true,
    children: "This is an example of some content",
  }
```


### MDX Example 1

**Args**

```tsx
import Content from "carbon-react/lib/components/content";
```


### SecondaryStyling

**Args**

```tsx
{
    variant: "secondary",
    children: "This is an example of some content",
  }
```


# Content

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated layout component that renders a labelled block of content with a title and body. It supports primary and secondary visual variants as well as an inline mode where the title and body sit side-by-side.

**Category:** UI presentation

## Quick Start

```js
import Content from "carbon-react/lib/components/content";
```

## Examples

### Default content

Renders a `Content` block with a string title and body text using the default `primary` variant.

See: `examples/DefaultStory.md`

### Inline content

Set `inline` to `true` to display the title and body side-by-side on the same line instead of stacked vertically.

See: `examples/InlineContent.md`

### Custom title

Pass a React node to the `title` prop to customise its appearance — for example, using a `Typography` component with a specific colour.

See: `examples/CustomTitle.md`

### Secondary styling

Use `variant="secondary"` to apply a lighter, secondary visual style to the content block.

See: `examples/SecondaryStyling.md`

## Props

### Content

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| align | AlignOptions \| undefined | No |  | Aligns the content (left, center or right) | "left" |
| bodyFullWidth | boolean \| undefined | No |  | Over-rides the calculation of body width based on titleWidth. Sometimes we need the body to be full width while keeping a title width similar to other widths | false |
| children | React.ReactNode | No |  | The body of the content component |  |
| inline | boolean \| undefined | No |  | Displays the content inline with the title | false |
| title | React.ReactNode | No |  | The title of the content component |  |
| titleWidth | string \| undefined | No |  | Sets a custom width for the title element |  |
| variant | VariantOptions \| undefined | No |  | Applies a theme to the Content Value: primary, secondary | "primary" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

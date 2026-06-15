# Detail

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated text display component that renders a labelled detail value, optionally with a footnote and an icon. Use `Typography` or `DefinitionList` in new implementations.

**Category:** UI presentation

## Quick Start

```javascript
import Detail from "carbon-react/lib/components/detail";
```

## Examples

### Default Detail

This is an example of how the Detail component will look in its default format.

See: `examples/Default.md`

### Detail with a Footnote

Detail can also have a footnote by using the `footnote` prop.

See: `examples/DetailWithFootnote.md`

### Default with Icon

Detail can also have an icon that renders to the left.

See: `examples/DetailWithIcon.md`

### Inside of Components

#### Inside of Card

Detail can be nested inside of components. Inside of this example it is nested inside of the `Card` component.

See: `examples/DetailInsideCard.md`

#### Inside of Tile

In this example, Detail is nested inside of the `Tile` component.

See: `examples/DetailInsideTile.md`

## Props

### Detail

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The rendered children of the component. |  |
| className | string \| undefined | No |  |  |  |
| footnote | string \| undefined | No |  | A small detail to display under the main content. |  |
| icon | IconType \| undefined | No |  | The type of icon to use. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

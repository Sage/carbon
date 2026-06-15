# Grid

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated 12-column CSS Grid layout system composed of `GridContainer` and `GridItem` components. Supports responsive breakpoints, item reordering and alignment. Use `Box` with `display="grid"` in new implementations.

**Category:** UI presentation

## Quick Start

```javascript
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
```

## Designer Notes

- The Grid system is implemented with the `GridContainer` and `GridItem` components that provide two types of layout.
- It uses the [CSS Grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), which is a truly two-dimensional grid, allowing us to specify dimensions of rows and columns, and control where we position components within the grid.

### `GridContainer`

- Comprised of 12 equal-width columns, including external paddings and internal gutters.
- Allows either percentage or a fixed pixel width.
- Respects the boundaries of any outer element, so if an outer element has a `max-width: 1280px`, `GridContainer` including it's paddings and gutters will be based on that size.

### `GridItem`

The child of a `GridContainer` is a `GridItem`, which can have a set of breakpoints applied that are used to control how each `GridItem` responds at given widths.
As a result it is important that you render `GridItem` components as direct children of the `GridContainer`. If you do need to wrap the items you should use `React.Fragment`s and avoid adding any additional HTML elements.

- Can be defined at any width between 1 and 12, each unit corresponding to a column of the `GridContainer`.
- Unlimited breakpoints provide dynamic adjustment at any viewport width.
- Can be re-ordered on the page by viewport dimensions.

### Paddings

Paddings for the `GridContainer` are set automatically in the CSS, following the values in this table.

| Breakpoints                    | Device Type                         | Paddings |
| ------------------------------ | ----------------------------------- | -------- |
| Extra Small (320 to 599px)     | Smart Phones                        | 16px     |
| Small (600 to 959px)           | Portrait Tablets                    | 24px     |
| Medium (960 to 1259px)         | Landscape Tablets & Low-Res Laptops | 32px     |
| Large (1260 to 1920px)         | High-Res Laptops & Monitors         | 40px     |
| Extra Large (1921px and above) | Ultra High-Res Monitors             | 40px     |

### Gutters

Gutters for the `GridItem` are set automatically in the CSS, following the values in this table.

| Breakpoints                    | Device Type                         | Gutters |
| ------------------------------ | ----------------------------------- | ------- |
| Extra Small (320 to 599px)     | Smart Phones                        | 16px    |
| Small (600 to 959px)           | Portrait Tablets                    | 16px    |
| Medium (960 to 1259px)         | Landscape Tablets & Low-Res Laptops | 24px    |
| Large (1260 to 1920px)         | High-Res Laptops & Monitors         | 24px    |
| Extra Large (1921px and above) | Ultra High-Res Monitors             | 40px    |

## Examples

### Default

A basic 12-column `GridContainer` with several `GridItem` children. Each `GridItem` spans columns using `columnStart`/`columnEnd`. Best viewed in full-screen Canvas mode.

See: `examples/Default.md`

### Justify

Use `justifyContent` on `GridContainer` to control horizontal alignment of `GridItem` children. Best viewed in full-screen Canvas mode.

See: `examples/Justify.md`

### Align

Use `alignItems` on `GridContainer` to control vertical alignment of `GridItem` children within their row. Best viewed in full-screen Canvas mode.

See: `examples/Align.md`

### Custom

Custom column spans and offsets using numeric `columnStart`/`columnEnd` values on individual `GridItem` components. Best viewed in full-screen Canvas mode.

See: `examples/CustomSpacing.md`

### Responsive Settings

Each `GridItem` receives a `responsiveSettings` array of breakpoint objects, allowing dynamic column spans and reordering at different viewport widths. Best viewed in full-screen Canvas mode.

See: `examples/ResponsiveSettings.md`

### With a subgrid

A `GridItem` acts as a nested `GridContainer` to create a sub-grid. Best viewed in full-screen Canvas mode.

See: `examples/SubGrid.md`

## Props

### GridContainer Props

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Defines the Components to be rendered within the GridContainer. Requires GridItemProps |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### GridItem Props

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alignSelf | string \| undefined | No |  |  |  |
| children | React.ReactNode | No |  | Defines the Component(s) to be rendered within the GridItem |  |
| gridArea | GridAreaProps["gridArea"] | No |  |  |  |
| gridColumn | GridColumnProps["gridColumn"] | No |  |  |  |
| gridRow | GridRowProps["gridRow"] | No |  |  |  |
| justifySelf | string \| undefined | No |  |  |  |
| responsiveSettings | ResponsiveSettings[] \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### responsiveSettings

No props metadata found.

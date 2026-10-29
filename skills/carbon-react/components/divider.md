---
name: carbon-component-divider
description: Carbon Divider component props and usage examples.
---

# Divider

A vertical or horizontal line that visually separates adjacent content.

## Choose instead

- **MenuDivider:** Separating groups of MenuItem components within a submenu.
- **ActionPopoverDivider:** Separating groups of ActionPopoverItem components within an ActionPopover.

## Pitfalls

- Divider is vertical by default; set type to horizontal for a full-width line between stacked content.
- Divider adds spacing by default: horizontal dividers have mt and mb of 3 (24px), and vertical dividers have p of 3 (24px) on every side.
- Only horizontal dividers have separator semantics, because they render an hr; vertical dividers are purely visual, and inside a Menu they render as list items that are always hidden from assistive technology.

## Import
`import Divider from "carbon-react/lib/components/divider";`

## Source
- Export: `./components/divider`
- Props interface: `DividerProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| adaptiveMxBreakpoint | number \| undefined | No |  | Breakpoint for adaptive left and right margins (below the breakpoint they go to 0). Enables the adaptive behaviour when set. Only available for `horizontal` type. |  |
| displayInline | boolean \| undefined | No |  | Sets the display: inline css attribute on the component To be used in non-flex containers. Only available for the `vertical` type. | false |
| h | string \| number \| undefined | No |  | Shorthand for the height attribute. Only available for the `vertical` type. |  |
| height | string \| number \| undefined | No |  | Height attribute of the component. Only available for the `vertical` type. |  |
| inverse | boolean \| undefined | No |  | Set the style of the Divider to inverse | false |
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
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| type | "horizontal" \| "vertical" \| undefined | No |  | Sets Divider type | "vertical" |
| variant | "typical" \| "prominent" \| undefined | No |  | Sets Divider variant | "typical" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | boolean \| undefined | No |  | Set the divider to be hidden from screen readers. Please note that this cannot be overridden when inside a Menu. |  |

## Examples
Load only the example needed for the current task; playground stories are intentionally omitted.

- [Inside Form](../examples/divider/inside-form.md) — Separate groups of form fields with a horizontal divider and custom vertical margins.
- [In a Flex Container](../examples/divider/in-a-flex-container.md) — Separate items in a flex row with vertical dividers given an explicit height.
- [In a Menu](../examples/divider/in-a-menu.md) — Separate top-level items in a horizontal Menu with a vertical divider.
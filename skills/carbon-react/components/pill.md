---
name: carbon-component-pill
description: Carbon Pill component props and usage examples.
---

# Pill

A compact visual indicator that highlights information or status.

## When to use

- An item's status needs to be prominent at a glance; this is Pill's primary use.
- A short label helps categorise an item; this is secondary to communicating status.

## Choose instead

- **ButtonNext:** The element's primary purpose is to perform an action rather than display information or status.

## Pitfalls

- Give a removable pill a clear, unique accessible label that describes the relationship between the pill and its removal button.
- Use a left icon only with size L.
- Keep the Pill itself out of the tab order; only its removal button should receive keyboard focus.
- Add visually hidden context when the pill's meaning is not clear from its visible label and surroundings.

## Import
`import Pill from "carbon-react/lib/components/pill";`

## Source
- Export: `./components/pill`
- Props interface: `PillProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | string | Yes |  |  |  | The content to display inside of the pill. |  |
| ariaLabelOfRemoveButton | string \| undefined | No |  |  |  | Sets custom aria-label attribute on the remove button |  |
| borderColor | string \| undefined | No |  |  |  | Override color variant, provide any color from palette or any valid css color value. |  |
| fill | boolean \| undefined | No |  |  |  | Fills the pill background with colour. When fill is false only the border is coloured. | false |
| icon | React.ReactNode | No |  |  |  | A React node displayed to the left of the pill content. Recommended for use with `size="L"` pills. |  |
| inverse | boolean \| undefined | No |  |  |  | Whether to apply inverse styling to the pill. | false |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| maxWidth | string \| undefined | No |  |  |  | Sets the max-width of the pill. |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| onClick | ((ev: React.MouseEvent<HTMLSpanElement>) => void) \| undefined | No |  |  |  | Callback function for when the pill is clicked. |  |
| onDelete | ((ev?: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback fired when the remove button is activated. Receives the click event. |  |
| variant | "grey" \| "green" \| "red" \| "orange" \| "blue" \| "purple" \| "teal" \| "lime" \| "pink" \| "slate" \| undefined | No |  |  |  | Sets the colour variant of a status pill. |  |
| wrapText | boolean \| undefined | No |  |  |  | Allow the text within pill to wrap. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| colorVariant | "warning" \| "neutral" \| "negative" \| "positive" \| "information" \| "neutralWhite" \| undefined | No |  | Yes | Use `variant` prop instead. | Determines the colour variant of the pill. |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | Use `inverse` prop instead. | Apply inverse styling for use on dark backgrounds. | false |
| pillRole | "tag" \| "status" \| undefined | No |  | Yes | The pillRole prop is no longer used. Pill styling is determined by the `variant`, `fill`, and `inverse` props. | Sets the type of pill in use. |  |
| size | "S" \| "M" \| "L" \| "XL" \| undefined | No |  | Values: "XL" | The `XL` size is deprecated and will be removed in a future release. Use `L` instead. | Sets the size of the pill. | "M" |

## Examples
Load only the example needed for the current task; playground stories are intentionally omitted.

- [Wrapped](../examples/pill/wrapped.md) — Allow an unusually long label to wrap within a constrained width.
- [With Remove Button](../examples/pill/with-remove-button.md) — Make a pill removable with onDelete and give its removal button a clear, contextual accessible label.
- [Inverse](../examples/pill/inverse-on-dark-background.md) — Apply inverse styling to a pill.
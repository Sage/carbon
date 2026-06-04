# Pill

Compact visual indicators that help things in common stand out.

## Import

```javascript
import Pill from "carbon-react/lib/components/pill";
```

## Examples

### Default

See: `examples/Default.md`

### Wrapped

By default the text within a Pill will not wrap, however you can override this behavior by setting the `wrapText`
and `maxWidth` props. It is also possible to hyphenate the words but you may need to define where to place
the hyphens using `&shy;` if they are not automatically added: this is because the rules for adding them are
language-specific and support for every `lang` attribute is not universal.

See: `examples/Wrapped.md`

### With remove button

When a callback in the `onDelete` prop is provided, a remove button will be rendered and clicking on it will trigger that callback.

See: `examples/WithRemoveButton.md`

### With custom remove button aria-label

By default, the remove button's `aria-label` is handled via the `pill.remove` [translation keys](#translation-keys) using the pill's label as an argument.
To override this, provide a custom string via the `ariaLabelOfRemoveButton` prop.

See: `examples/WithCustomRemoveButtonAriaLabel.md`

### Status Pills

An automatic indicator of status, styled with utility colours to carry meaning.

See: `examples/Status.md`

### Tag Pills

Applied by the user, and indicate something in common. Change the theme to see the available colours.

See: `examples/Tag.md`

### Custom colors

You can pass a custom color to Pill by using the `borderColor` prop, which will be set as the background color if `fill` is true.
This prop will take precedence over the `colorVariant` value.
See our Colors documentation for more information.

See: `examples/CustomColors.md`

### Dark background

Color variants for dark theme, to apply these set `isDarkBackground` to `true`.

**Note:** `"neutralWhite"` can only be used on dark backgrounds with `fill` also set to true.

See: `examples/DarkBackground.md`

## Props

### Pill

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | string | Yes |  | The content to display inside of the pill. |  |
| ariaLabelOfRemoveButton | string \| undefined | No |  | Sets custom aria-label attribute on the remove button |  |
| borderColor | string \| undefined | No |  | Override color variant, provide any color from palette or any valid css color value. |  |
| colorVariant | "warning" \| "negative" \| "neutral" \| "positive" \| "information" \| "neutralWhite" \| undefined | No |  | Change the color of a status pill. | "neutral" |
| fill | boolean \| undefined | No |  | Fills the pill background with colour. When fill is false only the border is coloured. | false |
| isDarkBackground | boolean \| undefined | No |  | Sets the colour styling when a status pill is rendered on a dark background. | false |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxWidth | string \| undefined | No |  | Sets the max-width of the pill. |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| onClick | ((ev: React.MouseEvent<HTMLSpanElement>) => void) \| undefined | No |  | Callback function for when the pill is clicked. |  |
| onDelete | ((ev?: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback function for when the remove icon is clicked. |  |
| pillRole | "tag" \| "status" \| undefined | No |  | Sets the type of pill in use. | "tag" |
| size | "S" \| "M" \| "L" \| "XL" \| undefined | No |  | Sets the size of the pill. | "M" |
| theme | Partial<ThemeObject> \| undefined | No |  |  |  |
| title | string \| undefined | No |  |  |  |
| wrapText | boolean \| undefined | No |  | Allow the text within pill to wrap. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

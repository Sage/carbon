# Search

This search component should be used if you require the user to conduct a search.

## Import

```javascript
import Search, { type SearchHandle } from "carbon-react/lib/components/search";
```

## Examples

### Default

See: `examples/Default.md`

### With Label and Hint Text

You can pass a visible label and hint text to the `Search` component via the `label` & `inputHint` props. 

When the `inputHint` prop is passed, please use a full stop `.` at the end. This forces a pause
before any other announcements, this well help screen reader users understand the hint fully.

See: `examples/WithLabelAndInputHint.md`

### With Search Button

You can pass the `searchButton` prop to render a search button.
This will render a button with the text "Search" and an aria-label of "search button".
To override the the default aria-label, you can pass a string value to the `searchButtonAriaLabel` prop.

See: `examples/WithSearchButtonAndWithSearchButtonPropTextOverrideAndWithSearchButtonLocaleOverride.md`

### Custom width

You can set a custom width for the search input by passing any valid CSS string value to the `searchWidth` prop.

See: `examples/CustomWidth.md`

### Custom MaxWidth

You can set a custom max-width for the search input by passing any valid CSS string value to the `maxWidth` prop.

See: `examples/WithCustomMaxWidth.md`

### Dark Background Styling

The search component can be styled to render on dark backgrounds by passing the `variant` prop with the value "dark".

See: `examples/WithAltStyling.md`

### Trigger actions on clear

It is possible to trigger actions such as filtering the search results when the cross icon is clicked.
When the `triggerOnClear` prop is set to `true`, the `onClick` callback will be called when the cross icon is clicked.

See: `examples/TriggerOnClear.md`

## Props

### Search

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onChange | (ev: SearchEvent) => void | Yes |  | Prop for `onChange` events |  |
| value | string | Yes |  | Current value |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  | Prop for `id` |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| inputHint | string \| undefined | No |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| label | string \| undefined | No |  | Label content |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxWidth | string \| undefined | No |  | Prop for specifying the max-width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| name | string \| undefined | No |  | Prop for `name` |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` events |  |
| onClick | ((ev: SearchEvent) => void) \| undefined | No |  | Prop for `onClick` events. `onClick` events are triggered when the `searchButton` is clicked |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onFocus` events |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onKeyDown` events |  |
| placeholder | string \| undefined | No |  | Prop for a placeholder |  |
| searchButton | string \| boolean \| undefined | No |  | Pass a boolean to render a search Button with default text. Pass a string to override the text in the search Button |  |
| searchButtonAriaLabel | string \| undefined | No |  | Prop to specify the aria-label of the search button |  |
| searchButtonDataProps | TagProps \| undefined | No |  | Data tag prop bag for searchButton |  |
| searchWidth | string \| undefined | No |  | Prop for specifying an input width length. Leaving the `searchWidth` prop with no value will default the width to '100%' |  |
| tabIndex | number \| undefined | No |  | Input tabindex |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Overrides the default tooltip position |  |
| triggerOnClear | boolean \| undefined | No |  | Sets whether the onClick action should be triggered when the Search cross icon is clicked. |  |
| variant | "default" \| "dark" \| undefined | No |  | Prop to specify the styling of the search component |  |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the search component |  |

## Ref methods

`Search`'s forwarded ref exposes the following imperative methods:

| Method Name | Description                                  |
| ----------- | -------------------------------------------- |
| `focus()`   | Programmatically focuses the search input.   |

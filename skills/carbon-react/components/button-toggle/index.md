# Button Toggle

Press one of the buttons to make selection. This component should be used when user has to make a choice between a small number of options. Use `ButtonToggleGroup` to manage selection state across a set of `ButtonToggle` items.

**Category:** Inputs

## Quick Start

```javascript
import {
  ButtonToggle,
  ButtonToggleGroup,
} from "carbon-react/lib/components/button-toggle";
```

## Examples

### Default

A `ButtonToggleGroup` with three `ButtonToggle` items and a visible legend label. Selecting a toggle deselects any previous selection.

See: `examples/Default.md`

### With inputHint

See: `examples/InputHint.md`

### With aria-label

If you do not want a visible label to appear above the group, you should pass the `aria-label` prop to `ButtonToggleGroup` to give it an
accessible name to be announced by screen readers. Failure to do this will result in accessibility violations.

See: `examples/AriaLabel.md`

### With fullWidth

When the `fullWidth` prop is `true`, the buttons will expand in size to evenly take up the full width of the container.

See: `examples/FullWidth.md`

### Allowing deselection

By default, in a `ButtonToggleGroup` there is no way to deselect the currently-selected toggle button except by selecting another one.
The `allowDeselect` prop changes this behaviour, making it possible for there to be no selection.

If you use this, you should include text in the `inputHint` prop which makes clear that deselection is allowed, as in the example below.

See: `examples/AllowDeselection.md`

### Small icon

Renders each toggle with a `size="small"` icon using the `buttonIcon` and `buttonIconSize="small"` props.

See: `examples/DefaultSmallIcon.md`

### Large icon

Renders each toggle with a `size="large"` icon using the `buttonIcon` and `buttonIconSize="large"` props.

See: `examples/DefaultLargeIcon.md`

### Icon only

While we do not advocate the use of icon-only buttons for accessibility reasons, the `aria-label` or `aria-labelledby` props can be passed to
an icon-only `ButtonToggle` so that assistive technology users are aware of the action that will be taken when the button is pressed.

See: `examples/IconOnly.md`

### Small

All toggles rendered at the `small` size via the `size` prop on `ButtonToggleGroup`.

See: `examples/Small.md`

### Small with small icon

`size="small"` toggles each with a `buttonIconSize="small"` icon.

See: `examples/SmallSmallIcon.md`

### Small with large icon

`size="small"` toggles each with a `buttonIconSize="large"` icon.

See: `examples/SmallLargeIcon.md`

### Large

All toggles rendered at the `large` size via the `size` prop on `ButtonToggleGroup`.

See: `examples/Large.md`

### Large with small icon

`size="large"` toggles each with a `buttonIconSize="small"` icon.

See: `examples/LargeSmallIcon.md`

### Large with large icon

`size="large"` toggles each with a `buttonIconSize="large"` icon.

See: `examples/LargeLargeIcon.md`

### Disabled Button

A single `ButtonToggle` with the `disabled` prop, making it unclickable.

See: `examples/DisabledButton.md`

### Disabled Group

The `disabled` prop on `ButtonToggleGroup` disables all child toggles at once.

See: `examples/DisabledGroup.md`

### Wrapped Group

When buttons can no longer fit in a single row, they will wrap onto the next line.
The `fullWidth` prop can provide a more consistent layout across different screen sizes, so we recommend using it if buttons are likely to wrap in smaller screens.

See: `examples/WrappedButtons.md`

## Props

### Button Toggle

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| size | "small" \| "medium" \| "large" | Yes | small \| medium \| large |  |  | ButtonToggle size | "medium" |
| allowDeselect | boolean \| undefined | No |  |  |  | Allow button to be deselected when already selected |  |
| buttonIcon | IconType \| undefined | No |  |  |  | The icon to be rendered inside of the button |  |
| buttonIconSize | ButtonToggleIconSizes \| undefined | No |  |  |  | Sets the size of the buttonIcon (eg. large) | "small" |
| children | React.ReactNode | No |  |  |  | Text to display for the button. |  |
| disabled | boolean \| undefined | No |  |  |  | Disable all user interaction. |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by blur event on the button. |  |
| onClick | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by click event on the button. |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by focus event on the button. |  |
| value | string \| undefined | No |  |  |  | An optional string by which to identify the button in either an onClick handler, or an onChange handler on the parent ButtonToggleGroup. |  |
| data-component | string \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the component |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
| pressed | boolean \| undefined | No |  | Yes | Set the pressed state of the toggle button | Set the pressed state of the toggle button |  |

### Button Toggle Group

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| id | string | Yes |  | Unique id for the root element of the component |  |
| onChange | (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void | Yes |  | Callback triggered by pressing one of the child buttons. |  |
| value | string | Yes |  | Determines which child button is selected |  |
| allowDeselect | boolean \| undefined | No |  | Allow buttons within the group to be deselected when already selected, leaving no selected button | false |
| children | React.ReactNode | No |  | Toggle buttons to be rendered. Only accepts children of type ButtonToggle |  |
| disabled | boolean \| undefined | No |  | Disable all user interaction. | false |
| fieldHelp | string \| undefined | No |  | [Legacy] The text for the field help. |  |
| fieldHelpInline | boolean \| undefined | No |  | [Legacy] Sets the field help to inline. |  |
| fullWidth | boolean \| undefined | No |  | If true all ButtonToggle children will flex to the full width of the ButtonToggleGroup parent |  |
| helpAriaLabel | string \| undefined | No |  | [Legacy] Aria label for rendered help component |  |
| inputHint | React.ReactNode | No |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputWidth | string \| number \| undefined | No |  | The percentage width of the ButtonToggleGroup. |  |
| label | string \| undefined | No |  | Text for the visible label of the button group. |  |
| labelHelp | React.ReactNode | No |  | [Legacy] Text for the label's help tooltip. |  |
| labelInline | boolean \| undefined | No |  | [Legacy] Sets the label to be inline. |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| labelWidth | number \| undefined | No |  | [Legacy] The percentage width of the label. |  |
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | aria-label for the group wrapper. Required for accessibility when no text label is provided |  |

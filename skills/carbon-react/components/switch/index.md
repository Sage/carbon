# Switch

A Switch lets a user toggle a single setting on or off. It gives an immediate response — the state change takes effect as soon as the user interacts with it.

**Category:** Inputs

## Quick Start

```javascript
import Switch from "carbon-react/lib/components/switch";
```

## Accessibility

Users should be able to:

- Toggle the switch using a keyboard or pointer device;
- Identify the current state (on or off) without relying on colour alone — the **On** / **Off** labels provide a text alternative;
- Reach and operate the switch using assistive technology.

### Keyboard interactions

- <kbd>Tab</kbd> — moves focus to the switch.
- <kbd>Space</kbd> — toggles the switch on or off.

### ARIA

The underlying input renders as `<input type="checkbox" role="switch" aria-checked>`. Providing a visible `label` prop is strongly recommended; it links a `<label>` element to the input via `htmlFor` / `id`, giving the control an accessible name. When no `label` is provided, supply an `aria-label` or `aria-labelledby` via the spread props.

## Examples

### Default

The switch renders unchecked by default. The current state is shown by **On** and **Off** labels displayed outside the track. The component is controlled — you must manage `checked` state yourself and provide an `onChange` handler.

See: `examples/Default.md`

### Checked

Set `checked` to `true` to render the switch in its on state. This is a controlled prop — combine with `onChange` to manage state.

See: `examples/Checked.md`

### Disabled

Set `disabled` to prevent user interaction. Both checked and unchecked disabled states are shown below.

See: `examples/Disabled.md`

See: `examples/DisabledChecked.md`

### Size

Two sizes are available: `small` (default) and `large`.

See: `examples/LargeSize.md`

### Label inline

Set `labelInline` to place the text label beside the switch instead of above it. Use `labelSpacing` (1 or 2) to control the gap, and `labelWidth` to set the label width as a percentage when inline.

See: `examples/LabelInline.md`

#### Label inline with hint text

When `labelInline` is set alongside `inputHint`, the hint text is displayed directly below the label, keeping it visually grouped with the label while the switch sits beside them.

See: `examples/LabelInlineWithHint.md`

### Loading

Set `loading` to show a loading spinner in place of the On/Off labels. The switch input is automatically disabled while loading. A `"Processing..."` label is shown to the right of the spinner by default.

See: `examples/Loading.md`

#### Custom processing label

Use the `processingLabel` prop to override the default `"Processing..."` text with your own copy.

See: `examples/LoadingCustomLabel.md`

#### Processing label below switch

On small screens you may want the processing label to appear below the switch rather than beside it. Set `processingLabelBelowSwitch` to move it there.

See: `examples/LoadingLabelBelow.md`

## Props

### Switch

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| checked | boolean | Yes |  |  |  | Checked state of the switch |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | OnChange event handler |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true, the input will auto-focus on mount |  |
| disabled | boolean \| undefined | No |  |  |  | Disables the switch |  |
| id | string \| undefined | No |  |  |  | The id attribute of the hidden input |  |
| inputHint | React.ReactNode | No |  |  |  | Hint text displayed below the switch |  |
| label | React.ReactNode | No |  |  |  | Accessible text label rendered above the switch |  |
| labelInline | boolean \| undefined | No |  |  |  | When true, the label is displayed inline (beside the switch) rather than above it |  |
| labelSpacing | 1 \| 2 \| undefined | No |  |  |  | Spacing between the label and switch when labelInline is true (multiplier of base spacing unit) |  |
| labelWidth | number \| undefined | No |  |  |  | Label width as a percentage when labelInline is true |  |
| loading | boolean \| undefined | No |  |  |  | Triggers the loading state — hides On/Off text and shows a spinner |  |
| name | string \| undefined | No |  |  |  | The name attribute of the hidden input |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | OnBlur event handler |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | OnFocus event handler |  |
| processingLabel | string \| undefined | No |  |  |  | Text shown beside the spinner during loading. Defaults to "Processing..." |  |
| processingLabelBelowSwitch | boolean \| undefined | No |  |  |  | When true, the processing label is rendered below the switch rather than to its right |  |
| required | boolean \| undefined | No |  |  |  | Whether the input is required |  |
| size | "small" \| "large" \| undefined | No |  |  |  | Size of the switch track |  |
| value | string \| undefined | No |  |  |  | The value attribute of the hidden input, passed on form submit |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| error | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| fieldHelp | React.ReactNode | No |  | Yes | Use `inputHint` instead. |  |  |
| fieldHelpInline | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| helpAriaLabel | string \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| info | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| labelHelp | React.ReactNode | No |  | Yes | Use `inputHint` instead. |  |  |
| reverse | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| validationOnLabel | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| warning | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |

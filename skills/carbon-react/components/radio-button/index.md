# Radio Button

Provides a set of mutually exclusive options. Use `RadioButtonGroup` to wrap individual `RadioButton` components; only one button in the group can be selected at a time.

**Category:** Inputs

## Quick Start

To use these components, import both `RadioButtonGroup` and `RadioButton`, and pass `RadioButton` as children of `RadioButtonGroup`.

```javascript
import {
  RadioButton,
  RadioButtonGroup,
} from "carbon-react/lib/components/radio-button";
```

## Validation States

This component supports input validation, see our [Validations](../../references/docs/validations.md) documentation page for more information.

## Examples

### With Legend

A legend can be set on the group by passing the `legend` prop to `RadioButtonGroup` with a string value.

See: `examples/WithLegend.md`

### With Legend Hint

To add a hint below the legend, pass the `legendHint` prop to `RadioButtonGroup` with a string value.

See: `examples/WithLegendHint.md`

### With Input Hint

To add a hint to an individual radio button, pass the `inputHint` prop to `RadioButton` with a string value.

See: `examples/WithInputHint.md`

### Inline

`RadioButton` children can be displayed inline by passing the `inline` prop to `RadioButtonGroup`.

See: `examples/InlineRadioButtons.md`

### Sizes

The size of the component can be changed by passing the `size` prop to `RadioButtonGroup`. Available options are `small`, `medium`, and `large`.

See: `examples/Sizes.md`

### Progressive Disclosure

`RadioButton` can be used to conditionally reveal additional content when selected. 
This can be achieved by passing the content to the `progressiveDisclosure` prop in `RadioButton`, which accepts any valid ReactNode.

It is recommended that you provide limited amounts of content within conditionally revealed sections, if you need to disclose larger amounts of content, please consider using a different pattern.

**Please Note**: Progressive disclosure is not supported when the `inline` prop is set on `RadioButtonGroup`.

See: `examples/ProgressiveDisclosure.md`

### With Custom Labels

The `label` prop in `RadioButton` accepts a ReactNode, which allows for custom content to be displayed as the label.

See: `examples/WithCustomLabels.md`

### Required

`RadioButtonGroup` can be marked as required by passing the `required` prop.

See: `examples/Required.md`

### Disabled

`RadioButton`s can be disabled using the `disabled` prop either on the `RadioButtonGroup` to disable all radio buttons, or on individual `RadioButton`s to disable them individually.

**Please Note**: Even though Carbon does support disabled radio buttons, their use is not generally recommended by Design System.

See: `examples/Disabled.md`

## Props

### RadioButtonGroup

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | The RadioButton objects to be rendered within the group. |  |
| name | string | Yes |  |  |  | Specifies the name prop to be applied to each RadioButton in the group. |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | Callback fired when a RadioButton child is selected. |  |
| value | string | Yes |  |  |  | Value of the selected RadioButton child. |  |
| disabled | boolean \| undefined | No |  |  |  | Flag to disable the RadioButtonGroup. |  |
| error | string \| undefined | No |  |  |  | Error message to be displayed when validation fails. |  |
| id | string \| undefined | No |  |  |  | Unique identifier for the component. Will use a randomly generated GUID if none is provided. |  |
| inline | boolean \| undefined | No |  |  |  | When true, RadioButton children are inline. | false |
| legend | string \| undefined | No |  |  |  | The content for the RadioButtonGroup legend. |  |
| legendAlign | "left" \| "right" \| undefined | No |  |  |  | Alignment of the legend. |  |
| legendHint | string \| undefined | No |  |  |  | Content for the hint text below the legend. |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Callback fired when a RadioButton child is blurred. |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure RadioButtonGroup as mandatory. |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of the RadioButtonGroup. | "medium" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| adaptiveLegendBreakpoint | number \| undefined | No |  | Yes | The adaptive legend behaviour is no longer supported on this component. | Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set |  |
| adaptiveSpacingBreakpoint | number \| undefined | No |  | Yes | The adaptive spacing behaviour is no longer supported on this component. | Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set |  |
| info | string \| boolean \| undefined | No |  | Yes | Information validation is no longer supported on this component. | [Legacy] Indicate additional information. |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Yes | Custom spacing for labels is no longer supported on this component. | Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) |  |
| legendHelp | string \| undefined | No |  | Yes | The `legendHelp` prop is deprecated and will be removed in a future release. Please use the `legendHint` prop instead. | The content for the RadioButtonGroup hint text, will only be rendered when `validationRedesignOptIn` is true. |  |
| legendInline | boolean \| undefined | No |  | Yes | Inline legends are no longer supported on this component. | When true, legend is placed in line with the RadioButtons |  |
| legendSpacing | 1 \| 2 \| undefined | No |  | Yes | Custom spacing for legends is no longer supported on this component. | Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) |  |
| legendWidth | number \| undefined | No |  | Yes | Inline legends are no longer supported on this component. | Percentage width of legend (only when legend is inline) |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | Tooltips are no longer supported on this component. | Overrides the default tooltip position |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | The `validationMessagePositionTop` prop is deprecated and will be removed in a future release. | Render the ValidationMessage above the RadioButtonGroup | true |
| warning | string \| undefined | No |  | Yes | The `warning` state is deprecated and will be removed in a future release. | Warning message to be displayed when validation warning occurs. |  |

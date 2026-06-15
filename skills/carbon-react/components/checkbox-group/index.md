# CheckboxGroup

CheckboxGroup provides a way to check one or more items from a list of options.

**Category:** Inputs

## Quick Start

```javascript
import { Checkbox, CheckboxGroup } from "carbon-react/lib/components/checkbox";
```

## Validation States

This component supports input validation, see our Validations documentation page for more information.

## Examples

### Default

A `CheckboxGroup` with a visible legend grouping multiple `Checkbox` inputs. Manage selection state by passing `checked` and `onChange` to each checkbox.

See: `examples/Default.md`

### With legend Help

To add an input hint to the legend, use the `legendHelp` prop.

**Note:** The `legendHelp` prop will only render when the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *true*.

See: `examples/WithLegendHelp.md`

### Required

Add the `required` prop to `CheckboxGroup` to mark the entire group as mandatory.

See: `examples/RequiredGroup.md`

### Inline

Use the `inline` prop to display the grouped checkboxes side by side horizontally. Requires enabling the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) to work.

See: `examples/Inline.md`

### Inline legend (legacy)

Use the `legendInline` prop to display the group legend on the same horizontal row as the grouped checkboxes. You can adjust its appearance using the `legendWidth` and `legendAlign` props to control the width and text alignment of the legend. The `legendSpacing` prop can be used to control the spacing between the legend and the grouped checkboxes.

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/LegacyInlineLegend.md`

## Props

### CheckboxGroup

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The Checkboxes to be rendered in the group |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  | Unique identifier for the component. Will use a randomly generated GUID if none is provided. |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| inline | boolean \| undefined | No |  | When true, Checkboxes are inline |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| legend | string \| undefined | No |  | The content for the CheckboxGroup Legend |  |
| legendAlign | "left" \| "right" \| undefined | No |  | [Legacy] Text alignment of legend when inline | "left" |
| legendHelp | string \| undefined | No |  | The content for the CheckboxGroup hint text, will only be rendered when `validationRedesignOptIn` is true. |  |
| legendInline | boolean \| undefined | No |  | [Legacy] When true, legend is placed inline with the checkboxes |  |
| legendSpacing | 1 \| 2 \| undefined | No |  | [Legacy] Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) |  |
| legendWidth | number \| undefined | No |  | [Legacy] Percentage width of legend (only when legend is inline) |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Overrides the default tooltip |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the Checkbox inputs when validationRedesignOptIn flag is set | true |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

# CheckboxGroup

CheckboxGroup provides a way to check one or more items from a list of options.

## Import

```javascript
import { Checkbox, CheckboxGroup } from "carbon-react/lib/components/checkbox";
```

## Validation States

This component supports input validation, see our Validations documentation page for more information.

## Examples

### Default

See: `examples/Default.md`

### With legend Help

To add an input hint to the legend, use the `legendHelp` prop.

**Note:** The `legendHelp` prop will only render when the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *true*.

See: `examples/WithLegendHelp.md`

### Required

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

No props metadata found.
